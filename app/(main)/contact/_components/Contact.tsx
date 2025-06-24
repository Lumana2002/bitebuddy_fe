import React from 'react'
import ContactForm from './ContactForm'
import { Mail, Map, MapPin } from 'lucide-react'
import Link from 'next/link'

const Contact = () => {
  return (

    <section className="mt-10 mx-[20px] md:mx-[40px] 2xl:mx-[80px] max-md:flex-wrap">
      <div className="flex justify-evenly gap-5 max-mmd:flex-col max-md:gap-0">
        <div className="flex flex-col max-mmd:w-full gap-y-10 justify-center">
          <h3 className="text-xl font-bold text-secondary uppercase">Contact Information</h3>
          <div className="flex items-center gap-3 mb-6">
            <div className="flex justify-center items-center mr-4">
              <div className="rounded-full bg-secondary size-14 absolute z-0"></div>
              <Mail className="size-10 text-white z-10" />
            </div>
            <div className="flex flex-col">
              <p className="text-primary/80 font-semibold text-base">Message Us</p>
              <Link
                href={"mailto:sales@quantumc.tech"}
                className="text-lg font-bold"
              >
                info@bitebuddy.com.np
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex justify-center items-center mr-4">
              <div className="rounded-full bg-secondary size-14 absolute z-0"></div>
              <MapPin className="size-10 text-white z-10" />
            </div>
            <div className="flex flex-col">
              <p className="text-primary/80 font-semibold text-base">Call Us</p>
              <h3 className="text-lg font-bold">(977) 9810350199</h3>
            </div>
          </div>
        </div>
        <div className="flex flex-col ml-5 w-auto max-mmd:ml-0 max-mmd:w-full">
          <div className="flex flex-col self-stretch my-auto text-lg font-medium text-black max-md:mt-10">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>

  )
}

export default Contact