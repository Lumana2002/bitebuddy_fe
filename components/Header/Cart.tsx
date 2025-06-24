'use client';

import React from 'react';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { ShoppingBasket } from 'lucide-react';
import Image from 'next/image';
import imgPlaceholder from '@/public/assets/img-placeholder.png';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { addItem, clearCart, removeItem } from '@/store/slices/cartSlice';
import { useGetMenuDetail } from '@/hooks/menusQueries';
import { useSession } from 'next-auth/react';

const Cart = () => {
    const session = useSession()
    const cart = useSelector((state: RootState) => state.cart.items);
    const dispatch = useDispatch();

    const menuId = cart.length > 0 ? cart[0].menuId : -1;
    const menu = useGetMenuDetail(menuId, session?.data?.user?.access_token);
    const restaurantName = menu?.data?.restaurant?.name;

    const handleAddItem = (item: Food) => {
        dispatch(addItem(item));
    };

    const handleRemoveItem = (foodId: number) => {
        dispatch(removeItem(foodId));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const subtotal = cart.reduce(
        (total, food) => total + parseFloat(food.price) * food.quantity,
        0
    );

    const total = subtotal + 120;

    return (
        <Sheet>
            <SheetTrigger>
                <div className="relative inline-block cursor-pointer">
                    <ShoppingBasket className="size-8" />
                    {cart.length > 0 && (
                        <span className="absolute bottom-1 left-[80%] transform -translate-x-1/2 translate-y-1/2 bg-secondary text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                            {cart.length}
                        </span>
                    )}
                </div>
            </SheetTrigger>
            <SheetContent className="w-full h-full sm:max-w-sm sm:h-auto">
                <div className="p-1 py-2 bg-white rounded-lg h-full flex flex-col justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-center mb-4">Your Shopping Cart</h2>
                        <div className='flex justify-center '>
                            <h2 className="text-lg font-semibold text-center mb-8">{restaurantName}</h2>
                        </div>
                    </div>

                    {cart.length > 0 ? (
                        <div className="flex flex-col justify-between w-full flex-grow">
                            {cart.map((food: any) => (
                                <div className="flex justify-between" key={food?.foodId}>
                                    <div className="flex gap-x-2 vvsm:gap-x-6">
                                        <div className="w-auto h-full border justify-center items-center">
                                            <Image src={imgPlaceholder} width={80} height={80} alt="food" />
                                        </div>
                                        <div className="flex flex-col gap-y-1 justify-center items-start text-sm vvsm:text-base">
                                            <p>{food?.name}</p>
                                            <p>Rs. {food?.price}</p>
                                        </div>
                                        <div className="flex flex-col gap-x-2 w-10 justify-center items-center">
                                            <ChevronUp className="size-5 text-green-600 w-full" onClick={() => handleAddItem(food)} />
                                            <p className="py-2">x {food?.quantity}</p>
                                            <ChevronDown className="size-5 text-red-600 w-full" onClick={() => handleRemoveItem(food.foodId)} />
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-center items-center">
                                        <p>Rs. {parseFloat(food.price) * (food?.quantity || 1)}</p>
                                    </div>
                                </div>
                            ))}
                            <div className="flex flex-col">
                                <div className="flex flex-col gap-y-4">
                                    <div className="flex justify-between">
                                        <p>Subtotal: </p>
                                        <p className="opacity-70">Rs. {subtotal.toFixed(2)}</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p>Delivery Charge: </p>
                                        <p className="opacity-70">Rs. 120</p>
                                    </div>
                                    <div className="border border-red-400"></div>
                                    <div className="flex justify-between">
                                        <p>Total: </p>
                                        <p className="opacity-70">Rs. {total.toFixed(2)}</p>
                                    </div>
                                    <Link href="/checkout">
                                        <Button className="w-full mt-10 bg-primary hover:bg-primary/80 text-white">Proceed to Checkout</Button>
                                    </Link>
                                </div>

                            </div>
                        </div>
                    ) : (
                        <p className="text-center text-gray-600 justify-center items-center flex h-screen">Oops... your cart is empty 🛒</p>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default Cart;
