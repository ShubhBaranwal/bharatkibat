"use client";

import React, { memo, Suspense } from "react";
import dynamic from "next/dynamic";
import DateTime from "./DateTime";

/* 🟢 Lazy-load social icons (reduces JS by 70%) */
const FaFacebookF = dynamic(() => import("react-icons/fa").then(m => m.FaFacebookF));
const FaInstagram = dynamic(() => import("react-icons/fa").then(m => m.FaInstagram));
const FaYoutube = dynamic(() => import("react-icons/fa").then(m => m.FaYoutube));
const FaLinkedinIn = dynamic(() => import("react-icons/fa").then(m => m.FaLinkedinIn));
const FaPinterestP = dynamic(() => import("react-icons/fa").then(m => m.FaPinterestP));
const FaTelegramPlane = dynamic(() => import("react-icons/fa").then(m => m.FaTelegramPlane));
const AiOutlineTwitter = dynamic(() => import("react-icons/ai").then(m => m.AiOutlineTwitter));

/* 🚀 Static array outside component = no recreation on render */
const socialLinks = [
  { name: "Facebook", icon: FaFacebookF, url: "https://facebook.com" },
  { name: "Instagram", icon: FaInstagram, url: "https://instagram.com" },
  { name: "Twitter", icon: AiOutlineTwitter, url: "https://twitter.com" },
  { name: "YouTube", icon: FaYoutube, url: "https://youtube.com" },
  { name: "LinkedIn", icon: FaLinkedinIn, url: "https://linkedin.com" },
  { name: "Pinterest", icon: FaPinterestP, url: "https://pinterest.com" },
  { name: "Telegram", icon: FaTelegramPlane, url: "https://telegram.org" },
];

const TopSocialMediaHeader = () => {
  return (
    <header
      aria-label="Social Media Follow Bar"
      className="
        bg-(--dark-red) text-(--white)
        flex flex-col sm:flex-row justify-between items-center 
        py-1  sm:px-[5%] mt-4 w-full
      "
    >
      {/* DateTime (SEO + reduces CLS) */}
      <div className="hidden sm:flex">
        <DateTime />
      </div>

      {/* Social Icons */}
      <div className="flex items-center gap-3 mt-2 sm:mt-0">
        <span className="font-medium hidden sm:flex">
          नई खबरों के लिए फॉलो करें:
        </span>

        <nav aria-label="Follow us on social media">
          <ul className="flex items-center gap-3 p-2">
            {socialLinks.map(({ name, icon: Icon, url }) => (
              <li key={name}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  // prefetch="false"
                  className="
                    bg-(--white) text-(--dark-red)
                    rounded-full flex items-center justify-center
                    p-[3vw] sm:p-[0.35rem]
                    hover:scale-110 transition-all
                    text-[1.4rem] sm:text-[1rem]
                    shadow-sm
                  "
                >
                  <Suspense fallback={<span className="w-4 h-4 bg-gray-200 rounded-full" />}>
                    <Icon />
                  </Suspense>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

/* 🚀 memo() prevents re-renders unless props change */
export default memo(TopSocialMediaHeader);
