"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import MenuBar from './_components/MenuBar';
import MenuSection from './_components/MenuSection';
import { useParams } from 'next/navigation';
import { useGetRestaurant } from '@/hooks/restaurantsQueries';
import { useGetRestaurantMenus } from '@/hooks/menusQueries';
import { useGetAllMenuFoods } from '@/hooks/foodQueries';

const Page = () => {
    const { id } = useParams();
    const [page, setPage] = useState<number>(1);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const { data: restaurantData } = useGetRestaurant(Number(id));
    const { data: rawMenuData } = useGetRestaurantMenus(Number(id), page);
    const menuData = rawMenuData?.content || [];

    const selectedMenuId = menuData.find(menu => menu.name === selectedCategory)?.menuId;
    const { data: foodData, isPending, refetch } = useGetAllMenuFoods(selectedMenuId, page);
    const filteredItems = foodData?.content || [];

    // Set default category when menuData is loaded or updated
    useEffect(() => {
        if (menuData.length > 0 && !selectedCategory) {
            setSelectedCategory(menuData[0].name);
        }
    }, [menuData]);

    // Refetch food data when selectedMenuId or page changes
    useEffect(() => {
        if (selectedMenuId) {
            refetch();
        }
    }, [selectedMenuId, page, refetch]);

    return (
        <main className="bg-gray-50 min-h-screen">
            {/* Header Section */}
            <div className="relative h-64 md:h-96">
                <Image
                    src={restaurantData?.image || "/path-to-hero-image.jpg"}
                    alt={restaurantData?.name || "Restaurant Name"}
                    layout="fill"
                    objectFit="cover"
                    className="w-full h-full"
                />
                <div className="absolute inset-0 bg-black opacity-60"></div>
                <div className="absolute bottom-0 left-0 p-6 text-white">
                    <h1 className="text-4xl font-bold">{restaurantData?.name}</h1>
                    <p className="mt-2">{restaurantData?.cuisine}</p>
                    <p className="mt-2">{restaurantData?.address}</p>
                    <div className="flex mt-4 space-x-4">
                        <button className="bg-red-500 px-4 py-2 rounded-lg">Delivery</button>
                        <button className="bg-gray-500 px-4 py-2 rounded-lg">Pickup</button>
                    </div>
                </div>
            </div>

            {/* Menu Bar Section */}
            <MenuBar
                categories={menuData.map(menu => menu.name)}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
            />
``
            {/* Menu Section */}
            {selectedCategory && (
                <MenuSection
                    selectedCategory={selectedCategory}
                    foodItems={filteredItems}
                />
            )}
        </main>
    );
};

export default Page;
