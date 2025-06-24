"use client"
import Image from 'next/image'
import React from 'react'
import imgPlaceholder from '@/public/assets/img-placeholder.png';
import { Button } from '@/components/ui/button';
import chilly from '@/public/assets/chilli-pepper.png';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { addItem } from '@/store/slices/cartSlice';

const Food = ({ food, index }: any) => {
    const dispatch = useDispatch();

    const handleAddItem = (item: Food) => {
        dispatch(addItem(item));
    };

    return (
        <div key={index} className="flex items-center bg-white p-4 rounded-lg shadow-md">
            <Image
                src={imgPlaceholder}
                alt={food.name}
                width={100}
                height={100}
                className="rounded-lg"
            />
            <div className="ml-4">
                <h3 className="text-lg font-semibold">{food.name}</h3>
                {/* <p className="text-gray-600 mt-1">{item.description}</p> */}
                <p className="text-gray-800 font-bold mt-2 flex"><span>Rs. {food.price} | </span>
                    <span className='flex gap-2 justify-center items-center ml-2'>
                        {Array.from({ length: food.spiceLevel }).map((_, index) => (
                            <Image
                                src={chilly}
                                alt="Chilly"
                                width={20}
                                height={20}
                                key={index}
                                className='bg-transparent'
                            />
                        ))}
                    </span></p>
            </div>
            <Button className="ml-auto h-8  text-white px-3 py-1 rounded-lg" onClick={() => handleAddItem(food)}>+</Button>
        </div>
    )
}

export default Food