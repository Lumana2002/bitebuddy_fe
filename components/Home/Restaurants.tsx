"use client"
import Image from 'next/image'
import React from 'react'
import restaurant from '@/public/assets/restaurant.png'
import { useGetAllRestaurants } from '@/hooks/restaurantsQueries';
import Loading from '../Loading';
import Link from 'next/link';

const Restaurants = () => {
    const { data: restaurantData, isPending } = useGetAllRestaurants(1);

    if (isPending) return <Loading />

    return (
        // TODO i think mt-10 is better for all screens than mt-20?
        <section className="mt-10 md:mt-20 mx-[20px] md:mx-[40px] 2xl:mx-[80px] max-md:flex-wrap">
            <h1 className="text-[42px] font-bold text-center">Featured Restaurants</h1>
            <div className='mt-10 md:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-20'>
                {restaurantData?.content.slice(0, 8).map((item, index) => (
                    <div className='flex flex-col items-center justify-center gap-5' key={index}>
                        <Link href={`/restaurants/${item.restaurantId}`}>
                            <Image
                                src={item?.image || restaurant}
                                alt='Restaurant'
                                width={300}
                                height={300}
                            />
                            <h3 className="text-xl font-semibold opacity-80 mt-2">{item.name}</h3>
                        </Link>
                    </div>
                ))}
            </div>
        </section >
    )
}

export default Restaurants