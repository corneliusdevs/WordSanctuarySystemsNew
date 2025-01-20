"use client";

import React, { FC } from "react";
import Image from "next/image";

const Installation: FC = () => {
  const installations = [
    { location: "Ilorin", churches: "7 churches", imgSrc: "/assets/ilorin.jpg" },
    { location: "Lagos", churches: "1 church", imgSrc: "/assets/lagos.jpg" },
    { location: "Abuja", churches: "3 churches", imgSrc: "/assets/abuja.jpg" },
    { location: "Ibadan", churches: "2 churches", imgSrc: "/assets/ibadan.jpg" },
    { location: "USA", churches: "1 church", imgSrc: "/assets/usa.jpg" },
  ];

  return (
    <section className="w-full py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Images */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 justify-center items-center">
          {installations.map((installation, index) => (
            <div key={index} className="relative w-28 h-52 overflow-hidden rounded-lg">
              <Image
                src={installation.imgSrc}
                alt={installation.location}
                layout="fill"
                objectFit="cover"
                className="rounded-3xl"
              />
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-lg font-bold">{installation.location}</h3>
                <p className="text-sm font-medium">{installation.churches}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Installation;

