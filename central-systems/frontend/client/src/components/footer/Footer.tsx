"use client";

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
    <footer className="bg-primarycol text-white py-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Logo */}
        <div className="mb-8 pl-4">
          <Image
            src="/assets/globalLogo.png"
            alt="Global Logo"
            width={150}
            height={150}
            className="object-contain"
          />
        </div>

        {/* Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Connect Column */}
          <div>
            <h3 className="text-lg uppercase mb-4">Connect</h3>
            <ul>
              <li><a href="#" className="text-sm font-bold uppercase">Become a member</a></li>
              <li><a href="#" className="text-sm font-bold uppercase">Central Prayer</a></li>
              <li><a href="#" className="text-sm font-bold uppercase">First Time Guest</a></li>
            </ul>
          </div>

          {/* Installation Column */}
          <div>
            <h3 className="text-lg uppercase mb-4">Installation</h3>
            <ul>
              <li><a href="#" className="text-sm font-bold uppercase">Ilorin</a></li>
              <li><a href="#" className="text-sm font-bold uppercase">Abuja</a></li>
              <li><a href="#" className="text-sm font-bold uppercase">Lagos</a></li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="text-lg uppercase mb-4">Resources</h3>
            <ul>
              <li><a href="#" className="text-sm font-bold uppercase">Life Class</a></li>
              <li><a href="#" className="text-sm font-bold uppercase">Foundation Training</a></li>
              <li><a href="#" className="text-sm font-bold uppercase">Central Trainings</a></li>
            </ul>
          </div>

          {/* Media Column */}
          <div>
            <h3 className="text-lg uppercase mb-4">Media</h3>
            <ul>
              <li><a href="#" className="text-sm font-bold uppercase">Watch Online</a></li>
              <li><a href="#" className="text-sm font-bold uppercase">Tape</a></li>
              <li><a href="#" className="text-sm font-bold uppercase">Events</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-10 flex flex-col sm:flex-row justify-between items-center border-t border-white pt-6">
          <div className="text-center text-sm">
            &copy; {year} WORD SANCTUARY GLOBAL. All rights reserved. <a href="#" className="underline">Terms & Conditions</a> | <a href="#" className="underline">Privacy Policy</a> | <a href="#" className="underline">Cookies Policy</a>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <a href="#" className="hover:opacity-75">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="hover:opacity-75">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="hover:opacity-75">
              <X className="w-5 h-5" />
            </a>
            <a href="#" className="hover:opacity-75">
              <Youtube className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
