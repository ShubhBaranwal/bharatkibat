"use client";

import { useState } from "react";
import { FiLink } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

interface ArticleShareBarProps {
    title: string;
}

export default function ArticleShareBar({ title }: ArticleShareBarProps) {
    const [copied, setCopied] = useState(false);

    const currentUrl =
        typeof window !== "undefined" ? window.location.href : "";

    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(currentUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Copy failed", err);
        }
    };

    const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(
        `${title} - ${currentUrl}`
    )}`;

    return (
        <div className="flex items-center gap-3 mt-6 mb-6">

            {/* Copy Link */}
            <button
                onClick={copyLink}
                className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100 transition"
                aria-label="Copy article link"
            >
                <FiLink className="text-sm" />
                {copied ? "Copied" : "Copy Link"}
            </button>

            {/* WhatsApp Share */}
            <a
                href={whatsappShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 border border-green-500 rounded-full text-green-600 hover:bg-green-50 transition"
                aria-label="Share on WhatsApp"
            >
                <FaWhatsapp className="text-sm" />
                WhatsApp
            </a>

        </div>
    );
}
