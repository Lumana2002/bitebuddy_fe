"use client"
import React, { useState, useEffect } from 'react';
import { useGetRestaurantMenus } from '@/hooks/menusQueries';
import { useParams } from 'next/navigation';
import Loading from '@/components/Loading';
import { Loader2 } from 'lucide-react';

interface MenuBarProps {
    categories: string[];
    selectedCategory: string | null;
    onSelectCategory: (category: string) => void;
}

const MenuBar: React.FC<MenuBarProps> = ({ categories, selectedCategory, onSelectCategory }) => {
    const { id: restaurantId } = useParams();
    const [page, setPage] = useState<number>(1);
    const { data: menuData, isPending: isLoading } = useGetRestaurantMenus(Number(restaurantId), page);

    useEffect(() => {
        if (menuData && menuData.content?.length > 0 && selectedCategory === null) {
            onSelectCategory(menuData.content[0].name);
        }
    }, [menuData, selectedCategory, onSelectCategory]);

    if (isLoading) {
        return (
            <div className="mb-3 mt-6 w-full flex items-center justify-center">
                <Loader2 className="size-10 animate-spin" />
            </div>
        );
    }

    return (
        <nav className="bg-white shadow-md">
            <div className="container mx-auto px-6 py-4 flex items-center space-x-6 overflow-x-auto">
                {/* Hamburger Menu Icon */}
                <div className="flex-shrink-0">
                    <button className="focus:outline-none">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>

                {/* Menu Items */}
                {menuData && menuData.content?.map((menu, index) => (
                    <button
                        key={index}
                        onClick={() => onSelectCategory(menu.name)}
                        className={`text-lg font-medium pb-2 whitespace-nowrap ${selectedCategory === menu.name ? 'border-b-2 border-black' : 'text-gray-600'}`}
                    >
                        {menu.name}
                    </button>
                ))}

                {/* Search Bar */}
                <div className="flex-grow text-right">
                    <input
                        type="text"
                        placeholder={`Search in ${selectedCategory || 'restaurant'}`}
                        className="bg-gray-100 text-sm py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-300"
                    />
                </div>
            </div>
        </nav>
    );
};

export default MenuBar;
