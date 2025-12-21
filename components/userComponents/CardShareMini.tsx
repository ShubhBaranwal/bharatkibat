"use client";

import { useState } from "react";
import { FiLink, FiShare2 } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

export default function CardShareMini({
    slug,
    title,
}: {
    slug: string;
    title: string;
}) {
    const [open, setOpen] = useState(false);

    const url = `https://bharatkibat.com/${slug}`;

    const toggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        setOpen(!open);
    };

    const copyLink = async (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        await navigator.clipboard.writeText(url);
        setOpen(false);
    };

    const shareWhatsApp = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();

        const shareUrl = `https://wa.me/?text=${encodeURIComponent(
            `${title} - ${url}`
        )}`;

        window.open(shareUrl, "_blank", "noopener,noreferrer");
        setOpen(false);
    };

    return (
        <div className="relative">
            {/* Share Button */}
            <button
                onClick={toggle}
                aria-label="Share article"
                className="bg-black/60 text-white p-2 rounded-full hover:bg-black transition"
            >
                <FiShare2 size={14} />
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-xl border border-gray-100 text-sm z-20">
                    <button
                        onClick={copyLink}
                        className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-50 text-gray-700"
                    >
                        <FiLink />
                        Copy Link
                    </button>

                    <button
                        onClick={shareWhatsApp}
                        className="flex items-center gap-2 w-full px-3 py-2 hover:bg-green-50 text-green-600"
                    >
                        <FaWhatsapp />
                        WhatsApp
                    </button>
                </div>
            )}
        </div>
    );
}
