"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import React, { useState } from 'react'

const SearchBar = ({ onSearch }: { onSearch: (term: string) => void }) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        onSearch(e.target.value);
    };

    return (
        <div className='flex justify-center items-center'>
            <Input
                className='rounded-none focus:no-underline w-80 text-black placeholder:opacity-80 placeholder:italic'
                placeholder='Find your favorite restaurants'
                value={inputValue}
                onChange={handleInputChange}
            />
            <Button className='border border-1 bg-secondary rounded-none h-10 px-3 py-2 hover:bg-secondary/80 gap-2'>
                <Search />
            </Button>
        </div>
    );
}


export default SearchBar