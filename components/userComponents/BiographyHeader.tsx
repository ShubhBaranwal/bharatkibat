"use client";

import Link from "next/link";
import { memo } from "react";

const biographyList = [
    { id: 1, title: "महात्मा गांधी", slug: "mahatma-gandhi" },
    { id: 2, title: "डॉ. भीमराव अंबेडकर", slug: "bhimrao-ambedkar" },
    { id: 3, title: "सुभाष चंद्र बोस", slug: "subhash-chandra-bose" },
    { id: 4, title: "भगत सिंह", slug: "bhagat-singh" },
    { id: 5, title: "सरदार पटेल", slug: "sardar-patel" },
    { id: 6, title: "ए.पी.जे. अब्दुल कलाम", slug: "apj-abdul-kalam" },
];

const BiographyHeader = () => {
    return (
        <section
            aria-label="Biography Navigation"
            className="
        border-b
        bg-[var(--white)] md:bg-[var(--dark-red)]
      "
        >
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-3">
                <ul
                    className="
            flex items-center gap-2
            overflow-x-auto scrollbar-hide
            text-sm font-semibold
            text-[var(--shade-black)] md:text-white
             
          "
                >
                    {biographyList.map((item) => (
                        <li key={item.id}>
                            <Link
                                href={`/biography/${item.slug}`}
                                className="
                  px-4 py-2 rounded-full
                  whitespace-nowrap
                  transition
                  bg-gray-100 hover:bg-gray-200
                  md:bg-white/10 md:hover:bg-[var(--light-red)]
                "
                            >
                                {item.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default memo(BiographyHeader);
