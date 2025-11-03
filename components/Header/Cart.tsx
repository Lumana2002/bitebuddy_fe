'use client';

import React from 'react';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { ShoppingBasket, Trash2 } from 'lucide-react';
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

    const menuId = cart.length > 0 ? Number(cart[0].menuId) : -1;
    const menu = useGetMenuDetail(menuId, session?.data?.user?.access_token);
    const restaurantName = menu?.data?.restaurant?.name;

    const handleAddItem = (item: Food) => {
        dispatch(addItem({
            foodId: String(item.foodId),
            // @ts-ignore
            menuId: Number(item.menuId),
            name: item.name,
            category: item.category,
            quantity: item.quantity,
            price: Number(item.price),
            spiceLevel: Number(item.spiceLevel)
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
        <Sheet>
            <SheetTrigger>
                <div className="relative inline-block cursor-pointer">
                    <ShoppingBasket className="size-8 text-amber-700 hover:text-amber-800 transition-colors" />
                    {cart.length > 0 && (
                        <span className="absolute bottom-1 left-[80%] transform -translate-x-1/2 translate-y-1/2 bg-amber-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                            {cart.length}
                        </span>
                    )}
                </div>
            </SheetTrigger>
            <SheetContent className="w-full h-full sm:max-w-sm sm:h-auto bg-gradient-to-b from-amber-50 to-white">
                <div className="p-4 h-full flex flex-col">
                    {/* Header */}
                    <div className="bg-amber-500  rounded-lg p-3 mb-4 shadow-md">
                        <div className="flex items-center justify-center gap-2 mb-1">
                            <ShoppingBasket className="size-5 text-white" />
                            <h2 className="text-lg font-bold text-white">Your Cart</h2>
                        </div>
                        {restaurantName && (
                            <div className="flex justify-center">
                                <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
                                    {restaurantName}
                                </span>
                            </div>
                        )}
                    </div>

                    {cart.length > 0 ? (
                        <div className="flex flex-col flex-grow min-h-0">
                            {/* Cart Items */}
                            <div className="flex-1 space-y-3 mb-6 overflow-y-auto ">
                                {cart.map((food: any) => (
                                    <div key={food?.foodId} className="bg-white rounded-lg p-3 border border-gray-200">
                                        <div className="flex gap-2 items-center">
                                            
                                            <div className="flex-grow mn-w-0">
                                                <h3 className="font-semibold text-gray-800 mb-1">{food?.name}</h3>
                                                <p className="text-amber-600 font-medium">Rs. {food?.price}</p>
                                            </div>
                                            
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => handleAddItem(food)}
                                                    className="w-8 h-8 bg-gray-100 text-gray-700 rounded-full flex items-center justify-center"
                                                >
                                                    <ChevronUp className="size-4" />
                                                </button>
                                                <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium min-w-[2rem] text-center">
                                                    {food?.quantity}
                                                </span>
                                                <button
                                                    onClick={() => handleRemoveItem(food.foodId)}
                                                    className="w-8 h-8 bg-gray-100 text-gray-700 rounded-full flex items-center justify-center"
                                                >
                                                    <ChevronDown className="size-4" />
                                                </button>
                                            </div>
                                            
                                            <div className="w-24 text-center">
                                                <p className="font-semibold text-gray-900 text-sm">
                                                    Rs. {(parseFloat(food.price) * (food?.quantity || 1)).toFixed(2)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Order Summary */}
                            <div className="bg-white rounded-lg p-3 shadow-md border border-amber-100">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-gray-600 text-sm">
                                        <span>Subtotal:</span>
                                        <span>Rs. {subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600 text-sm">
                                        <span>Delivery Charge:</span>
                                        <span>Rs. 120.00</span>
                                    </div>
                                    <div className="border-t border-amber-200 pt-2">
                                        <div className="flex justify-between font-bold text-gray-800">
                                            <span>Total:</span>
                                            <span className="text-amber-600">Rs. {total.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                                

                            <div className="mt-3 space-y-2">

                                <Link href="/checkout" className="block">
                                    <Button className="w-full bg-amber-50 hover:bg-amber-100 text-amber-600 font-medium py-2.5 rounded-lg  transition-colors duration-200">
                                        Proceed to Checkout
                                    </Button>
                                </Link>

                                <button
                                    onClick={handleClearCart}
                                    className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors duration-200 text-sm font-medium"
                                >
                                    <Trash2 className="size-4" />
                                    Clear Cart
                                </button>
                            </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex-grow flex flex-col items-center justify-center text-center">
                            <div className="bg-amber-100 rounded-full p-8 mb-4">
                                <ShoppingBasket className="size-16 text-amber-500" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">Your cart is empty</h3>
                            <p className="text-gray-500">Add some delicious items to get started! 🛒</p>
                        </div>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default Cart;