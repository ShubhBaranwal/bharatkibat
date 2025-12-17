import Image from "next/image";
import Link from "next/link";

/* ================= TYPES ================= */
type NewsItem = {
    id: number | string;
    title: string;
    slug: string;
    image?: any;
    excerpt?: string;
};

interface NewsBlockLayoutProps {
    title?: string;
    featured: NewsItem;
    list: NewsItem[];
    cards: NewsItem[];
}

/* ================= COMPONENT ================= */
export default function NewsBlockLayout({
    title,
    featured,
    list,
    cards,
}: NewsBlockLayoutProps) {
    return (
        <section
            aria-label={title || "News Section"}
            className="bg-[var(--white)] border-b"
        >
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-10">

                {/* ================= SECTION HEADER ================= */}
                {title && (
                    <header className="mb-6">
                        <h2 className="text-lg font-extrabold uppercase tracking-wide text-[var(--dark-red)]">
                            {title}
                        </h2>
                        <div className="mt-1 h-[3px] w-16 bg-[var(--light-red)]" />
                    </header>
                )}

                {/* ================= TOP LAYOUT ================= */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">

                    {/* ===== FEATURED LEFT ===== */}
                    <article className="lg:col-span-2 group">
                        <Link href={`/${featured.slug}`}>
                            {featured.image && (
                                <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-gray-100">
                                    <Image
                                        src={featured.image}
                                        alt={featured.title}
                                        fill
                                        priority
                                        sizes="(max-width: 1024px) 100vw, 66vw"
                                        className="object-cover"
                                    />
                                </div>
                            )}

                            <h3 className="mt-4 text-2xl sm:text-3xl font-extrabold leading-tight text-[var(--dark-blue)] group-hover:text-[var(--light-red)] transition-colors">
                                {featured.title}
                            </h3>

                            {featured.excerpt && (
                                <p className="mt-2 text-sm sm:text-base text-[var(--shade-black)] max-w-3xl">
                                    {featured.excerpt}
                                </p>
                            )}
                        </Link>
                    </article>

                    {/* ===== RIGHT LIST ===== */}
                    <aside aria-label="Top News List">
                        <ul className="space-y-4">
                            {list.map((item) => (
                                <li
                                    key={item.id}
                                    className="border-b border-gray-200 last:border-none pb-3"
                                >
                                    <Link
                                        href={`/${item.slug}`}
                                        className="block text-[15px] font-semibold leading-snug text-[var(--shade-black)] hover:text-[var(--light-red)] transition-colors"
                                    >
                                        {item.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </aside>
                </div>

                {/* ================= BOTTOM CARD GRID ================= */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {cards.map((item) => (
                        <article key={item.id} className="group">
                            <Link href={`/${item.slug}`}>
                                {item.image && (
                                    <div className="relative aspect-[16/9] rounded-md overflow-hidden bg-gray-100">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 25vw"
                                            className="object-cover"
                                        />
                                    </div>
                                )}

                                <h4 className="mt-2 text-[14px] sm:text-[15px] font-semibold leading-snug text-[var(--shade-black)] group-hover:text-[var(--light-red)] transition-colors">
                                    {item.title}
                                </h4>
                            </Link>
                        </article>
                    ))}
                </div>

            </div>
        </section>
    );
}
