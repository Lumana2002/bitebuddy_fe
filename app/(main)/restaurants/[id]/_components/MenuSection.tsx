"use client"
import React from 'react';
import Image from 'next/image';
import imgPlaceholder from '@/public/assets/img-placeholder.png';
import { Button } from '@/components/ui/button';
import useCart from '@/hooks/useCart';
import Food from './Food';

interface MenuSectionProps {
    selectedCategory: string;
    foodItems: Food[];
}

const MenuSection: React.FC<MenuSectionProps> = ({ selectedCategory, foodItems }) => {
    return (
        <div className="px-6 py-10">
            <h2 className="text-2xl font-semibold mb-4">{selectedCategory}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {foodItems.map((item, index) => (
                    <Food food={item} index={index} />
                ))}
            </div>
        </div>
    );
};

export default MenuSection;
