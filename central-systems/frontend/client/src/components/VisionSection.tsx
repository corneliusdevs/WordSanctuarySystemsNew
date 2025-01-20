"use client";

import React, { FC } from "react";
import Image from "next/image";

const VisionSection: FC = () => {
  return (
    <section className="relative w-full h-[50vh]">
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
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 w-full h-full bg-primarycol mix-blend-overlay"></div>
        </div>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-primarycol to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center uppercase text-center w-full h-full px-6">
        {/* Vision */}
        <div className="mb-10">
          <h2 className="text-[clamp(24px, 5vw, 40px)] font-normal text-white">VISION</h2>
          <p className="text-[clamp(16px, 4vw, 28px)] font-bold text-white mt-4 relative">
            A CHURCH THAT{" "}
            <span className="relative inline-block">
              <span className="absolute inset-0 w-auto h-full z-0">
                <Image
                  src="/assets/heaven.jpg"
                  alt="Heaven Background"
                  layout="fill"
                  objectFit="cover" // ensure the image covers the text properly
                  className="rounded-md"
                />
              </span>
              <span className="relative z-10 bg-opacity-75 px-2 text-primarycol">
                IS HEAVEN!
              </span>
            </span>
          </p>

        </div>

        {/* Mission */}
        <div className="mb-10 ">
          <h3 className="text-[clamp(24px, 5vw, 40px)] font-normal text-white">MISSION</h3>
          <p className="text-[clamp(16px, 4vw, 28px)] font-normal capitalize text-white mt-1">
            A gathering of achievers
          </p>
        </div>

        {/* Mandate */}
        <div>
          <h3 className="text-[clamp(24px, 5vw, 40px)] font-normal text-white">MANDATE</h3>
          <p className="text-[clamp(16px, 4vw, 28px)] font-normal capitalize text-white mt-1">
            Making a Family For God On Earth.
          </p>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
