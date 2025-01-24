"use client";

import React, { FC, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react"; // Close icon
import Link from "next/link";
import MaxwidthWrapper from "../Min_Max_Width_Wrapper";

// Custom Two-Dash Icon Component
const TwoDashIcon: FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    className={className}
  >
    <line x1="4" y1="8" x2="20" y2="8" />
    <line x1="4" y1="16" x2="20" y2="16" />
  </svg>
);

const Navbar: FC = () => {
  const navbarItems = [
    { text: "Home", link: "/" },
    { text: "About", link: "aboutSection" },
    { text: "Installations", link: "installation" },
    { text: "Contact Us", link: "contact-us" },
  ];

  const [openNavbar, setOpenNavbar] = useState<boolean>(false);

  return (
    <nav className="md:hidden w-full bg-primarycol shadow-lg fixed z-50 pt-0 mt-0">
      <MaxwidthWrapper>
        <div className="flex justify-between items-center h-16 px-6">
          {/* Logo */}
          <div>
            <Image
              src="/assets/globalLogo.png"
              alt="Logo"
              height={120}
              width={120}
              className="object-contain"
            />
          </div>
          {/* Menu Icon */}
          <div
            className="flex items-center justify-center mx-4 hover:cursor-pointer text-white"
            onClick={() => {
              setOpenNavbar((v) => !v);
            }}
          >
            {openNavbar ? (
              <X className="w-8 h-8" />
            ) : (
              <TwoDashIcon className="w-8 h-8" />
            )}
          </div>
        </div>

        {/* Mobile Menu Items */}
        {openNavbar && (
          <div className="bg-primarycol transition-all duration-500 ease-in-out">
            <div className="flex flex-col items-center py-2">
              {navbarItems.map((item, index) => (
                <Link
                  key={item.link + item.text + index}
                  href={`/${item.link}`}
                  onClick={() => {
                    setOpenNavbar((v) => !v);
                  }}
                  className="text-white hover:bg-secondarycol hover:text-white text-center py-2 w-full transition-all duration-300 capitalize"
                >
                  {item.text}
                </Link>
              ))}
              {/* Sign In Button */}
              <Link
                href="/auth/login"
                onClick={() => {
                  setOpenNavbar((v) => !v);
                }}
                className="bg-white border border-primarycol text-primarycol py-2 px-4 rounded-md hover:bg-gray-100 transition duration-300 mt-2 w-11/12 text-center"
              >
                Sign In
              </Link>
            </div>
          </div>
        )}
      </MaxwidthWrapper>
    </nav>
  );
};

export default Navbar;

