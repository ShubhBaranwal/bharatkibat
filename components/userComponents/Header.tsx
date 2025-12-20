
"use client";

import { memo, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "@/public/final logo fom website.png";

interface Category {
  _id: string;
  name: string;
  slug: string;
  uiLabel: string
}

const Header = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        const json = await res.json();
        if (json.success) setCategories(json.data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };
    fetchCategories();
  }, []);

  const isActive = (slug: string) => {
    if (slug === "") return pathname === "/";
    return pathname.includes(`/category/${slug}`);
  };

  const menuItems = [
    { _id: "home", name: "Home", uiLabel: "होम", slug: "" },
    ...categories
  ];

  return (
    <header className="border-b border-gray-200 sticky top-0 z-50 bg-white">

      {/* ================= MOBILE : LOGO ROW ================= */}
      <div className="md:hidden bg-[var(--white)] shadow-sm">
        <div className="max-w-[1440px] mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/" aria-label="भारत की बात होम">
            <Image
              src={logo}
              alt="भारत की बात - भरोसेमंद हिंदी न्यूज़ वेबसाइट"
              width={140}
              height={50}
              priority
              className="object-contain"
            />
          </Link>
        </div>
      </div>

      {/* ================= DESKTOP : SINGLE ROW ================= */}
      <div className="hidden md:block bg-[var(--white)]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8 py-3 flex items-center justify-between">
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
          <nav aria-label="Primary Navigation">
            <ul className="flex items-center gap-6 text-[16px] font-bold tracking-tight">
              {menuItems.map((cat) => {
                const active = isActive(cat.slug);
                return (
                  <li key={cat._id}>
                    <Link
                      href={cat.slug === "" ? "/" : `/category/${cat.slug}`}
                      className={`
                        relative py-2 transition-colors duration-200
                        ${active ? "text-red-600" : "text-gray-700 hover:text-red-500"}
                      `}
                    >
                      {cat.uiLabel}
                      {/* Active Indicator */}
                      {active && (
                        <span className="absolute left-0 bottom-0 w-full h-[2px] bg-red-600 rounded-full" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>

      {/* ================= MOBILE : CATEGORY BAR (SCROLLABLE) ================= */}
      <div className="md:hidden bg-red-700 shadow-inner">
        <nav aria-label="Primary Navigation">
          <ul
            className="
              flex items-center gap-4 px-4 py-3
              overflow-x-auto no-scrollbar
              whitespace-nowrap
            "
          >
            {menuItems.map((cat) => {
              const active = isActive(cat.slug);
              return (
                <li key={cat._id}>
                  <Link
                    href={cat.slug === "" ? "/" : `/category/${cat.slug}`}
                    className={`
                        text-sm font-bold tracking-wide transition-colors
                        ${active ? "text-white underline underline-offset-4" : "text-red-100 hover:text-white"}
                      `}
                  >
                    {cat.uiLabel}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

    </header>
  );
};

export default memo(Header);
