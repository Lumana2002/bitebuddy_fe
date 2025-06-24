"use client"
import Image from 'next/image'
import hero from '@/public/assets/hero.jpg'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { useState } from 'react'
import SearchBar from './Search'

const Hero = ({ onSearch }: any) => {

    return (
        <div className="relative bg-cover bg-center h-96" style={{ backgroundImage: `url(${hero.src})` }}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative z-10 flex items-center justify-center h-full mx-[20px] md:mx-[40px] 2xl:mx-[80px] my-2 max-md:flex-wrap">
                <div className="text-start text-white">
                    <h1 className="text-5xl font-bold text-secondary">Restaurants</h1>
                    <p className="mt-4 text-lg">Find your favorite restaurants</p>
                    <div className='flex mt-4'>
                        <SearchBar onSearch={onSearch} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero
