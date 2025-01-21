"use client"

import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import MaxwidthWrapper from "../Min_Max_Width_Wrapper";

const DesktopNavbar: FC = () => {
  const navbarItems = [
    { text: "Home", link: "/" },
    { text: "About", link: "about-us" },
    { text: "Installations", link: "installation" },
    { text: "Contact Us", link: "contact-us" },
  ];

  return (
    <nav className="hidden md:block w-full bg-primarycol shadow-lg">
      <MaxwidthWrapper>
        <div className="flex justify-between items-center h-20 px-29">
          {/* Logo */}
          <div>
            <Image
              src="/assets/globalLogo.png"
              alt="Logo"
              height={190}
              width={190}
              className="object-contain"
            />
          </div>

          {/* Navbar Links */}
          <div className="flex items-center space-x-8">
            {navbarItems.map((item, index) => (
              <Link
                key={`${item.text}-${index}`}
                href={`/${item.link}`}
                className="text-white hover:text-gray-300 transition duration-300 text-lg capitalize"
              >
                {item.text}
              </Link>
            ))}
          </div>

          {/* Sign In Button */}
          <div>
            <Link
              href="/auth/login"
              className="bg-white border border-primarycol text-primarycol py-2 px-4 rounded-md hover:bg-gray-100 transition duration-300"
            >
              Sign In
            </Link>
          </div>
        </div>
      </MaxwidthWrapper>
    </nav>
  );
};

export default DesktopNavbar;
