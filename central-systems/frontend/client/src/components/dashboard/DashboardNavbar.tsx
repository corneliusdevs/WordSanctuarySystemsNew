"use client";


import Image from "next/image";

import { useState } from "react";

import Link from "next/link";

// import { usePathname } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi";

// interface DashboardNavbarProps {}

const DashboardNavbar = () => {
  // const currentPath = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className=" flex justify-between relative bg-[#3A2D4A]">
      {/* logo */}
      <Link href={"/"}>
        <div className="">
          <Image
            src="/assets/logo-main.png"
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

      <div className="">
        <div className="pr-[20px]">
          <Image
            src="/assets/Vector.png"
            alt="word sanctuary logo"
            height={10}
            width={73.02}
            className=""
          />
        </div>
        <div className=" pl-[50px] pt-[10px]">
          <nav className="hidden md:flex space-x-8 text-sm font-medium text-gray-500">
            <Link
              href="/dashboard/members"
              className="hover:text-[#FFFFFF] transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              href="#support"
              className="hover:text-[#FFFFFF] transition-colors duration-200"
            >
              Onboard
            </Link>
            <Link
              href="/dashboard/members"
              className="hover:text-[#FFFFFF] transition-colors duration-200"
            >
              Profile
            </Link>
            <Link
                href="/dashboard/members"
                className="hover:text-[#FFFFFF] transition-colors duration-200"
                onClick={toggleMenu}
              >
                Dashboards
              </Link>
            <Link
              href="/dashboard/logout"
              className="hover:text-[#FFFFFF] transition-colors duration-200"
            >
              Log Out
            </Link>
          </nav>

          {/* Menu Icon for Mobile */}
          <button
            type="button"
            onClick={toggleMenu}
            className="flex items-center justify-center w-[20px] h-[60px] md:hidden text-white font-bold rounded-full shadow-sm"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <FiX className="w-5 h-5" />
            ) : (
              <FiMenu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-16 right-0 w-1/3 bg-[#3A2D4A] text-gray-400 shadow-lg rounded-lg p-4 z-10 md:hidden mt-5">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/dashboard/home"
                className="hover:text-[#FFFFFF] transition-colors duration-200"
                onClick={toggleMenu} // Close the menu when a link is clicked
              >
                Home
              </Link>
              <Link
                href="/dashboard/onboard"
                className="hover:text-[#FFFFFF] transition-colors duration-200"
                onClick={toggleMenu}
              >
                Onboard
              </Link>

              <Link
                href="/dashboard/members"
                className="hover:text-[#FFFFFF] transition-colors duration-200"
                onClick={toggleMenu}
              >
                Profile
              </Link>

              <Link
                href="/dashboard/members"
                className="hover:text-[#FFFFFF] transition-colors duration-200"
                onClick={toggleMenu}
              >
                Dashboards
              </Link>
              <Link
                href="/dashboard/logout"
                className="hover:text-[#FFFFFF] transition-colors duration-200"
                onClick={toggleMenu}
              >
                Log Out
              </Link>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardNavbar;
