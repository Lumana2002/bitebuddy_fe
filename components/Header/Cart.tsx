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
                    <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl p-4 mb-6 shadow-lg">
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <ShoppingBasket className="size-6 text-white" />
                            <h2 className="text-xl font-bold text-white">Your Cart</h2>
                        </div>
                        {restaurantName && (
                            <div className="flex justify-center">
                                <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                                    {restaurantName}
                                </span>
                            </div>
                        )}
                    </div>

                    {cart.length > 0 ? (
                        <div className="flex flex-col flex-grow">
                            {/* Clear Cart Button */}
                            <div className="flex justify-end mb-4">
                                <button
                                    onClick={handleClearCart}
                                    className="flex items-center gap-2 px-3 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors duration-200 text-sm font-medium"
                                >
                                    <Trash2 className="size-4" />
                                    Clear Cart
                                </button>
                            </div>

                            {/* Cart Items */}
                            <div className="flex-grow space-y-4 mb-6 overflow-y-auto">
                                {cart.map((food: any) => (
                                    <div key={food?.foodId} className="bg-white rounded-xl p-4 shadow-md border border-amber-100">
                                        <div className="flex gap-4">
                                            <div className="flex-shrink-0">
                                                <div className="w-16 h-16 rounded-lg overflow-hidden border-2 border-amber-200">
                                                    <Image 
                                                        src={imgPlaceholder} 
                                                        width={64} 
                                                        height={64} 
                                                        alt="food" 
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            </div>
                                            
                                            <div className="flex-grow">
                                                <h3 className="font-semibold text-gray-800 mb-1">{food?.name}</h3>
                                                <p className="text-amber-600 font-medium">Rs. {food?.price}</p>
                                            </div>
                                            
                                            <div className="flex flex-col items-center justify-center">
                                                <button
                                                    onClick={() => handleAddItem(food)}
                                                    className="w-8 h-8 bg-amber-500 hover:bg-amber-600 text-white rounded-full flex items-center justify-center transition-colors duration-200 mb-1"
                                                >
                                                    <ChevronUp className="size-4" />
                                                </button>
                                                <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium min-w-[2rem] text-center">
                                                    {food?.quantity}
                                                </span>
                                                <button
                                                    onClick={() => handleRemoveItem(food.foodId)}
                                                    className="w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors duration-200 mt-1"
                                                >
                                                    <ChevronDown className="size-4" />
                                                </button>
                                            </div>
                                            
                                            <div className="flex items-center">
                                                <p className="font-bold text-gray-800">
                                                    Rs. {(parseFloat(food.price) * (food?.quantity || 1)).toFixed(2)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Order Summary */}
                            <div className="bg-white rounded-xl p-4 shadow-md border border-amber-100">
                                <div className="space-y-3">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal:</span>
                                        <span>Rs. {subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Delivery Charge:</span>
                                        <span>Rs. 120.00</span>
                                    </div>
                                    <div className="border-t border-amber-200 pt-3">
                                        <div className="flex justify-between text-lg font-bold text-gray-800">
                                            <span>Total:</span>
                                            <span className="text-amber-600">Rs. {total.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <Link href="/checkout" className="block mt-4">
                                    <Button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold py-3 rounded-xl shadow-lg transform hover:scale-[1.02] transition-all duration-200">
                                        Proceed to Checkout
                                    </Button>
                                </Link>
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