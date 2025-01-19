"use client";

// import { CalendarDays, Contact2, Mail, MailCheck } from "lucide-react";

import Image from "next/image";

import { FC, useState } from "react";

import Link from "next/link";

import ButtonWithIcons from "../ButtonWithIcon";
import Sidebar from "../Sidebar";
import { usePathname } from "next/navigation";

// interface DashboardNavbarProps {}

const DashboardNavbar: FC = () => {
  const currentPath = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className=" flex justify-between pr-[40px]">
      {/* logo */}
      <Link href={"/"}>
        <div className="">
          <Image
            src="/assets/logo1.svg"
            alt="mclev logo"
            height={50}
            width={200}
          />
        </div>
      </Link>
      {/* <div className="">
        <Sidebar
          side={"right"}
          childComponent={
            <div className="h-[90px] flex flex-col justify-around pt-[60px]">
 
              <Link href={"/dashboard/home"}>
                <ButtonWithIcons
                  text={"Home"}
                  className={`${
                    currentPath.includes("home")
                      ? "text-white bg-primarycol"
                      : "secondary"
                  } w-full bg hover:bg-primarycol/70 hover:text-white mb-2`}
                  variant={`${
                    currentPath.includes("Home") ? "default" : "secondary"
                  }`}
                />
              </Link>
              <Link href={"/dashboard/onboard"}>
                <ButtonWithIcons
                  text={"Onboard"}
                  className={`${
                    currentPath.includes("onboard")
                      ? "text-white bg-primarycol"
                      : "secondary"
                  } w-full bg hover:bg-primarycol/70 hover:text-white mb-2`}
                  variant={`${
                    currentPath.includes("onboard") ? "default" : "secondary"
                  }`}
                />
              </Link>

              <Link href={"/dashboard/profile"}>
                <ButtonWithIcons
                  text={"Profiles"}
                  className={`${
                    currentPath.includes("profiles")
                      ? "text-white bg-primarycol"
                      : "secondary"
                  } w-full bg hover:bg-primarycol/70 hover:text-white mb-2`}
                  variant={`${
                    currentPath.includes("profiles") ? "default" : "secondary"
                  }`}
                />
              </Link>
            </div>
          }
        />
      </div> */}

      <div className=" p-[20px]">
      <nav className="hidden md:flex space-x-8 text-sm font-medium text-black">
          <a
            href="#home"
            className="hover:text-purple-500 transition-colors duration-200"
          >
            Home
          </a>
          <a
            href="#support"
            className="hover:text-purple-500 transition-colors duration-200"
          >
            Support
          </a>
          <a
            href="#profile"
            className="hover:text-purple-500 transition-colors duration-200"
          >
            Profile
          </a>
        </nav>

        {/* Menu Icon for Mobile */}
        <button
          type="button"
          onClick={toggleMenu}
          className="flex items-center justify-center w-8 h-8 md:hidden text-purple-900 bg-white rounded-full border border-gray-300 shadow-sm hover:bg-gray-100"
          aria-label="Toggle menu"
        >
          <span
            className={`w-4 h-4 border-b-2 border-t-2 border-purple-800 block transform transition-transform ${
              isMenuOpen ? "rotate-90" : ""
            }`}
          ></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 right-0 w-2/3 bg-white text-purple-800 shadow-lg rounded-lg p-4 z-10 md:hidden">
          <nav className="flex flex-col space-y-4">
            <a
              href="#home"
              className="hover:text-purple-500 transition-colors duration-200"
              onClick={toggleMenu} // Close the menu when a link is clicked
            >
              Home
            </a>
            <a
              href="#support"
              className="hover:text-purple-500 transition-colors duration-200"
              onClick={toggleMenu}
            >
              Support
            </a>
            <a
              href="#profile"
              className="hover:text-purple-500 transition-colors duration-200"
              onClick={toggleMenu}
            >
              Profile
            </a>
          </nav>
          
      </div>
      )}
    </div>
  );
};

export default DashboardNavbar;
