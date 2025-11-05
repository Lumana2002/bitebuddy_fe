"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputBox from "@/components/InputBox";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrder } from "@/apicalls/order";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { OrderFormSchema, TOrderForm } from "@/schemas/orderSchema";
import { Card, CardContent } from "@/components/ui/card";
import { Banknote } from "lucide-react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { useGetMenuDetail } from "@/hooks/menusQueries";
import { clearCart } from "@/store/slices/cartSlice";
import { Label } from "@radix-ui/react-dropdown-menu";
import SelectBox from "@/components/SelectBox";

const OrderForm = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const session = useSession();
    const user = session.data?.user;
    const dispatch = useDispatch();

    const [isScheduleDelivery, setIsScheduleDelivery] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState(null);

    const cart = useSelector((state: RootState) => state.cart.items);
    const menuId = cart.length > 0 ? cart[0].menuId : -1;
    const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);

    // Add state for weather
    const [weather, setWeather] = useState<string>("");

    useEffect(() => {
        const saved = localStorage.getItem("coords");
        if (saved) {
            try {
                setCoords(JSON.parse(saved));
                return;
            } catch (_) { }
        }

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude, longitude } = pos.coords;
                const loc = { lat: latitude, lon: longitude };
                localStorage.setItem("coords", JSON.stringify(loc));
                setCoords(loc);
            },
            (err) => {
                console.error("Location permission denied:", err.message);
            }
        );
    }, []);

    // Fetch weather whenever coords change
    useEffect(() => {
        async function fetchWeather(lat: number, lon: number) {
            try {
                const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
                if (!apiKey) throw new Error("OpenWeather API key not found");

                const res = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
                );
                if (!res.ok) throw new Error("Failed to fetch weather");

                const data = await res.json();
                const weatherMain = data.weather?.[0]?.main || "";
                setWeather(weatherMain.toLowerCase());
            } catch (error) {
                console.error("Error fetching weather:", error);
            }
        }

        if (coords) {
            fetchWeather(coords.lat, coords.lon);
        }
    }, [coords]);

    // Debug: Log cart items to see their structure
    useEffect(() => {
        if (cart.length > 0) {
            console.log('Cart items:', cart);
            console.log('First cart item keys:', Object.keys(cart[0]));
        }
    }, [cart]);
    const { data: menu, isPending: isMenuLoading } = useGetMenuDetail(Number(menuId), session?.data?.user?.access_token);

    // Log menu loading state
    useEffect(() => {
        if (menu) {
            console.log('Menu loaded successfully:', menu);
        }
    }, [menu]);

    const subtotal = cart.reduce(
        (total, food) => total + (food.price) * food.quantity,
        0
    );

    const totalQuantity = cart.reduce(
        (quantity, food) => quantity + food.quantity,
        0
    );

    const total = subtotal + 120;
    const averagePrice = subtotal / totalQuantity;

    const getDateOptions = () => {
        const today = new Date();
        const dateOptions = [];

        for (let i = 0; i <= 4; i++) {
            const currentDate = new Date(today);
            currentDate.setDate(today.getDate() + i);
            const formattedDate = currentDate.toISOString().split("T")[0];
            dateOptions.push({
                label: currentDate.toDateString(),
                value: formattedDate,
            });
        }

        return dateOptions;
    };


    const getTimeOptions = () => {
        const timeOptions = [];
        const startTime = 8;
        const endTime = 20;

        for (let hour = startTime; hour < endTime; hour++) {
            const time1 = `${hour.toString().padStart(2, '0')}:00`;
            const time1Label = `${hour.toString().padStart(2, '0')}:00-${hour.toString().padStart(2, '0')}:30`;

            const time2 = `${hour.toString().padStart(2, '0')}:30`;
            const time2Label = `${hour.toString().padStart(2, '0')}:30-${(hour + 1).toString().padStart(2, '0')}:00`;

            timeOptions.push({ label: time1Label, value: time1 });
            timeOptions.push({ label: time2Label, value: time2 });
        }

        return timeOptions;
    };

    const dateOptions = getDateOptions();
    const timeOptions = getTimeOptions();


    const handleSelect = (paymentType: any) => {
        setSelectedPayment(paymentType);
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
        trigger,
    } = useForm<TOrderForm>({
        resolver: zodResolver(OrderFormSchema),
        mode: "onChange",
        defaultValues: {
            deliveryAddress: "",
            deliveryDate: "asap",
            deliveryTime: "",
            weather: "",
        },
    });

    const { mutateAsync, isPending } = useMutation({
        mutationFn: createOrder,
        onSuccess: (data: any) => {
            console.log('Order creation response:', data);
            if (data?.status === 201 || data?.status === 200) {
                queryClient.invalidateQueries({ queryKey: ["orders"] });
                dispatch(clearCart());
                reset();
                router.push('/profile/orders');
                toast.success('Order placed successfully!');
            } else {
                const errorMessage = data?.data?.message || 'Failed to place order. Please try again.';
                toast.error(errorMessage);
            }
        },
        onError: (error: any) => {
            console.error('Order creation error:', error);
            const errorMessage = error.response?.data?.message || error.message || 'Failed to place order. Please try again.';
            toast.error(errorMessage);
        },
    });

    const onSubmit = async (formData: TOrderForm) => {
        console.log('Starting order submission...');
        console.log('Current cart items:', cart);
        console.log('Cart item structure:', cart.map(item => ({
            foodId: item.foodId,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            keys: Object.keys(item)
        })));
        const toastId = toast.loading('Processing your order...');

        try {
            // 1. Validate form
            const isValid = await trigger();
            if (!isValid) {
                toast.dismiss(toastId);
                toast.error('Please fill in all required fields');
                return;
            }

            // 2. Check if user is logged in
            if (!user?.id) {
                toast.dismiss(toastId);
                toast.error('You must be logged in to place an order');
                router.push('/login');
                return;
            }

            // 3. Prepare order data
            const deliveryDateTime = new Date();

            // Log detailed cart item information
            console.log('Cart items before mapping:', JSON.stringify(cart, null, 2));

            const orderDetails = cart.map(item => {
                const orderItem = {
                    foodId: String(item.foodId),
                    name: item.name || 'Unnamed Item',
                    quantity: item.quantity,
                    price: Number(item.price),
                    totalPrice: Number(item.price * item.quantity)
                };
                console.log('Processed order item:', JSON.stringify(orderItem, null, 2));
                return orderItem;
            });

            const additionalFields = {
                restaurantId: menu?.restaurant?.restaurantId || 0,
                paymentStatus: 'pending',
                orderStatus: 'unfulfilled',
                orderDetails: orderDetails,
                totalPrice: total,
                orderDate: new Date().toISOString(),
                averagePrice: averagePrice,
                deliveryDate: deliveryDateTime.toISOString(),
                weather: weather,
            };

            const { deliveryTime, ...remainingData } = formData;
            const orderData = {
                ...remainingData,
                ...additionalFields,
                menuId: String(menuId),
                userId: String(user.id),
                items: cart.map(item => ({
                    foodId: String(item.foodId),
                    quantity: item.quantity,
                    price: Number(item.price)
                })),
                subtotal: Number(cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)),
                deliveryCharge: 120,
                total: Number(cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) + 120)
            };

            console.log('Submitting order:', orderData);

            // 4. Submit order
            const result = await mutateAsync({
                userId: user.id,
                body: orderData,
                token: user.access_token
            });

            console.log('Order submission successful:', result);

            // Show success message
            toast.dismiss(toastId);
            toast.success('Order placed successfully!');

            // Clear cart and redirect
            dispatch(clearCart());
            router.push('/profile/orders');

        } catch (error) {
            console.error('Order submission failed:', error);
            toast.dismiss(toastId);

            // Handle specific error cases
            if (error instanceof Error) {
                if (error.message.includes('401') || error.message.includes('Unauthorized')) {
                    toast.error('Your session has expired. Please log in again.');
                    router.push('/login');
                } else {
                    toast.error('Failed to place order. Please try again.');
                }
            } else {
                toast.error('An unexpected error occurred. Please try again.');
            }
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-y-8 py-10 vsm:px-14"
        >
            <InputBox<TOrderForm>
                name="deliveryAddress"
                id="address"
                placeholder="Enter Delivery Address..."
                register={register}
                error={(errors?.deliveryAddress?.message?.toString()) || ""}
                desc="enter the delivery address"
                label=""
                className="border border-gray-200 rounded-md p-3 focus:border-primary focus:ring-1 focus:ring-primary transition"
            />

            <div className="flex flex-col sm:flex-row gap-4">
                <Card>
                    <CardContent
                        className={`flex items-center gap-3 p-4 rounded-md cursor-pointer border border-gray-200 transition hover:border-primary ${selectedPayment === 'cash' ? 'border-2 border-yellow-300' : ''}`}
                        onClick={() => handleSelect('cash')}
                    >
                        <Banknote />
                        <p>Cash on Delivery</p>
                    </CardContent>
                </Card>
            </div>

            <div className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex items-center gap-2">
                        <InputBox<TOrderForm>
                            name="deliveryDate"
                            id="asap"
                            value="asap"
                            placeholder="As soon as possible..."
                            register={register}
                            error={(errors?.deliveryDate?.message?.toString()) || ""}
                            className="w-4 h-4"
                            type="radio"
                            onChange={() => setIsScheduleDelivery(false)}
                        />
                        <Label id="orderDate" className="text-gray-700">As soon as possible</Label>
                    </div>

                    <div className="flex items-center gap-2">
                        <InputBox<TOrderForm>
                            name="deliveryDate"
                            id="schedule"
                            value="schedule"
                            placeholder="Schedule Delivery Date..."
                            register={register}
                            error={(errors?.deliveryDate?.message?.toString()) || ""}
                            className="w-4 h-4"
                            type="radio"
                            onChange={() => setIsScheduleDelivery(true)}
                        />
                        <Label className="text-gray-700">Schedule delivery for later</Label>
                    </div>
                </div>

                {isScheduleDelivery && (
                    <div className="mt-4 p-4 border-2 border-gray-200 rounded-md bg-gray-50">
                        <Label className="text-sm font-medium text-gray-900 mb-2 block text-center">Select Delivery Date and Time</Label>
                        <div className="flex flex-col gap-4 items-center">
                            <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-800">Date</span>
                                <SelectBox<TOrderForm>
                                    name="deliveryDate"
                                    control={control}
                                    map={dateOptions}
                                    placeholder="Select Delivery Date"
                                    label=""
                                    error={(errors?.deliveryDate?.message) || ""}
                                />
                            </div>

                            <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-800">Time</span>
                                <SelectBox<TOrderForm>
                                    name="deliveryTime"
                                    control={control}
                                    map={timeOptions}
                                    placeholder="Select Delivery Time"
                                    label=""
                                    error={(errors?.deliveryTime?.message) || ""}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <Button
                type="submit"
                className="w-full sm:w-[200px] bg-white text-amber-600 py-3 rounded-md hover:bg-amber-200 transition"
            >
                {isPending ? (
                    <div className="flex items-center gap-2 justify-center">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <p>Creating..</p>
                    </div>
                ) : (
                    "Place Order"
                )}
            </Button>
        </form>
    );
};

export default OrderForm;