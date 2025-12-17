"use client";

import { memo, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/final logo fom website.png";

interface Category {
  _id: string;
  name: string;
  slug: string;
  uiLabel: string
}

const Header = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  console.log(categories);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        const json = await res.json();
        if (json.success) setCategories(json.data);
        console.log(json.data);

      } catch {
        console.error("Category fetch failed");
      }
    };
    fetchCategories();
  }, []);

  return (
    <header className="border-b border-gray-200">

      {/* ================= MOBILE : LOGO ROW ================= */}
      <div className="md:hidden bg-[var(--white)]">
        <div className="max-w-[1440px] mx-auto px-4  py-4 flex justify-between">
          <Link href="/" aria-label="भारत की बात होम">
            <Image
              src={logo}
              alt="भारत की बात - भरोसेमंद हिंदी न्यूज़ वेबसाइट"
              width={150}
              height={55}
              priority
              className="object-contain"
            />
          </Link>
        </div>
      </div>

      {/* ================= DESKTOP : SINGLE ROW ================= */}
      <div className="hidden md:block bg-[var(--white)]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-4 flex items-center justify-between border">
          {/* Logo */}
          <Link href="/" aria-label="भारत की बात होम">
            <Image
              src={logo}
              alt="भारत की बात - भरोसेमंद हिंदी न्यूज़ वेबसाइट"
              width={160}
              height={60}
              priority
              className="object-contain"
            />
          </Link>

          {/* Categories */}
          <nav aria-label="Primary Navigation" className="">
            <ul className="flex items-center gap-4 text-[15px] font-semibold">
              {categories.map((cat) => (
                <li key={cat._id}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="
                      relative px-3 py-2
                      text-[var(--shade-black)]
                      hover:text-[var(--light-red)]
                      transition
                      after:absolute after:left-0 after:-bottom-1
                      after:h-[2px] after:w-0 after:bg-[var(--light-red)]
                      hover:after:w-full after:transition-all
                      whitespace-nowrap
                    "
                  >
                    {cat.uiLabel}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* ================= MOBILE : CATEGORY BAR ================= */}
      <div className="md:hidden bg-[var(--dark-red)]">
        <nav aria-label="Primary Navigation">
          <ul
            className="
              flex items-center gap-2
              overflow-x-auto scrollbar-hide
              px-3 py-3
              text-[14px] font-semibold
              text-[var(--white)]
              animate-category-scroll
            "
          >
            {categories.map((cat) => (
              <li key={cat._id}>
                <Link
                  href={`/category/${cat.slug}`}
                  className="
                    px-4 py-2 rounded-full
                    bg-transparent
                    hover:text-[var(--light-red)]
                    whitespace-nowrap
                  "
                >
                  {cat.uiLabel}
                </Link>
              </li>
            ))}
          </ul>
        </nav>


      </div>

    </header>
  );
};

export default memo(Header);
