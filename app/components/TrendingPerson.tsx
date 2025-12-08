"use client";

import { useState } from "react";

interface TrendingItem {
  id: number;
  name: string;
  slug: string;
}

export default function TrendingPerson() {
  const [trendingList] = useState<TrendingItem[]>([
    { id: 1, name: "अटल बिहारी वाजपेयी", slug: "atal-bihari-vajpayee" },
    { id: 2, name: "डॉ. भीमराव अंबेडकर", slug: "br-ambedkar" },
    { id: 3, name: "नरेन्द्र मोदी", slug: "narendra-modi" },
    { id: 4, name: "अमित शाह", slug: "amit-shah" },
    { id: 5, name: "इंदिरा गांधी", slug: "indira-gandhi" },
    { id: 6, name: "एपीजे अब्दुल कलाम", slug: "apj-abdul-kalam" },
  ]);

  // Duplicate list (infinite loop effect)
  const loopList = [...trendingList, ...trendingList];

  return (
    <section
      aria-label="Trending Biographies Slider"
      className="w-full bg-gray-100 border-y py-4 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-3">
        {/* <h2 className="text-[1.1rem] font-bold text-(--dark-red) mb-2">
          ⭐ ट्रेंडिंग जीवनी
        </h2> */}

        {/* Slider Container */}
        <div className="relative w-full overflow-hidden">
          <ul className="flex gap-4 animate-scroll whitespace-nowrap">
            {loopList.map((item, index) => (
              <li key={index} className="shrink-0">
                <a
                  href={`/biography/${item.slug}`}
                  className="
                    px-4 py-2 
                    bg-(--light-red) 
                    text-white 
                    font-medium 
                    rounded-full 
                    hover:bg-(--dark-red) 
                    transition 
                    text-[0.9rem] 
                    sm:text-[1rem]
                  "
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Infinite Scroll Animation */}
      <style>
        {`
          @keyframes scroll {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-scroll {
            display: flex;
            animation: scroll 18s linear infinite;
          }
          @media (max-width: 640px) {
            .animate-scroll { animation-duration: 5s; }
          }
        `}
      </style>
    </section>
  );
}
