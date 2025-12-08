"use client";

import React, { useState } from "react";
import { HiOutlineMenu } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import logo from "@/public/final logo fom website.png"
import Image from "next/image";

const categories = [
  { name: "Home", url: "/" },
  { name: "देश", url: "/desh" },
  { name: "राजनीति", url: "/rajniti" },
  { name: "शिक्षा", url: "/shiksha" },
  { name: "चुनाव", url: "/chunav" },
  { name: "बायोग्राफी", url: "/biography" },
  { name: "स्पोर्ट्स", url: "/sports" },
];

export default function HeaderNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-(--white) shadow">
      <div className="flex  items-center justify-between px-[8.5%] py-3 relative">

        {/* Left: Logo */}
      
        <Image src={logo} alt="Bharat News Logo" className="w-32 h-auto border "/>
        

        {/* Center: Categories for desktop */}
        <nav aria-label="Main Navigation" className="hidden md:block">
          <ul className="flex items-center gap-6 text-[var(--shade-black)] font-medium">
            {categories.map((cat) => (
              <li key={cat.name}>
                <a
                  href={cat.url}
                  title={cat.name}
                  className="hover:text-[var(--dark-red)] transition-colors"
                >
                  {cat.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right: Login + Hamburger */}
        <div className="flex items-center gap-4">
          {/* <a
            href="/login"
            className="bg-[var(--light-red)] text-white px-4 py-2 rounded hover:bg-[var(--dark-red)] transition"
          >
            Login
          </a> */}

          {/* Hamburger menu for mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <AiOutlineClose className="text-[var(--dark-red)] w-6 h-6" />
              ) : (
                <HiOutlineMenu className="text-[var(--dark-red)] w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <nav
        className={`md:hidden ${menuOpen ? "flex flex-col" : "hidden"} bg-[var(--white)] shadow-md`}
        aria-label="Mobile Navigation"
      >
        {categories.map((cat) => (
          <a
            key={cat.name}
            href={cat.url}
            title={cat.name}
            className="px-4 py-3 border-b border-gray-200 text-[var(--shade-black)] hover:bg-[var(--light-red)] hover:text-white transition"
          >
            {cat.name}
          </a>
        ))}
      </nav>
    </header>
  );
}
