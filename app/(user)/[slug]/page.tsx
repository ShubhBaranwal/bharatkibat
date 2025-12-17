import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import dbConnect from "@/lib/db";
import Content from "@/models/Content";
import Category from "@/models/Category";
import BlockRenderer from "@/components/userComponents/BlockRenderer";

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

// Revalidate every hour (ISR)
export const revalidate = 3600;

async function getContent(slug: string) {
    await dbConnect();
    if (!Category) throw new Error("Category model not loaded");

    const content = await Content.findOne({
        slug,
        published: true,
    })
        .select("title slug coverImage createdAt author contentBlocks meta tags categoryId")
        .populate({
            path: "categoryId",
            select: "name uiLabel"
        })
        .lean();

    return content;
}

/* ================= SEO ================= */

export async function generateMetadata(
    props: PageProps
): Promise<Metadata> {
    const params = await props.params;
    const content = await getContent(params.slug);

    if (!content) {
        return { title: "Content Not Found" };
    }

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
    const content = await getContent(params.slug);

    if (!content) notFound();

    return (
        <article className="bg-white text-gray-800">
            {/* ================= HERO IMAGE ================= */}
            {/* COVER IMAGE — SMALL & NON-CROPPED */}
            <div className="max-w-[300px] mx-auto px-4 pt-6">
                {content.coverImage && (
                    <figure className="flex justify-center">
                        <Image
                            src={content.coverImage}
                            alt={content.title}
                            width={720}
                            height={480}
                            priority
                            className="rounded-lg object-contain"
                            sizes="(max-width: 768px) 100vw, 720px"
                        />
                    </figure>
                )}

                {/* Optional Caption */}
                <figcaption className="text-center text-xs text-gray-500 mt-2">
                    फ़ाइल फोटो
                </figcaption>
            </div>


            {/* ================= TITLE SECTION ================= */}
            <header className="max-w-3xl mx-auto px-5 mt-8">
                {/* Category + Date */}
                <div className="flex flex-wrap items-center gap-4 mb-4">
                    {content.categoryId && (
                        <span className="px-3 py-1 bg-red-600 text-white text-xs font-semibold rounded-md uppercase tracking-wide">
                            {content.categoryId.uiLabel || content.categoryId.name}
                        </span>
                    )}
                    <span className="text-sm text-gray-500">
                        {new Date(content.createdAt).toLocaleDateString("en-IN", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </span>
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-gray-900">
                    {content.title}
                </h1>

                {/* Author */}
                <div className="flex items-center gap-4 mt-6">
                    <div className="w-11 h-11 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-700">
                        {content.author?.charAt(0) || "A"}
                    </div>
                    <div>
                        <p className="font-semibold text-gray-800">
                            {content.author || "Admin"}
                        </p>
                        <p className="text-xs text-gray-500">Author</p>
                    </div>
                </div>
            </header>

            {/* ================= MAIN CONTENT ================= */}
            <main className="max-w-3xl mx-auto px-5 py-12">
                {/* Intro Highlight */}
                <p className="text-lg text-gray-700 leading-relaxed mb-10">
                    {content.meta?.description}
                </p>

                {/* Blocks */}
                <BlockRenderer blocks={content.contentBlocks} />

                {/* ================= TAGS ================= */}
                {content.tags?.length > 0 && (
                    <div className="mt-16 pt-8 border-t">
                        <h4 className="text-lg font-bold text-gray-900 mb-4">
                            संबंधित टैग
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {content.tags.map((tag: string, index: number) => (
                                <span
                                    key={index}
                                    className="px-4 py-1.5 bg-gray-100 text-sm rounded-full hover:bg-red-600 hover:text-white transition"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </main>

            {/* ================= FOOTER AUTHOR BOX ================= */}
            <footer className="bg-gray-50 border-t mt-20">
                <div className="max-w-3xl mx-auto px-5 py-10">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center font-bold text-gray-700">
                            {content.author?.charAt(0) || "A"}
                        </div>
                        <div>
                            <p className="font-semibold text-gray-900">
                                {content.author || "Admin"}
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                                यह लेख जानकारी और शोध पर आधारित है। हमारा उद्देश्य पाठकों तक
                                तथ्यात्मक और विश्वसनीय सामग्री पहुँचाना है।
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </article>
    );
}
