"use client";

import React, { FC } from "react";
import Image from "next/image";

const VisionSection: FC = () => {
  return (
    <section className="relative w-full h-[60vh]">
      {/* Background and Layout */}
      <div className="absolute inset-0 flex">
        {/* Left Background */}
        <div className="w-1/2 bg-primarycol"></div>
        {/* Right Background */}
        <div className="w-1/2 relative">
          <Image
            src="/assets/vision.jpg"
            alt="Vision Background"
            layout="fill"
            objectFit="cover"
            className="object-cover opacity-60" // Further reduce opacity
          />
          <div className="absolute inset-0 w-full h-full bg-primarycol mix-blend-overlay"></div> {/* Adjust blend mode */}
        </div>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-primarycol to-transparent"></div> {/* Gradient overlay */}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center w-full h-full px-6">
        {/* Vision */}
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl text-white">OUR VISION</h2>
          <p className="text-2xl md:text-3xl font-semibold text-white mt-4">
            A CHURCH THAT <span className="bg-white text-purple-950 px-2">IS HEAVEN!</span>
          </p>
        </div>

        {/* Mission */}
        <div className="mb-10">
          <h3 className="text-3xl md:text-4xl text-white">OUR MISSION</h3>
          <p className="text-xl md:text-2xl font-semibold text-white mt-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>

        {/* Mandate */}
        <div>
          <h3 className="text-3xl md:text-4xl text-white">OUR MANDATE</h3>
          <p className="text-xl md:text-2xl font-semibold text-white mt-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
