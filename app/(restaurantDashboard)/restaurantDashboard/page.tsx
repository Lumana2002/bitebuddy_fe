"use client"
import Loading from '@/components/Loading';
import { useRouter } from 'next/navigation'
import React from 'react'

const page = () => {
  const router = useRouter();

  router.push('/restaurantDashboard/menus')
  return (
    <Loading />
  )
}

export default page