"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import newsImg from "@/public/7329452be6c72af2e5c24d0a0c366e5f1763626636654425_original.jpg";

interface NewsItem {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  slug: string;
}

export default function HeroTopNews() {
  const [topNews] = useState<NewsItem[]>([
    {
      id: 1,
      title: "दिल्ली ब्लास्ट केस में बड़ा खुलासा, NIA की टीम मौके पर",
      description: "जांच एजेंसियों ने कई संदिग्ध गिरफ्तार किए, सुरक्षा एजेंसी हाई अलर्ट पर।",
      image: newsImg.src,
      category: "ब्रेकिंग",
      slug: "delhi-blast-case-breaking",
    },
    {
      id: 2,
      title: "चंद्रयान की नई सफलता, ISRO ने रचा इतिहास",
      description: "भारत का अंतरिक्ष मिशन नई ऊँचाइयों पर पहुँचा।",
      image: newsImg.src,
      category: "विज्ञान",
      slug: "isro-chandrayaan-mission",
    },
    {
      id: 3,
      title: "मुंबई में भारी बारिश, ट्रैफिक पूरी तरह प्रभावित",
      description: "नगर निगम ने स्कूल बंद किए, यातायात रूट बदले।",
      image: newsImg.src,
      category: "मौसम",
      slug: "mumbai-rain-update",
    },
    {
      id: 4,
      title: "बिहार चुनाव: पहले चरण में रिकॉर्ड मतदान",
      description: "मतदाता turnout 60% से ऊपर, प्रत्याशियों में उत्साह।",
      image: newsImg.src,
      category: "राजनीति",
      slug: "bihar-election-news",
    },
    {
      id: 5,
      title: "क्रिकेट: भारत ने इंग्लैंड को 7 विकेट से हराया",
      description: "शानदार प्रदर्शन, बल्लेबाज़ चमके।",
      image: newsImg.src,
      category: "खेल",
      slug: "india-england-cricket",
    },
  ]);

  // Split once — backend ready
  const main = topNews[0];
  const mediumNews = topNews.slice(1, 3);
  const top10 = topNews.slice(0, 10);

  return (
    <section
      aria-label="Top News Hero Section"
      className="w-full max-w-7xl mx-auto px-4 my-8"
    >
      <div className="
        grid grid-cols-1 
        md:grid-cols-12 
        md:gap-6 
        scroll-snap-x mandatory overflow-x-auto md:overflow-visible
      ">
        {/* MAIN ARTICLE */}
        <article className="
          col-span-12 md:col-span-6 
          bg-white rounded-lg shadow overflow-hidden 
          min-w-full md:min-w-0 scroll-snap-align-start
        ">
          <a href={`/news/${main.slug}`}>
            <img
              src={main.image}
              alt={main.title}
              className="w-full h-[260px] md:h-[320px] object-cover"
            />
          </a>

          <div className="p-4">
            <span className="text-white bg-(--light-red) px-3 py-1 rounded-full text-sm">
              {main.category}
            </span>

            <h1 className="mt-3 text-[1.6rem] md:text-[1.8rem] font-bold text-(--dark-red)">
              {main.title}
            </h1>

            <p className="text-gray-700 mt-2">{main.description}</p>

            <a
              href={`/news/${main.slug}`}
              className="text-(--light-red) font-semibold mt-3 inline-block hover:underline"
            >
              पूरा पढ़ें →
            </a>
          </div>
        </article>

        {/* MIDDLE CARDS */}
        <div className="
          col-span-12 md:col-span-3 
          flex md:flex-col gap-4 mt-4 md:mt-0 
          min-w-full md:min-w-0 scroll-snap-align-start
        ">
          {mediumNews.map((item) => (
            <article
              key={item.id}
              className="bg-white shadow rounded-lg overflow-hidden w-full"
            >
              <a href={`/news/${item.slug}`}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-[180px] md:h-[140px] object-cover"
                />
              </a>

              <div className="p-3">
                <h3 className="font-semibold text-[1rem] text-(--dark-red)">
                  {item.title}
                </h3>
              </div>
            </article>
          ))}
        </div>

        {/* RIGHT TOP 10 NEWS */}
        <aside className="
          col-span-12 md:col-span-3 
          bg-white rounded-lg shadow p-4 mt-4 md:mt-0 
          min-w-full md:min-w-0 scroll-snap-align-start
        ">
          <h2 className="text-[1.2rem] font-bold text-(--dark-red) border-b pb-2">
            आज की 10 बड़ी ख़बरें
          </h2>

          <ul className="mt-3 space-y-3">
            {top10.map((item) => (
              <li key={item.id} className="flex items-start gap-2">
                <span className="text-(--light-red) text-xl">•</span>
                <a
                  href={`/news/${item.slug}`}
                  className="hover:underline text-[0.95rem]"
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
