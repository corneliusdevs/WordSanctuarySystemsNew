"use client"

import React from "react";
import Image from "next/image";

const Hero: React.FC = () => {
    return (
      <div className="relative h-80 mb-16">
        <Image
          src="/assets/heroImg.png"
          alt="Hero Image"
          fill
          sizes=""
          className="h-80 mt-16"
          quality={100}
        />
      </div>
    );
  };
  
  export default Hero;
  