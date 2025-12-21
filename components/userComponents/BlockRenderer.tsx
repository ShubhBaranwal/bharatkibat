"use client";

import Image from "next/image";
import React from "react";
import { cn } from "@/lib/utils";

/* ============================
   TYPES (Schema-aligned)
============================ */

type BlockType =
    | "heading"
    | "paragraph"
    | "image"
    | "quote"
    | "list"
    | "timeline"
    | "embed"
    | "factBox";

interface BlockData {
    text?: string;
    level?: number;
    file?: { url: string };
    caption?: string;
    items?: string[];
    style?: "ordered" | "unordered";
    withBackground?: boolean;

    // timeline
    events?: { date?: string; title: string; description?: string }[];

    // embed
    url?: string;

    // factBox
    facts?: (string | { label: string; value: string })[];
}

interface Block {
    blockId?: string;
    type: BlockType;
    data: BlockData;
}

interface BlockRendererProps {
    blocks: Block[];
    className?: string;
}

/* ============================
   BLOCK COMPONENTS
============================ */

const HeadingBlock = React.memo(({ data }: { data: BlockData }) => {
    const Tag = data.level === 1 ? "h1" : data.level === 3 ? "h3" : "h2";

    const classes: Record<string, string> = {
        h1: "text-3xl md:text-4xl font-extrabold mt-10 mb-5 text-gray-900",
        h2: "text-2xl md:text-3xl font-bold mt-10 mb-4 border-l-4 border-red-600 pl-4",
        h3: "text-xl md:text-2xl font-semibold mt-8 mb-3 text-gray-800",
    };

    return <Tag className={classes[Tag]}>{data.text}</Tag>;
});

const ParagraphBlock = React.memo(({ data }: { data: BlockData }) => (
    <p className="text-[1.05rem] md:text-lg leading-relaxed text-gray-800 mb-6">
        {data.text}
    </p>
));

const ImageBlock = React.memo(({ data }: { data: BlockData }) => {
    if (!data.file?.url) return null;

    return (
        <figure className="my-8">
            <div className="relative aspect-video overflow-hidden rounded-xl bg-gray-100">
                <Image
                    src={data.file.url}
                    alt={data.caption || "News image"}
                    fill
                    priority={false}
                    sizes="(max-width:768px) 100vw, 75vw"
                    className="object-cover"
                />
            </div>
            {data.caption && (
                <figcaption className="text-sm text-center text-gray-500 mt-2">
                    {data.caption}
                </figcaption>
            )}
        </figure>
    );
});

const QuoteBlock = React.memo(({ data }: { data: BlockData }) => (
    <blockquote className="my-8 p-6 bg-gray-50 border-l-4 border-red-600 rounded">
        <p className="text-xl italic text-gray-900 leading-relaxed">
            “{data.text}”
        </p>
        {data.caption && (
            <footer className="mt-3 text-sm font-medium text-red-600">
                — {data.caption}
            </footer>
        )}
    </blockquote>
));

const ListBlock = React.memo(({ data }: { data: BlockData }) => {
    const Tag = data.style === "ordered" ? "ol" : "ul";
    return (
        <Tag
            className={cn(
                "my-6 pl-6 space-y-2",
                data.style === "ordered" ? "list-decimal" : "list-disc"
            )}
        >
            {data.items?.map((item, i) => (
                <li key={i} className="text-lg text-gray-800">
                    {item}
                </li>
            ))}
        </Tag>
    );
});

/* ============================
   NEW BLOCKS (Schema-safe)
============================ */

const TimelineBlock = ({ data }: { data: BlockData }) => {
    if (!data.events?.length) return null;

    return (
        <div className="my-10 space-y-6 border-l-2 border-gray-200 pl-6">
            {data.events.map((e, i) => (
                <div key={i}>
                    {e.date && (
                        <div className="text-sm text-red-600 font-medium">{e.date}</div>
                    )}
                    <h4 className="text-lg font-semibold">{e.title}</h4>
                    {e.description && (
                        <p className="text-gray-700 mt-1">{e.description}</p>
                    )}
                </div>
            ))}
        </div>
    );
};

const EmbedBlock = ({ data }: { data: BlockData }) => {
    if (!data.url) return null;

    return (
        <div className="my-8 aspect-video w-full">
            <iframe
                src={data.url}
                loading="lazy"
                className="w-full h-full rounded-lg border"
                allowFullScreen
            />
        </div>
    );
};

const FactBoxBlock = ({ data }: { data: BlockData & { title?: string; facts?: (string | { label: string; value: string })[] } }) => {
    if (!data.facts?.length) return null;

    return (
        <aside className="my-6 md:my-8 bg-yellow-50 border border-yellow-200 rounded-xl p-4 md:p-6 shadow-sm">
            <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-yellow-900 flex items-center gap-2">
                <span>📌</span> {data.title || "तथ्य संक्षेप"}
            </h3>
            <ul className="space-y-3 md:space-y-2">
                {data.facts.map((fact, i) => {
                    let label = "";
                    let value = "";

                    if (typeof fact === "string") {
                        const parts = fact.split(":");
                        label = parts[0]?.trim();
                        value = parts.slice(1).join(":")?.trim();
                    } else {
                        label = fact.label;
                        value = fact.value;
                    }

                    return (
                        <li key={i} className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-4 text-sm md:text-base border-b border-yellow-100 last:border-0 pb-2 last:pb-0 sm:border-0 sm:pb-0">
                            <span className="font-semibold text-gray-800 sm:min-w-[140px]">{label}</span>
                            <span className="text-gray-900 text-left sm:text-right leading-relaxed">{value}</span>
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
};

/* ============================
   MAIN RENDERER
============================ */

export default function BlockRenderer({
    blocks,
    className,
}: BlockRendererProps) {
    if (!blocks?.length) return null;

    return (
        <article
            className={cn(
                "max-w-none text-base prose-headings:scroll-mt-24",
                className
            )}
        >
            {blocks.map((block) => {
                switch (block.type) {
                    case "heading":
                        return <HeadingBlock key={block.blockId} data={block.data} />;
                    case "paragraph":
                        return <ParagraphBlock key={block.blockId} data={block.data} />;
                    case "image":
                        return <ImageBlock key={block.blockId} data={block.data} />;
                    case "quote":
                        return <QuoteBlock key={block.blockId} data={block.data} />;
                    case "list":
                        return <ListBlock key={block.blockId} data={block.data} />;
                    case "timeline":
                        return <TimelineBlock key={block.blockId} data={block.data} />;
                    case "embed":
                        return <EmbedBlock key={block.blockId} data={block.data} />;
                    case "factBox":
                        return <FactBoxBlock key={block.blockId} data={block.data} />;
                    default:
                        return null;
                }
            })}
        </article>
    );
}
