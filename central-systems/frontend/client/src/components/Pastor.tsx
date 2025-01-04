"use client";

import React, { FC } from "react";
import Image from "next/image";

const Pastor: FC = () => {
  return (
    <section className="w-full py-10 bg-hash flex justify-between items-center">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Left Section */}
        <div className="flex flex-col items-center text-center md:w-1/2 px-4">
          <Image
            src="/assets/globalLogo.png"
            alt="Logo"
            width={100}
            height={100}
            className="object-contain mb-8"
          />
          <h2 className="text-3xl font-bold tracking-widest text-primarycol mb-4">OUR PASTOR</h2>
          <p className="text-lg text-primarycol mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum.
          </p>
          <button className="bg-purple-950 text-white py-2 px-6 rounded-lg font-medium">
            Learn More
          </button>
        </div>

        {/* Right Section */}
        <div className="md:w-1/2 flex justify-center">
          <Image
            src="/assets/pastor.png"
            alt="Pastor"
            width={350} // Increased width
            height={500} // Increased height
            className="object-cover rounded-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Pastor;
