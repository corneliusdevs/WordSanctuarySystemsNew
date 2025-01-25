"use client";

import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import MaxwidthWrapper from "../Min_Max_Width_Wrapper";

const DesktopNavbar: FC = () => {
  const navbarItems = [
    { text: "Home", link: "/" },
    { text: "About", link: "/" },
    { text: "Installations", link: "/" },
    { text: "Services", link: "/" },
    { text: "Logout", link: "/dashboard/logout" },
    { text: "Sign In", link: "auth/login" }, // Replacing "Onboard" with "Sign In"
  ];

  return (
    <nav className="hidden md:block w-full bg-primarycol shadow-lg pr-6">
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
                className="text-white hover:bg-white/90 hover:text-primarycol p-2 transition duration-300 text-lg uppercase"
              >
                {item.text}
              </Link>
            ))}
          </div>
        </div>
      </MaxwidthWrapper>
    </nav>
  );
};

export default DesktopNavbar;
