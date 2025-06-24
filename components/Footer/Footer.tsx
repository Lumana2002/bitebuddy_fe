import Image from "next/image";
import Link from "next/link";

import { footerLists } from "./list/footerLists";
import { socialLinks } from "./list/socialLinks";
import building from "@/public/assets/ph_building-office.png";

const Footer = () => {
  return (
    <footer className="overflow-x-hidden mx-[20px] md:mx-[40px] 2xl:mx-[80px]">
      <div className="xl:flex gap-5 justify-between items-start mt-[72px] w-full max-md:mt-10 grid grid-cols-1 md:grid-cols-4 mmd:grid-cols-6">
        <div className="xl:flex xl:flex-col xl:w-[20%] grid mmd:col-span-2 col-span-2">
          <h2 className="text-2xl font-normal leading-[28px] text-black">
            BiteBuddy
          </h2>
          <p className="mt-[19px] text-lg font-light leading-7 text-black ">
          Discover your favorite meals and order from the best restaurants around you, all in one place. At BiteBuddy, we bring convenience and flavor to your doorstep, offering a seamless food ordering experience tailored just for you.
          </p>
          <div className="flex gap-2.5 mt-11 max-md:mt-10">
            {socialLinks.map((item, index) => (
              <Link
                key={index}
                href={item.link}
                className="bg-black w-[40px] h-[40px] flex justify-center items-center"
              >
                <Image
                  src={item.src}
                  width={20}
                  height={20}
                  alt={`Our ${item.name}`}
                />
              </Link>
            ))}
          </div>
        </div>
        <nav className="xl:flex xl:flex-col xl:w-[10%] xl:mt-0 mt-4 pb-2.5 text-base text-slate-700 grid col-span-2 mmd:col-span-2">
          <h3 className="text-xl font-medium text-black">Links</h3>
          <div className="flex flex-col mt-4 xl:mt-[26px] space-y-5">
            {footerLists.map((item, index) => (
              <Link
                href={item.link}
                className="transition duration-150 hover:text-yellow-400 text-base leading-[18px]"
                key={index}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
        {/* <div className="xl:flex xl:flex-col xl:w-[20%] xl:mt-0 mt-4 text-base text-slate-700  grid col-span-2 mmd:col-span-2 ">
          <h3 className="text-xl font-medium text-black">Opening hours</h3>
          <div className="flex flex-col mt-4 xl:mt-[26px] space-y-5 items-start">
            {openingLists.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-[auto_auto] gap-2 3xl:gap-4 lg:text-[1rem] text-sm"
              >
                <span className="min-w-[90px]">{`${item.day}: `}</span>
                <span>{`${item.time}`}</span>
              </div>
            ))}
          </div>
        </div> */}
        <div className="xl:flex xl:flex-col xl:w-[30%] xl:mt-0 mt-4 text-base leading-6 text-black grid col-span-2 mmd:col-span-3">
          <h3 className="text-xl font-medium">Contact information</h3>
          <div>
            <div className="flex gap-5 mt-4 xl:mt-[26px]">
              <div className="bg-black w-[60px] h-[60px] flex justify-center items-center">
                <Image
                  src={building}
                  width={30}
                  height={30}
                  alt="Location icon"
                />
              </div>
              <p className="flex-auto my-auto font-normal text-base text-pretty">
                Mhepi, Kathmandu <br className="block 2xl:hidden" />
              </p>
            </div>
            <div className="flex gap-5 mt-8">
              <div className="bg-black w-[60px] h-[60px] flex justify-center items-center">
                <Image
                  src={building}
                  width={30}
                  height={30}
                  alt="Location icon"
                />
              </div>
              <div className="flex-auto my-auto font-normal text-base">
                <p>Contact number:</p>
                <span className="text-xl font-bold">(977) 9810350199</span>
              </div>
            </div>
            <div className="flex gap-5 mt-8">
              <div className="bg-black w-[60px] h-[60px] flex justify-center items-center">
                <Image
                  src={building}
                  width={30}
                  height={30}
                  alt="Location icon"
                />
              </div>
              <div className="flex-auto my-auto font-normal text-base">
                <p>Email Address:</p>
                <a href="mailto:info@dualbrakecarhire.com.au">
                  info@bitebuddy.com.np
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="shrink-0 mt-14 max-w-full h-px border border-solid bg-neutral-200 border-neutral-200 max-md:mt-10" />
      <div className="flex flex-col items-center mmd:flex-row gap-2 md:gap-5 justify-between mt-3 md:mt-6 text-sm text-zinc-600 pb-4">
        <p className="text-center">
          © Copyright 2024 . All Rights Reserved.
        </p>
        <div className="flex flex-col items-center sm:flex-row gap-2 md:gap-5 justify-between">
          <nav>
            <a href="#privacy">Privacy policy</a> |{" "}
            <a href="#terms">Terms & conditions</a> |
          </nav>
          <p>
            Made with 🖤 by <span className="font-bold">Rajan & Lumana</span>.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
