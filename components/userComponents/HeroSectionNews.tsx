import Image from "next/image";
import Link from "next/link";
import fallbackImg from "@/public/7329452be6c72af2e5c24d0a0c366e5f1763626636654425_original.png";

interface NewsItem {
    id: string;
    title: string;
    slug: string;
    image?: any;
    excerpt?: string;
    tag?: string;
}

interface HeroSectionNewsProps {
    featured: NewsItem | null;
    sideNews: NewsItem[];
}

const getImageSrc = (img: any) => {
    return img && typeof img === "object" ? img : fallbackImg;
};

export default function HeroSectionNews({
    featured,
    sideNews,
}: HeroSectionNewsProps) {
    if (!featured) return null;

    return (
        <section
            aria-label="मुख्य समाचार"
            className="bg-[var(--white)] border-b"
        >
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* ================= FEATURED ================= */}
                <article className="lg:col-span-2">
                    <Link href={`/${featured.slug}`} className="group block">
                        <div className="relative aspect-[16/9] overflow-hidden rounded-md bg-gray-100">
                            <Image
                                src={getImageSrc(featured.image)}
                                alt={featured.title}
                                fill
                                priority
                                sizes="(max-width: 768px) 100vw, 66vw"
                                className="object-cover"
                            />

                            {/* TAG */}
                            {featured.tag && (
                                <span className="absolute top-3 left-3 bg-[var(--dark-red)] text-white text-xs font-bold px-3 py-1 rounded">
                                    {featured.tag}
                                </span>
                            )}
                        </div>

                        <h1 className="mt-4 text-2xl sm:text-3xl lg:text-[32px] font-extrabold leading-tight text-[var(--dark-blue)] group-hover:text-[var(--light-red)] transition">
                            {featured.title}
                        </h1>

                        <div className="mt-2 h-[3px] w-16 bg-[var(--light-red)]" />

                        {featured.excerpt && (
                            <p className="mt-3 text-sm sm:text-base text-[var(--shade-black)] max-w-3xl">
                                {featured.excerpt}
                            </p>
                        )}
                    </Link>
                </article>

                {/* ================= SIDE NEWS ================= */}
                <aside aria-label="अन्य प्रमुख समाचार" className="space-y-4">
                    <h2 className="text-sm font-bold uppercase tracking-wide text-[var(--dark-red)] border-b pb-2">
                        अन्य प्रमुख समाचार
                    </h2>

                    {sideNews.map((news) => (
                        <article
                            key={news.id}
                            className="flex gap-4 items-start"
                        >
                            <Link
                                href={`/${news.slug}`}
                                className="relative w-24 h-16 flex-shrink-0 overflow-hidden rounded bg-gray-100"
                            >
                                <Image
                                    src={getImageSrc(news.image)}
                                    alt={news.title}
                                    fill
                                    sizes="96px"
                                    loading="lazy"
                                    className="object-cover"
                                />
                            </Link>

                            <Link
                                href={`/${news.slug}`}
                                className="text-[15px] sm:text-base font-semibold leading-snug text-[var(--shade-black)] hover:text-[var(--light-red)] transition"
                            >
                                {news.title}
                            </Link>
                        </article>
                    ))}
                </aside>

            </div>
        </section>
    );
}
