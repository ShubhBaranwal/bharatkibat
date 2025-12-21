"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const FALLBACK_IMAGE =
    "/7329452be6c72af2e5c24d0a0c366e5f1763626636654425_original.png";

/* ===================== TYPES ===================== */

type NewsItem = {
    id: number | string;
    title: string;
    slug: string;
    image?: string | null;
};

interface BigNewsGridProps {
    title?: string;
    left: NewsItem;
    middle: NewsItem[];
    right: NewsItem[];
}

/* ===================== HELPERS ===================== */

const isValidImage = (img?: string | null): img is string => {
    return (
        typeof img === "string" &&
        img.trim() !== "" &&
        /\.(jpg|jpeg|png|webp|gif)$/i.test(img)
    );
};

/* ===================== IMAGE COMPONENT ===================== */

const NewsImage = ({
    src,
    alt,
    className,
    sizes,
    priority,
}: {
    src?: string;
    alt: string;
    className?: string;
    sizes?: string;
    priority?: boolean;
}) => {
    const [imgSrc, setImgSrc] = useState(src || FALLBACK_IMAGE);

    return (
        <Image
            src={imgSrc}
            alt={alt || "News Image"}
            fill
            sizes={sizes}
            priority={priority && imgSrc !== FALLBACK_IMAGE}
            className={`object-contain ${className ?? ""}`}
            onError={() => setImgSrc(FALLBACK_IMAGE)}
        />
    );
};

/* ===================== MAIN COMPONENT ===================== */

export default function BigNewsGrid({
    title,
    left,
    middle,
    right,
}: BigNewsGridProps) {
    return (
        <section
            aria-label={title || "News Section"}
            className="bg-[var(--white)]"
        >
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-8">

                {/* ================= SECTION HEADING ================= */}
                {title && (
                    <header className="mb-6">
                        <h2 className="text-lg font-extrabold tracking-wide text-[var(--dark-red)] uppercase">
                            {title}
                        </h2>
                        <div className="mt-1 h-[2px] w-12 bg-[var(--light-red)]" />
                    </header>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* ================= LEFT : PRIMARY STORY ================= */}
                    <article className="group lg:pr-4">
                        <Link href={`/${left.slug}`} className="block">
                            <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-gray-100">
                                <NewsImage
                                    src={
                                        isValidImage(left.image)
                                            ? left.image
                                            : FALLBACK_IMAGE
                                    }
                                    alt={left.title || "News Image"}
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 66vw, 33vw"
                                    priority
                                    className="transition-opacity duration-300 group-hover:opacity-90"
                                />
                            </div>

                            <h3 className="mt-4 text-xl sm:text-2xl lg:text-[26px] font-extrabold leading-snug text-[var(--dark-blue)] group-hover:text-[var(--light-red)] transition-colors">
                                {left.title}
                            </h3>
                        </Link>
                    </article>

                    {/* ================= MIDDLE : STORY CARDS ================= */}
                    <div className="space-y-5 lg:px-4 lg:border-x border-gray-200">
                        {middle.map((item) => (
                            <article key={item.id} className="flex gap-4">
                                <Link
                                    href={`/${item.slug}`}
                                    className="relative w-28 h-20 flex-shrink-0 overflow-hidden rounded-md bg-gray-100"
                                >
                                    <NewsImage
                                        src={
                                            isValidImage(item.image)
                                                ? item.image
                                                : FALLBACK_IMAGE
                                        }
                                        alt={item.title || "News Image"}
                                        sizes="112px"
                                        className="transition-opacity duration-300 hover:opacity-90"
                                    />
                                </Link>

                                <Link
                                    href={`/${item.slug}`}
                                    className="text-[15px] sm:text-base font-semibold leading-snug text-[var(--shade-black)] hover:text-[var(--light-red)] transition-colors"
                                >
                                    {item.title}
                                </Link>
                            </article>
                        ))}
                    </div>

                    {/* ================= RIGHT : QUICK READ LIST ================= */}
                    <aside aria-label="More News">
                        <ul className="space-y-3">
                            {right.map((item) => (
                                <li
                                    key={item.id}
                                    className="border-b border-gray-200 last:border-none pb-3"
                                >
                                    <Link
                                        href={`/${item.slug}`}
                                        className="block text-[14px] sm:text-[15px] font-medium leading-snug text-[var(--shade-black)] hover:text-[var(--light-red)] transition-colors"
                                    >
                                        {item.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </aside>

                </div>
            </div>
        </section>
    );
}
