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
    const menu = useGetMenuDetail(Number(menuId), session?.data?.user?.access_token);
    const restaurantName = menu?.data?.restaurant?.name;

    const handleAddItem = (item: Food) => {
        dispatch(addItem({
            ...item,
            foodId: String(item.foodId),
            menuId: String(item.menuId),
            price: Number(item.price),
            spiceLevel: Number(item.spiceLevel),
            quantity: 1
        }));
    };

    const handleRemoveItem = (foodId: string) => {
        dispatch(removeItem(foodId));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const subtotal = cart.reduce(
        (total, food) => total + Number(food.price) * food.quantity,
        0
    );

    const total = subtotal + 120;

    return (
        <section className="max-w-6xl mx-auto mt-10 px-4 md:px-8">
            <div>
                <div className='flex gap-x-2 items-center'>
                    <ChevronLeft className='size-6' />
                    <p className='font-semibold text-lg'>Back</p>
                </div>
                <h1 className="text-4xl font-semibold mb-5 mt-5">Checkout</h1>

                <div className='flex flex-col lg:flex-row gap-8'>
                    <div className='flex-1 bg-gray-200 p-6 rounded-lg shadow-sm'>
                        <h2 className="text-lg font-medium mb-4">Delivery Address</h2>
                        <div className=''>
                            <OrderForm />
                        </div>
                    </div>

                    <div className='w-full lg:w-1/3 bg-gray-200 p-6 rounded-lg shadow-sm'>
                        <h2 className='text-lg font-medium mb-4'>Cart</h2>
                        <div className='flex flex-col gap-4'>
                            {cart.map((food: any) => (
                                <div className="flex justify-between items-center" key={food?.foodId}>
                                    <div className="flex items-center gap-3">
                                        <div className="w-auto h-full border justify-center items-center">
                                            <Image src={imgPlaceholder} width={80} height={80} alt="food" />
                                        </div>
                                        <div className="flex flex-col">
                                            <p className="font-medium text-sm">{food?.name}</p>
                                            <p className="text-gray-500 text-sm">Rs. {food?.price}</p>
                                        </div>

                                        <div className="flex items-center gap-2">
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
                                    <div className="border border-amber-300"></div>
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