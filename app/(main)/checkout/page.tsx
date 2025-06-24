'use client';
import React from 'react'
import Hero from './_components/Hero'
import { ChevronLeft } from 'lucide-react'
import { Input } from '@/components/ui/input'
import OrderForm from './_components/OrderForm'
import Image from 'next/image';
import imgPlaceholder from '@/public/assets/img-placeholder.png';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { addItem, clearCart, removeItem } from '@/store/slices/cartSlice';
import { useGetMenuDetail } from '@/hooks/menusQueries';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';


const page = () => {
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
        <section className="mt-10 mx-[20px] md:mx-[40px] 2xl:mx-[80px] max-md:flex-wrap">
            <div>
                <div className='flex gap-x-2 items-center'>
                    <ChevronLeft className='size-6' />
                    <p className='font-semibold text-lg'>Back</p>
                </div>
                <h1 className="text-5xl  mt-4">Checkout</h1>
                <div className='w-full flex justify-between gap-x-10'>
                    <div className='bg-gray-200 w-2/3 p-10'>
                        <h2>Delivery Address</h2>
                        <div className=''>
                            <OrderForm />
                        </div>
                    </div>
                    <div className='bg-gray-300 w-1/3 p-10'>
                        <h2 className=''>Cart</h2>
                        <div className='py-10 '>
                            {cart.map((food: any) => (
                                <div className="flex justify-between mb-6" key={food?.foodId}>
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
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default page