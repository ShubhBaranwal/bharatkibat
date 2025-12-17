"use client";

import Link from "next/link";
import {
    FaFacebookF,
    FaInstagram,
    FaWhatsapp,
    FaYoutube,
} from "react-icons/fa";
import { memo } from "react";

const socialLinks = [
    {
        name: "Facebook",
        url: "https://facebook.com/",
        icon: FaFacebookF,
    },
    {
        name: "Instagram",
        url: "https://instagram.com/",
        icon: FaInstagram,
    },
    {
        name: "WhatsApp",
        url: "https://wa.me/91XXXXXXXXXX",
        icon: FaWhatsapp,
    },
    {
        name: "YouTube",
        url: "https://youtube.com/",
        icon: FaYoutube,
    },
];

const Navbar = () => {
    return (
        <nav
            className="bg-[var(--dark-red)] text-white"
            aria-label="Top Navigation"
        >
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 py-3 flex items-center justify-between">
                {/* Brand */}
                <h1 className="text-sm sm:text-base font-semibold tracking-wide">
                    भारत की बात | भरोसेमंद हिंदी न्यूज़
                </h1>

                {/* Social Icons */}
                <ul className="flex items-center gap-4">
                    {socialLinks.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <li key={index}>
                                <Link
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={item.name}
                                    className="hover:text-gray-300 transition"
                                >
                                    <Icon size={18} />
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </nav>
    );
};

export default memo(Navbar);
