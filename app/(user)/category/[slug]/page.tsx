
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import dbConnect from "@/lib/db";
import Content from "@/models/Content";
import Category from "@/models/Category";
import { format } from "date-fns";
import { hi } from "date-fns/locale";

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

// Revalidate every hour
export const revalidate = 3600;

async function getCategoryData(slug: string) {
    await dbConnect();

    // Find category by slug
    const category = await Category.findOne({ slug, isActive: true }).lean();

    if (!category) return null;

    // Find related content
    const news = await Content.find({
        categoryId: category._id,
        published: true
    })
        .sort({ createdAt: -1 })
        .select("title slug coverImage createdAt type meta description")
        .lean();

    return { category, news };
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
    const params = await props.params;
    const data = await getCategoryData(params.slug);

    if (!data) {
        return { title: "Category Not Found" };
    }

    const title = data.category.meta?.title || `${data.category.uiLabel || data.category.name} समाचार | ताज़ा ख़बरें - Bharat Ki Baat`;
    const description = data.category.meta?.description || data.category.description || `Read the latest news and updates from ${data.category.uiLabel || data.category.name}.`;

    return {
        title,
        description,
        keywords: data.category.meta?.keywords,
        openGraph: {
            title,
            description,
            type: 'website',
            images: data.category.meta?.ogImage ? [data.category.meta.ogImage] : [],
        },
        alternates: {
            // canonical: `/category/${data.category.slug}`, // Optional: maintain if desired
        }
    };
}

export default async function CategoryPage(props: PageProps) {
    const params = await props.params;
    const data = await getCategoryData(params.slug);

    if (!data) notFound();

    const { category, news } = data;

    // JSON-LD Structured Data for CollectionPage
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": category.uiLabel || category.name,
        "description": category.description,
        "url": `https://bharatkibat.com/category/${category.slug}`,
        "mainEntity": {
            "@type": "ItemList",
            "itemListElement": news.map((item: any, index: number) => ({
                "@type": "ListItem",
                "position": index + 1,
                "url": `https://bharatkibat.com/${item.slug}`,
                "name": item.title
            }))
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* SEO Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Header Section - Enhanced for Engagement & SEO */}
            <header className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-4 py-10 md:py-16 text-center max-w-4xl">
                    {/* Category Label */}
                    <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-red-600 uppercase bg-red-50 rounded-full">
                        Category
                    </div>

                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 tracking-tight">
                        {category.uiLabel || category.name}
                    </h1>

                    {category.description && (
                        <div className="prose prose-lg mx-auto text-gray-600 text-lg md:text-xl leading-relaxed mt-4">
                            {category.description}
                        </div>
                    )}
                </div>
            </header>

            {/* News Grid Section - Full Width, No Sidebar */}
            <main className="container mx-auto px-4 py-12 md:py-16">
                {news.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                        {news.map((item: any) => (
                            <Link
                                href={`/${item.slug}`}
                                key={item._id}
                                className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100"
                            >
                                {/* Image Container - Aspect Ratio 16:9 */}
                                <div className="relative w-full aspect-video overflow-hidden">
                                    {item.coverImage ? (
                                        <Image
                                            src={item.coverImage}
                                            alt={item.title}
                                            fill
                                            className="object-contain group-hover:scale-105 transition-transform duration-700 ease-out"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center h-full bg-gray-100 text-gray-400">
                                            <span className="text-sm">No Image</span>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                                    {/* Date Badge on Image */}
                                    <div className="absolute bottom-4 left-4 text-white text-xs font-medium px-2 py-1 bg-black/50 backdrop-blur-sm rounded-md">
                                        {format(new Date(item.createdAt), "d MMM, yyyy", { locale: hi })}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 flex flex-col flex-grow">
                                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 leading-snug mb-3 group-hover:text-red-700 transition-colors line-clamp-3">
                                        {item.title}
                                    </h2>

                                    {/* Increased visibility for SEO: line-clamp-4 or 5 depending on length preference */}
                                    <p className="text-gray-600 text-sm md:text-base leading-relaxed line-clamp-4 mb-5 flex-grow">
                                        {item.meta?.description || "इस खबर के बारे में विस्तार से पढ़ें..."}
                                    </p>

                                    <div className="mt-auto pt-4 border-t border-gray-50 flex items-center text-red-600 text-sm font-bold group-hover:gap-2 transition-all">
                                        पूरा पढ़ें
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m0-4H3" />
                                        </svg>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
                        <div className="text-gray-300 text-7xl mb-4">📭</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">कोई खबर उपलब्ध नहीं</h3>
                        <p className="text-gray-500">इस श्रेणी में अभी तक कोई समाचार प्रकाशित नहीं हुआ है।</p>
                    </div>
                )}
            </main>
        </div>
    );
}
