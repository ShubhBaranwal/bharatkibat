
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import dbConnect from "@/lib/db";
import Content from "@/models/Content";
import Category from "@/models/Category";
import BlockRenderer from "@/components/userComponents/BlockRenderer";
import { format } from "date-fns";
import { hi } from "date-fns/locale";

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

// Revalidate every hour (ISR)
export const revalidate = 3600;

async function getData(slug: string) {
    await dbConnect();
    if (!Category) throw new Error("Category model not loaded");

    const content = await Content.findOne({
        slug,
        published: true,
    })
        .select("title slug coverImage createdAt author contentBlocks meta tags categoryId")
        .populate({
            path: "categoryId",
            select: "name uiLabel slug"
        })
        .lean();

    if (!content) return null;

    // Fetch Related News
    // Strategy: Tags -> Category -> Latest Global
    let related: any[] = [];

    // 1. Tags Match (Prioritize)
    if (content.tags && content.tags.length > 0) {
        related = await Content.find({
            _id: { $ne: content._id },
            published: true,
            tags: { $in: content.tags }
        })
            .sort({ createdAt: -1 })
            .limit(6)
            .select("title slug coverImage createdAt")
            .lean();
    }

    // 2. Category Fallback (Fill up to 6)
    if (related.length < 6 && content.categoryId) {
        const excludeIds = [content._id, ...related.map((r: any) => r._id)];
        const limitNeeded = 6 - related.length;

        const categoryNews = await Content.find({
            _id: { $nin: excludeIds },
            published: true,
            categoryId: content.categoryId
        })
            .sort({ createdAt: -1 })
            .limit(limitNeeded)
            .select("title slug coverImage createdAt")
            .lean();

        related = [...related, ...categoryNews];
    }

    // 3. Global Fallback (Ensure at least 5-6 items)
    if (related.length < 5) {
        const excludeIds = [content._id, ...related.map((r: any) => r._id)];
        const limitNeeded = 6 - related.length;

        const globalNews = await Content.find({
            _id: { $nin: excludeIds },
            published: true
        })
            .sort({ createdAt: -1 })
            .limit(limitNeeded)
            .select("title slug coverImage createdAt")
            .lean();

        related = [...related, ...globalNews];
    }

    return { content, related };
}

/* ================= SEO ================= */

export async function generateMetadata(
    props: PageProps
): Promise<Metadata> {
    const params = await props.params;
    const data = await getData(params.slug);

    if (!data || !data.content) {
        return { title: "Content Not Found" };
    }

    const { content } = data;

    return {
        title: content.meta?.title || content.title,
        description: content.meta?.description,
        keywords: content.meta?.keywords,
        openGraph: {
            title: content.meta?.title || content.title,
            description: content.meta?.description,
            images: content.meta?.ogImage
                ? [content.meta.ogImage]
                : content.coverImage
                    ? [content.coverImage]
                    : [],
        },
    };
}

/* ================= PAGE ================= */

export default async function ContentPage(props: PageProps) {
    const params = await props.params;
    const data = await getData(params.slug);

    if (!data || !data.content) notFound();

    const { content, related } = data;

    return (
        <div className="bg-gray-50 min-h-screen py-4 md:py-8 font-sans">
            <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* ================= LEFT COLUMN: MAIN ARTICLE ================= */}
                    <article className="lg:w-[70%] bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">

                        {/* COVER IMAGE */}
                        <div className="w-full bg-gray-50 flex justify-center p-0 md:p-6 border-b border-gray-50">
                            {content.coverImage && (
                                <div className="relative w-full md:max-w-3xl aspect-video md:aspect-[16/9]">
                                    <Image
                                        src={content.coverImage}
                                        alt={content.title}
                                        fill
                                        priority
                                        className="object-cover md:object-contain"
                                        sizes="(max-width: 768px) 100vw, 800px"
                                        itemProp="image"
                                    />
                                </div>
                            )}
                        </div>

                        {/* CONTENT WRAPPER */}
                        <div className="p-5 md:p-10">

                            {/* Header: Category + Date */}
                            <header className="mb-6 md:mb-8">
                                <div className="flex flex-wrap items-center gap-3 mb-4">
                                    {content.categoryId && (
                                        <Link
                                            href={`/category/${content.categoryId.slug || '#'}`}
                                            className="px-3 py-1 bg-red-600 text-white text-xs font-bold rounded uppercase tracking-wide hover:bg-red-700 transition"
                                        >
                                            {content.categoryId.uiLabel || content.categoryId.name}
                                        </Link>
                                    )}
                                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                                        {format(new Date(content.createdAt), "d MMMM yyyy", { locale: hi })}
                                    </span>
                                </div>

                                <h1 className="text-2xl md:text-4xl lg:text-5xl font-black leading-tight text-gray-900 mb-6 font-serif" itemProp="headline">
                                    {content.title}
                                </h1>

                                {/* Author */}
                                <div className="flex items-center gap-3 py-4 border-y border-gray-100">
                                    <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center font-bold text-red-600">
                                        {content.author?.charAt(0) || "A"}
                                    </div>
                                    <div className="leading-tight">
                                        <p className="text-sm font-bold text-gray-900" itemProp="author">
                                            {content.author || "Bharat Ki Baat Desk"}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Chief Editor
                                        </p>
                                    </div>
                                </div>
                            </header>

                            {/* Main Body */}
                            <div className="prose prose-lg prose-red max-w-none text-gray-800 prose-headings:font-bold prose-a:text-red-600 prose-p:leading-relaxed" itemProp="articleBody">
                                {content.meta?.description && (
                                    <p className="lead font-medium text-gray-900 text-lg md:text-xl border-l-4 border-red-600 pl-4 mb-8 bg-gray-50 py-2 rounded-r-lg">
                                        {content.meta.description}
                                    </p>
                                )}
                                <BlockRenderer blocks={content.contentBlocks} />
                            </div>

                            {/* Tags */}
                            {content.tags?.length > 0 && (
                                <div className="mt-12 pt-8 border-t border-gray-100">
                                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
                                        संबंधित विषय (Tags)
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {content.tags.map((tag: string, index: number) => (
                                            <Link
                                                href={`/category/${content.categoryId?.slug || '#'}`} // Ideally tag search page
                                                key={index}
                                                className="px-4 py-1.5 bg-gray-50 text-gray-600 text-sm font-medium rounded-full border border-gray-200 hover:bg-gray-100 transition"
                                            >
                                                #{tag}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                        </div>
                    </article>

                    {/* ================= RIGHT COLUMN: SIDEBAR (DESKTOP) ================= */}
                    <aside className="hidden lg:block lg:w-[30%] space-y-8">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
                            <h3 className="text-lg font-bold text-gray-900 mb-6 border-b border-gray-100 pb-3 flex items-center gap-2">
                                <span className="w-1 h-6 bg-red-600 rounded-full"></span>
                                संबंधित समाचार
                            </h3>

                            <div className="space-y-6">
                                {related.map((item: any) => (
                                    <Link
                                        key={item._id}
                                        href={`/${item.slug}`}
                                        className="group flex gap-4 items-start"
                                    >
                                        <div className="relative w-24 h-16 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                                            {item.coverImage && (
                                                <Image
                                                    src={item.coverImage}
                                                    alt={item.title}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                    sizes="96px"
                                                />
                                            )}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-sm font-bold text-gray-900 leading-snug line-clamp-3 group-hover:text-red-600 transition-colors">
                                                {item.title}
                                            </h4>
                                            <span className="text-[10px] text-gray-400 mt-1 block uppercase tracking-wide">
                                                {format(new Date(item.createdAt), "d MMM", { locale: hi })}
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>

                {/* ================= MOBILE: RELATED NEWS (HORIZONTAL) ================= */}
                <div className="lg:hidden mt-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 px-1 flex items-center gap-2">
                        <span className="w-1 h-6 bg-red-600 rounded-full"></span>
                        संबंधित और ताज़ा ख़बरें
                    </h3>

                    <div className="flex overflow-x-auto gap-4 pb-6 snap-x no-scrollbar">
                        {related.map((item: any) => (
                            <Link
                                key={item._id}
                                href={`/${item.slug}`}
                                className="min-w-[260px] max-w-[260px] snap-center bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex-shrink-0"
                            >
                                <div className="relative w-full aspect-video bg-gray-100">
                                    {item.coverImage && (
                                        <Image
                                            src={item.coverImage}
                                            alt={item.title}
                                            fill
                                            className="object-cover"
                                            sizes="260px"
                                        />
                                    )}
                                </div>
                                <div className="p-4">
                                    <span className="text-[10px] text-red-600 font-bold uppercase tracking-wide mb-1 block">
                                        Next Story
                                    </span>
                                    <h4 className="text-base font-bold text-gray-900 leading-snug line-clamp-3">
                                        {item.title}
                                    </h4>
                                    <span className="text-[10px] text-gray-400 mt-2 block">
                                        {format(new Date(item.createdAt), "d MMM", { locale: hi })}
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
