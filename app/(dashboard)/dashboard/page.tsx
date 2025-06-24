"use client"
import Loading from '@/components/Loading';
import { useRouter } from 'next/navigation'
import React from 'react'

const page = () => {
  const router = useRouter();

  router.push('/dashboard/restaurants')


  return (
    <Loading />
  )
}

export default page