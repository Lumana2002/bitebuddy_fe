"use client"
import React, { useState } from 'react'
import Hero from './_components/Hero'
// import SearchBar from './_components/Search'
import RestaurantCards from './_components/RestaurantCards'
import Divider from '@/components/Divider'

const page = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <main>
      <Hero onSearch={handleSearch} />
      <RestaurantCards searchTerm={searchTerm} />
      <Divider />
    </main>
  );
}


export default page


