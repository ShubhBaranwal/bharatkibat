"use client";

import Image from "next/image";
import React from "react";
import { cn } from "@/lib/utils"; // Assuming you have a utility for class merging, if not I'll use template literals

// Types based on your Block Schema
type BlockType = "heading" | "paragraph" | "image" | "quote" | "list" | "timeline" | "embed" | "factBox";

interface BlockData {
    text?: string;
    level?: number;
    file?: { url: string };
    caption?: string;
    items?: string[];
    style?: "ordered" | "unordered";
    withBackground?: boolean;
    // Add other specific data fields as needed
}

interface Block {
    _id?: string;
    type: BlockType;
    data: BlockData;
}

interface BlockRendererProps {
    blocks: Block[];
    className?: string;
}

const HeadingBlock = ({ data }: { data: BlockData }) => {
    const Tag = data.level === 1 ? "h1" : data.level === 3 ? "h3" : "h2";
    // Tailwind classes for premium typography
    const classes = {
        h1: "text-3xl md:text-4xl font-extrabold text-[var(--dark-blue)] mt-8 mb-4 leading-tight",
        h2: "text-2xl md:text-3xl font-bold text-[var(--dark-blue)] mt-8 mb-4 leading-snug border-l-4 border-[var(--light-red)] pl-4",
        h3: "text-xl md:text-2xl font-semibold text-[var(--shade-black)] mt-6 mb-3",
    };

    return <Tag className={classes[Tag]}>{data.text}</Tag>;
};

const ParagraphBlock = ({ data }: { data: BlockData }) => {
    return (
        <p className="text-lg md:text-[1.15rem] leading-relaxed text-gray-800 mb-6 font-serif">
            {data.text}
        </p>
    );
};

const ImageBlock = ({ data }: { data: BlockData }) => {
    if (!data.file?.url) return null;

    return (
        <figure className="my-8 relative overflow-hidden rounded-xl shadow-sm">
            <div className="relative aspect-video w-full bg-gray-100">
                <Image
                    src={data.file.url}
                    alt={data.caption || "Content image"}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 60vw"
                />
            </div>
            {data.caption && (
                <figcaption className="mt-3 text-center text-sm text-gray-500 italic">
                    {data.caption}
                </figcaption>
            )}
        </figure>
    );
};

const QuoteBlock = ({ data }: { data: BlockData }) => {
    return (
        <blockquote className="my-8 p-6 md:p-8 bg-blue-50/50 border-l-4 border-[var(--light-red)] rounded-r-xl">
            <p className="text-xl md:text-2xl font-serif text-[var(--dark-blue)] italic leading-relaxed">
                "{data.text}"
            </p>
            {data.caption && (
                <footer className="mt-4 text-base font-medium text-[var(--light-red)]">
                    — {data.caption}
                </footer>
            )}
        </blockquote>
    );
};

const ListBlock = ({ data }: { data: BlockData }) => {
    const Tag = data.style === "ordered" ? "ol" : "ul";
    return (
        <Tag className={`my-6 pl-6 space-y-3 ${data.style === "ordered" ? "list-decimal" : "list-disc"} marker:text-[var(--light-red)]`}>
            {data.items?.map((item, index) => (
                <li key={index} className="text-lg text-gray-800 leading-relaxed pl-2">
                    {item}
                </li>
            ))}
        </Tag>
    );
};

export default function BlockRenderer({ blocks, className }: BlockRendererProps) {
    if (!blocks || blocks.length === 0) return null;

    return (
        <div className={cn("prose prose-lg max-w-none prose-headings:font-bold prose-a:text-[var(--light-red)]", className)}>
            {blocks.map((block, index) => {
                switch (block.type) {
                    case "heading":
                        return <HeadingBlock key={index} data={block.data} />;
                    case "paragraph":
                        return <ParagraphBlock key={index} data={block.data} />;
                    case "image":
                        return <ImageBlock key={index} data={block.data} />;
                    case "quote":
                        return <QuoteBlock key={index} data={block.data} />;
                    case "list":
                        return <ListBlock key={index} data={block.data} />;
                    default:
                        // Fallback for unimplemented blocks
                        console.warn(`Unsupported block type: ${block.type}`);
                        return null;
                }
            })}
        </div>
    );
}
