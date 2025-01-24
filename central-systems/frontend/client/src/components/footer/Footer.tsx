import React, { FC } from "react";
import Image from "next/image";
import {
  Facebook,
  Instagram,
  Twitter as X,
  Youtube,
} from "lucide-react";

const Footer: FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primarycol text-white py-1">
      <div className="max-w-7xl mx-auto px-6">
        {/* Logo */}
        <div className="mb-0 pl-0 ml-0">
          <Image
            src="/assets/globalLogo.png"
            alt="Global Logo"
            width={150}
            height={150}
            className="object-contain"
          />
        </div>

        {/* Columns */}
        <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-3 gap-8">
          {/* Connect Column */}
          <div>
            <h6 className="text-[8.2px] font-extralight uppercase mb-1">Connect With Us</h6>
            <ul>
              <li>
                <a
                  href="#"
                  className="text-[8.2px] sm:text-[20px] lg:text-[23px] sm:text-base font-bold capitalize"
                >
                  Watch Online
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[8.2px] sm:text-[20px] lg:text-[23px] sm:text-base font-bold capitalize"
                >
                  Central Prayer
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[8.2px] sm:text-[20px] lg:text-[23px] sm:text-base font-bold capitalize"
                >
                  Wealth Nation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[8.2px] sm:text-[20px] lg:text-[23px] sm:text-base font-bold capitalize"
                >
                  Global
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[8.2px] sm:text-[20px] lg:text-[23px] sm:text-base font-bold capitalize"
                >
                  Operation One Soul
                </a>
              </li>
            </ul>
          </div>

          {/* Installation Column */}
          <div>
            <h3 className="text-[8.2px] font-extralight uppercase mb-1">Fellowship With Us</h3>
            <ul>
              <li>
                <a
                  href="#"
                  className="text-[8.2px] sm:text-[20px] lg:text-[23px] sm:text-base font-bold capitalize"
                >
                  Ilorin
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[8.2px] sm:text-[20px] lg:text-[23px] sm:text-base font-bold capitalize"
                >
                  Abuja
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[8.2px] sm:text-[20px] lg:text-[23px] sm:text-base font-bold capitalize"
                >
                  Lagos
                </a>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="text-[8.2px] font-extralight uppercase mb-1">Resources</h3>
            <ul className="">
              <li>
                <a
                  href="#"
                  className="text-[8.2px] sm:text-[20px] lg:text-[23px] sm:text-base font-bold capitalize"
                >
                  Life Class
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[8.2px] sm:text-[20px] lg:text-[23px] sm:text-base font-bold capitalize"
                >
                  Foundation Training
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[8.2px] sm:text-[20px] lg:text-[23px] sm:text-base font-bold capitalize"
                >
                  Central Trainings
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-10 border-t border-white pt-6">
          {/* Copyright */}
          <div className="text-center text-[7px]
          ">
            &copy; {year} WORD SANCTUARY GLOBAL. All rights reserved.{" "}
            <a href="#" className="underline">
              Terms & Conditions
            </a>{" "}
            |{" "}
            <a href="#" className="underline">
              Privacy Policy
            </a>{" "}
            |{" "}
            <a href="#" className="underline">
              Cookies Policy
            </a>
          </div>

          {/* Social Media Icons */}
          <div className="flex justify-center space-x-4 mt-4">
            <a
              href="https://www.facebook.com/share/1F6g2S2xVG/"
              target="_blank"
              className="hover:opacity-75"
            >
              <Facebook className="w-3 h-3" />
            </a>
            <a
              href="https://www.instagram.com/wordsanctuaryglobal?igsh=bmtndGh2NHV6Z25r"
              target="_blank"
              className="hover:opacity-75"
            >
              <Instagram className="w-3 h-3" />
            </a>
            <a
              href="https://x.com/word_sanctuary?t=fP-aban2CQuGSIKvdSQAEA&s=35"
              target="_blank"
              className="hover:opacity-75"
            >
              <X className="w-3 h-3" />
            </a>
            <a
              href="https://youtube.com/@wordsanctuarytv?si=Qt4yBvPsoTu5iqLd"
              target="_blank"
              className="hover:opacity-75"
            >
              <Youtube className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
