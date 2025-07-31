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
            />

            <div className="flex flex-col sm:flex-row gap-4">
                <Card>
                    <CardContent
                        className={`bg-white rounded-lg p-10 flex gap-4 cursor-pointer transition ${selectedPayment === 'cash' ? 'border-2 border-yellow-300' : ''}`}
                        onClick={() => handleSelect('cash')}
                    >
                        <Banknote />
                        <p>Cash on Delivery</p>
                    </CardContent>
                </Card>
            </div>
            
            <div className="w-full flex flex-col gap-y-4">
                <div className="flex items-center gap-x-2">
                    <InputBox<TOrderForm>
                        name="deliveryDate"
                        id="asap"
                        value="asap"
                        placeholder="As soon as possible..."
                        register={register}
                        error={(errors?.deliveryDate?.message?.toString()) || ""}
                        className="w-6 h-6"
                        type="radio"
                        onChange={() => setIsScheduleDelivery(false)}
                    />
                    <Label id="orderDate">As soon as possible</Label>
                </div>
                
                <div className="flex items-center gap-x-2">
                    <InputBox<TOrderForm>
                        name="deliveryDate"
                        id="schedule"
                        value="schedule"
                        placeholder="Schedule Delivery Date..."
                        register={register}
                        error={(errors?.deliveryDate?.message?.toString()) || ""}
                        className="w-6 h-6"
                        type="radio"
                        onChange={() => setIsScheduleDelivery(true)}
                    />
                    <Label>Schedule delivery for later</Label>
                </div>

                {isScheduleDelivery && (
                    <div className="mt-4">
                        <Label className="text-lg font-medium text-gray-900">Select Delivery Date and Time</Label>
                        <div className="flex gap-x-16 mt-4 opacity-90">
                            <SelectBox<TOrderForm>
                                name="deliveryDate"
                                control={control}
                                map={dateOptions}
                                placeholder="Select Delivery Date"
                                label="Date"
                                error={(errors?.deliveryDate?.message) || ""}
                            />

                            <SelectBox<TOrderForm>
                                name="deliveryTime"
                                control={control}
                                map={timeOptions}
                                placeholder="Select Delivery Time"
                                label="Time"
                                error={(errors?.deliveryTime?.message) || ""}
                            />
                        </div>
                    </div>
                )}
            </div>
            
            <Button 
                type="submit"
                className="text-base w-[200px] text-white mt-10 bg-primary hover:bg-primary/80"
            >
                {isPending ? (
                    <div className="flex items-center gap-2">
                        <Loader2 className="size-5 animate-spin" />
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