"use client"
import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

const Request = () => {
  return (
    <section className="mt-20 mx-[20px] md:mx-[40px] 2xl:mx-[80px] max-md:flex-wrap">
      <div className='flex flex-col justify-center items-center gap-2'>
        <h1 className="text-[42px] font-bold text-center mb-2">Looking to register your Restaurant?</h1>
        <div className="text-xl font-normal text-center opacity-80 flex flex-col gap-1 mb-2">
          <p>Partner with us to bring your delicious dishes to a</p>
          <span className=' underline decoration-secondary'>wider audience</span>

        </div>
        <Link href={`/contact`}>
          <Button className='bg-primary hover:bg-primary/90 text-white text-base uppercase'>
            Send request
          </Button></Link>
      </div>
    </section>
  )
}

export default Request