"use client";

import React, { FC } from "react";
import Image from "next/image";

const VisionSection: FC = () => {
  return (
    <section className="relative bg-primarycol w-full h-[30vh]">
      {/* Background and Layout */}
      <div className="absolute inset-0 flex">
        {/* Left Background */}
        <div className="bg-primarycol"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center uppercase text-center w-full h-full px-6">
        {/* Vision */}
        <div className="mb-5 mt-3">
        <h2 className="text-[15px] mb-0 font-medium text-white lg:text-[clamp(60px, 8vw, 70px)] xl:text-[clamp(60px, 8vw, 70px)]">VISION</h2>
        <p className="text-[17.83px] font-bold text-white mt-4 relative lg:text-[clamp(20px, 5vw, 32px)] xl:text-[clamp(24px, 6vw, 36px)]">
            A CHURCH THAT{" "}
            <span className="relative inline-block">
              <span className="absolute inset-0 w-auto h-full z-0">
                <Image
                  src="/assets/heaven.jpg"
                  alt="Heaven Background"
                  layout="fill"
                  objectFit="cover"
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
        <div className="mb-5">
          <h3 className="text-[clamp(24px, 5vw, 40px)] font-normal text-white">MISSION</h3>
          <p className="text-[clamp(16px, 4vw, 28px)] font-normal capitalize text-white mt-1">
            A gathering of achievers
          </p>
        </div>

        {/* Mandate */}
        <div className="mb-3">
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
