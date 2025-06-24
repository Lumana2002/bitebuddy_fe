import React, { useState, useEffect, useRef } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import restaurantImage from '@/public/assets/restaurant.png';
import { useGetAllRestaurants } from "@/hooks/restaurantsQueries";
import Loading from "@/components/Loading";
import { ChefHat, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";


const RestaurantCards = ({ searchTerm }: any) => {
    const [page, setPage] = useState<number>(1);
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const { data, isPending } = useGetAllRestaurants(page);

    useEffect(() => {
        if (data) {
            setRestaurants((prevRestaurants) => [
                ...prevRestaurants,
                ...data.content, 
            ]);
        }
    }, [data]);

    const handleViewMore = () => {
        setPage((prevPage) => prevPage + 1); 
    };

    const isLastPage = data?.totalPages && page >= data.totalPages;

    // Filter restaurants based on search term
    const filteredRestaurants = restaurants.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isPending) {
        return <Loading />;
    }

    return (
        <section className="mt-10 mx-[20px] md:mx-[40px] 2xl:mx-[80px] max-md:flex-wrap">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-14">
                {filteredRestaurants.map((restaurant) => (
                    <Card key={restaurant.restaurantId} className="hover:shadow-lg transition-shadow">
                        <CardHeader className="p-4">
                            <Image
                                src={restaurant?.image || restaurantImage}
                                alt={restaurant.name}
                                width={400}
                                height={200}
                                className="rounded-t-md object-cover h-[300px] w-full"
                                loading="lazy"
                            />
                        </CardHeader>
                        <CardContent className="p-4">
                            <CardTitle className="text-lg font-bold">{restaurant.name}</CardTitle>
                            <div className="text-sm text-gray-500">
                                <div className="flex items-center space-x-2 mt-2">
                                    <MapPin />
                                    <span>{restaurant.address || "Kathmandu"}</span>
                                </div>
                                <div className="flex items-center space-x-2 mt-1">
                                    <ChefHat />
                                    <span>{restaurant.cuisine}</span>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="p-4">
                            <Link href={`/restaurants/${restaurant.restaurantId}`}>
                                <Button className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition-colors">
                                    View Details
                                </Button>
                            </Link>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {!isLastPage && (
                <div className="justify-center items-center flex mt-10">
                    <Button className="text-white" onClick={handleViewMore}>View More</Button>
                </div>
            )}
        </section>
    );
};


export default RestaurantCards;

