"use client";

import Image from 'next/image';
import React from 'react';
import restaurantImage from '@/public/assets/restaurant.png';
import Link from 'next/link';
import { Button } from '../ui/button';
import Autoplay from "embla-carousel-autoplay";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { ChevronRight } from 'lucide-react';
import { useGetAllRestaurants } from '@/hooks/restaurantsQueries';
import { useSession } from 'next-auth/react';
import { useGetAllOrders } from '@/hooks/orderQueries';
import { useGetRestaurantRecommendation } from '@/hooks/restaurantsQueries'; // Adjust import path
import Loading from '../Loading';

const Recommendations = () => {
    const session = useSession();
    const userId = session.data?.user?.id;

    // Fetch orders
    const orders = useGetAllOrders(userId, 1);
    const { data: restaurantData } = useGetAllRestaurants(2); // Default restaurants

    // Fetch recommendations using custom hook
    const { data: recommendations, isLoading: isRecommendationsLoading } = useGetRestaurantRecommendation(
        {
            userOrders: orders.data?.content,
            token: session?.data?.user?.access_token,
        }
    );

    // Loading state
    if (isRecommendationsLoading) {
        return <Loading />; // Loading state
    }

    const displayData = (recommendations?.length ?? 0) > 0 ? recommendations : restaurantData?.content?.slice(0, 5);

    if (!displayData || displayData.length === 0) {
        return (
            <section className="mt-10 md:mt-20 mx-[20px] md:mx-[40px] 2xl:mx-[80px] max-md:flex-wrap">
                <h1 className="text-[42px] font-bold text-center">No Recommendations Found</h1>
                <p className="text-center text-lg mt-4">
                    Sorry, we couldn't find any recommendations for you at the moment. Please try again later.
                </p>
            </section>
        );
    }

    return (
        <section className="mt-10 md:mt-20 mx-[20px] md:mx-[40px] 2xl:mx-[80px] max-md:flex-wrap">
            <h1 className="text-[42px] font-bold text-center">Top Picks for You</h1>
            <Carousel
                plugins={[Autoplay({ delay: 3000, stopOnMouseEnter: true })]}
                opts={{ loop: true }}
                className="max-w-full justify-center flex"
            >
                    <CarouselContent className="flex">
                        {displayData.map((restaurant, index) => (
                            <CarouselItem key={index} className="basis-full">
                                <div className="max-md:max-w-full mx-10 mt-10 md:mt-20">
                                    <div className="flex gap-5 max-mmd:flex-col max-md:gap-0">
                                        <div className="flex flex-col w-[41%] max-mmd:w-full">
                                            <Image
                                                src={restaurant?.image || restaurantImage}
                                                width={500}
                                                height={500}
                                                objectFit="cover"
                                                alt="Restaurant"
                                                className="mmd:grow w-full aspect-[1.43] max-mmd:mt-6"
                                            />
                                        </div>
                                        <div className="flex flex-col ml-5 w-[59%] max-mmd:ml-0 max-mmd:w-full">
                                            <div className="flex flex-col self-stretch my-auto text-lg font-medium text-black max-md:mt-10">
                                                <h3 className="text-[28px] font-medium">{restaurant.name}</h3>
                                                <p className="mt-6 font-light leading-[26px] max-md:mt-4">
                                                    {restaurant.description}
                                                </p>
                                                <Link href={`/restaurants/${restaurant.restaurantId}`} className="flex justify-start items-center mt-[28px]">
                                                    <Button className="text-base text-white bg-primary hover:bg-primary/90">
                                                        {`Order Now`} <ChevronRight />
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                <div className='hidden md:block'>
                    <CarouselPrevious />
                    <CarouselNext />
                </div>
            </Carousel>
        </section>
    );
};

export default Recommendations;
