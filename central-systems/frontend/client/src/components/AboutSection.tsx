"use client";

import React, { FC } from "react";
import Image from "next/image";
import MaxwidthWrapper from "./Min_Max_Width_Wrapper";

const AboutSection: FC = () => {
  return (
    <section className="bg-white py-10 px-5 w-full overflow-hidden">
      <MaxwidthWrapper>
        {/* Top Section */}
        <div className="text-purple-950 flex flex-col sm:flex-row justify-between items-start sm:justify-start mb-8 w-full gap-4 px-0 ml-0">
          <div className="flex flex-col items-start text-left flex-1">
            {/* Welcome Text */}
            <div className="mb-4">
              <h2 className="text-[31px] sm:text-[47.5px] lg:text-[50px] font-normal uppercase">
                Welcome To
              </h2>
              <h2 className="text-[32.8px] sm:text-[37.5px] lg:text-[45px] font-bold uppercase">
                Mount Zion!
              </h2>
            </div>

            {/* Description Text */}
            <div>
              <p className="text-base sm:text-lg lg:text-xl font-medium leading-relaxed text-[17px]">
                The Heavenly Jerusalem
                <br />
                A church that is heaven
              </p>
            </div>
          </div>
        </div>
      </MaxwidthWrapper>

      {/* Image Section */}
      <div className="grid grid-cols-3 sm:grid-cols-3 gap-8 justify-items-center w-full ml-0 px-0">
        {/* First Image */}
        <div className="relative rounded-lg w-[110.64px] h-[118.44px] sm:w-32 sm:h-64 md:w-48 md:h-72 lg:w-64 lg:h-96 xl:w-80 xl:h-120">
          <Image
            src="/assets/about1.jpg"
            alt="Who We Are"
            layout="fill"
            className="object-cover rounded-2xl"
          />
          <div className="absolute inset-0 flex flex-col justify-between p-4 text-white text-center">
            <h3 className="text-sm sm:text-xl lg:text-2xl capitalised">
              Who We Are
            </h3>
            <p className="text-[10px] sm:text-xs lg:text-base flex items-center justify-center">
             Learn more
            </p>
          </div>
        </div>

        {/* Second Image */}
        <div className="relative rounded-lg w-[110.64px] h-[118.44px] sm:w-32 sm:h-64 md:w-48 md:h-72 lg:w-64 lg:h-96 xl:w-80 xl:h-120">
          <Image
            src="/assets/about2.jpg"
            alt="Connect With Us"
            layout="fill"
            className="object-cover rounded-2xl"
          />
          <div className="absolute inset-0 flex flex-col justify-between p-4 text-white text-center">
            <h3 className="text-sm sm:text-xl lg:text-2xl capitalised">
              Connect <br /> With Us
            </h3>
            <p className="text-[10px] sm:text-xs lg:text-base flex items-center justify-center">
             Learn more
            </p>
          </div>
        </div>

        {/* Third Image */}
        <div className="relative rounded-lg w-[110.64px] h-[118.44px] sm:h-64 md:w-48 md:h-72 lg:w-64 lg:h-96 xl:w-80 xl:h-120">
          <Image
            src="/assets/about3.jpg"
            alt="Our Celebration"
            layout="fill"
            className="object-cover rounded-2xl"
          />
          <div className="absolute inset-0 flex flex-col justify-between p-4 text-white text-center">
            <h3 className="text-sm sm:text-xl lg:text-2xl capitalised">
              Our <br /> Celebration
            </h3>
            <p className="text-[10px] sm:text-xs lg:text-base flex items-center justify-center">
             Learn more
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
