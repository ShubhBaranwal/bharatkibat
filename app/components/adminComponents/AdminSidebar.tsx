"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

// React Icons
import {
  MdDashboard,
  MdCategory,
  MdPostAdd,
  MdOutlineSettings,
} from "react-icons/md";
import { FaUsers } from "react-icons/fa";

const menuItems = [
  { name: "Dashboard", icon: <MdDashboard size={20} />, href: "/admin" },
  { name: "Categories", icon: <MdCategory size={20} />, href: "/admin/categories" },
  { name: "Content", icon: <MdPostAdd size={20} />, href: "/admin/content" },
  { name: "Users", icon: <FaUsers size={20} />, href: "/admin/users" },
  { name: "Settings", icon: <MdOutlineSettings size={20} />, href: "/admin/settings" },
];

const AdminSidebar = () => {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-black w-[16%] text-white fixed left-0 top-0">

      {/* Logo */}
      <div className="p-5 text-xl font-bold border-b border-gray-800">
        Admin Panel
      </div>

      {/* Navigation Menu */}
      <ul className="mt-3 relative">
        {menuItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/admin" && pathname.startsWith(item.href));

          return (
            <li key={item.name} className="relative">
              <Link href={item.href}>
                <div
                  className={`flex items-center gap-3 px-5 py-3 cursor-pointer relative
                    hover:bg-gray-800 transition-all
                    ${isActive ? "text-white font-semibold" : "text-gray-300"}
                  `}
                >
                  {/* Sliding Highlight Bar */}
                  {isActive && (
                    <motion.div
                      layoutId="active-sidebar-indicator"
                      className="absolute left-0 top-0 w-full h-full bg-gray-800 z-0"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}

                  {/* Content on top */}
                  <div className="relative z-10 flex items-center gap-3">
                    {item.icon}
                    <span>{item.name}</span>
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AdminSidebar;
