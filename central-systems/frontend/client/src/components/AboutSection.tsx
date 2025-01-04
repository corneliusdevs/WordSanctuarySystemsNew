"use client";

import React, { FC } from "react";
import Image from "next/image";

const AboutSection: FC = () => {
  return (
    <section className="bg-white py-10 px-5">
        {/* Top Section */}
        <div className="text-purple-950">
          {/* Title */}
          <div className="flex items-center mb-8">
            <Image
              src="/assets/globalLogo.png"
              alt="Icon"
              height={40} // Original height
              width={40} // Original width
              className="object-contain mr-4"
            />
            <h1 className="text-1xl uppercase">Word Sanctuary Central Systems</h1>
          </div>

          {/* Welcome Text */}
          <div className="mb-6">
            <h2 className="text-6xl uppercase">Welcome To</h2>
            <h2 className="text-7xl font-bold uppercase">Mount Zion!</h2>
          </div>

          {/* Description Text */}
          <div className="mb-4">
            <p className="text-lg font-medium">
              The Heavenly Jerusalem
              <br />
              A church that is heaven
            </p>
          </div>

          {/* Scroll Down Button */}
          <div className="mb-10">
            <button className="px-6 py-2 bg-purple-900 text-white shadow-lg hover:bg-purple-800">
              Scroll down
            </button>
          </div>
        </div>

        {/* Image Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center"> {/* Center the image containers */}
          {/* First Image */}
          <div className="relative overflow-hidden rounded-lg h-72 w-72"> 
            <Image
              src="/assets/about1.jpg"
              alt="Who We Are"
              layout="fill" 
              className="object-cover rounded-2xl" 
            />
            <div className="absolute inset-0 flex flex-col justify-between p-4 text-white">
              <h3 className="text-xl text-center uppercase">Who We Are</h3>
              <p className="text-lg flex items-center">
                Learn more <span className="ml-2">&rarr;</span>
              </p>
            </div>
          </div>

          {/* Second Image */}
          <div className="relative overflow-hidden rounded-lg h-72 w-72"> 
            <Image
              src="/assets/about2.jpg"
              alt="Connect With Us"
              layout="fill" 
              className="object-cover rounded-2xl" 
            />
            <div className="absolute inset-0 flex flex-col justify-between p-4 text-white">
              <h3 className="text-xl text-center uppercase">Connect <br /> With Us</h3>
              <p className="text-lg flex items-center">
                Learn more <span className="ml-2">&rarr;</span>
              </p>
            </div>
          </div>

          {/* Third Image */}
          <div className="relative overflow-hidden rounded-lg h-72 w-72"> 
            <Image
              src="/assets/about3.jpg"
              alt="Our Celebration"
              layout="fill" 
              className="object-cover rounded-2xl" 
            />
            <div className="absolute inset-0 flex flex-col justify-between p-4 text-white">
              <h3 className="text-xl text-center uppercase">Our <br /> Celebration</h3>
              <p className="text-lg flex items-center">
                Learn more <span className="ml-2">&rarr;</span>
              </p>
            </div>
          </div>
        </div>
    </section>
  );
};

export default AboutSection;
