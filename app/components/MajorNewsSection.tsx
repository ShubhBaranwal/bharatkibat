"use client";

import Image from "next/image";

import newsImg from "@/public/7329452be6c72af2e5c24d0a0c366e5f1763626636654425_original.jpg";


interface NewsItem {
  id: number;
  title: string;
  description?: string;
  image?: string;
  slug: string;
}

interface CategoryBlock {
  id: number;
  name: string;
  slug: string;
  featured: NewsItem;
  medium: NewsItem[];
  small: NewsItem[];
}

export default function SectionCategories() {
  // 🔥 DYNAMIC CATEGORY ARRAY — Replace Later with API/DB
  const categories: CategoryBlock[] = [
    {
      id: 1,
      name: "देश",
      slug: "desh",
      featured: {
        id: 101,
        title: "भारत की अर्थव्यवस्था में तेज़ी, नए आंकड़े जारी",
        description: "GDP ग्रोथ उम्मीद से ज्यादा, विशेषज्ञों ने बताई बड़ी वजह",
        image: newsImg.src,
        slug: "gdp-growth-latest-update",
      },
      medium: [
        {
          id: 102,
          title: "दिल्ली में प्रदूषण पर सख्त कदम",
          image: newsImg.src,
          slug: "delhi-pollution-control",
        },
        {
          id: 103,
          title: "रेल मंत्रालय की नई योजना लागू",
          image: newsImg.src,
          slug: "railway-new-plan",
        },
      ],
      small: [
        { id: 104, title: "फसल खरीद पर सरकार का बड़ा निर्णय", slug: "govt-fasal-buy" },
        { id: 105, title: "नए रोजगार डेटा जारी", slug: "new-jobs-data" },
        { id: 106, title: "चीन-भारत सीमा पर हलचल", slug: "border-update" },
        { id: 107, title: "देश में इलेक्ट्रिक कारों की बिक्री बढ़ी", slug: "ev-growth" },
        { id: 108, title: "मॉनसून का नया पूर्वानुमान", slug: "monsoon-update" },
      ],
    },

    // More categories (राज्य, राजनीति, शिक्षा)...
  ];

  return (
    <section className="w-full bg-white py-8">
      <div className="max-w-6xl mx-auto px-4">

        {categories.map((cat) => (
          <section
            key={cat.id}
            aria-labelledby={`category-${cat.slug}`}
            className="my-10"
          >
            {/* Category Title */}
            <h2
              id={`category-${cat.slug}`}
              className="text-2xl font-bold mb-5 border-l-8 pl-3 border-[var(--light-red)]"
            >
              {cat.name}
            </h2>

            {/* DESKTOP LAYOUT */}
            <div className="hidden md:grid grid-cols-12 gap-6">

              {/* LEFT — Feature News (40%) */}
              <article className="col-span-5 space-y-3">
                <a href={`/news/${cat.featured.slug}`}>
                  <div className="relative w-full rounded-xl overflow-hidden">
                    <Image
                      src={cat.featured.image!}
                      alt={cat.featured.title}
                      width={800}
                      height={500}
                      className="w-full object-cover hover:scale-[1.03] transition"
                    />
                  </div>
                </a>

                <h3 className="text-xl font-bold">{cat.featured.title}</h3>
                <p className="text-gray-700">{cat.featured.description}</p>

                <a
                  href={`/news/${cat.featured.slug}`}
                  className="text-[var(--dark-red)] font-semibold"
                >
                  पूरा पढ़ें →
                </a>
              </article>

              {/* MIDDLE — Masonry 2 Cards (30%) */}
              <div className="col-span-3 flex flex-col gap-5">
                {cat.medium.map((item) => (
                  <article
                    key={item.id}
                    className="bg-gray-100 rounded-xl overflow-hidden"
                  >
                    <a href={`/news/${item.slug}`}>
                      <Image
                        src={item.image!}
                        alt={item.title}
                        width={600}
                        height={400}
                        className="w-full object-cover"
                      />
                      <h4 className="p-3 font-semibold">{item.title}</h4>
                    </a>
                  </article>
                ))}
              </div>

              {/* RIGHT — Small Headlines (30%) */}
              <div className="col-span-4">
                <ul className="space-y-3">
                  {cat.small.map((item) => (
                    <li key={item.id} className="flex items-start gap-3">
                      <span className="text-[var(--dark-red)] mt-1">•</span>
                      <a
                        href={`/news/${item.slug}`}
                        className="hover:text-[var(--dark-red)]"
                      >
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* MOBILE LAYOUT */}
            <div className="md:hidden space-y-6">

              {/* Feature News */}
              <article>
                <a href={`/news/${cat.featured.slug}`}>
                  <Image
                    src={cat.featured.image!}
                    alt={cat.featured.title}
                    width={600}
                    height={400}
                    className="w-full rounded-xl object-cover"
                  />
                  <h3 className="text-lg font-bold mt-3">{cat.featured.title}</h3>
                  <p className="text-gray-700 mt-1">
                    {cat.featured.description}
                  </p>
                </a>
              </article>

              {/* Medium Slider */}
              <div className="flex gap-4 overflow-x-auto snap-x pb-2">
                {cat.medium.map((item) => (
                  <div
                    key={item.id}
                    className="min-w-[70%] snap-start bg-gray-100 rounded-xl overflow-hidden"
                  >
                    <a href={`/news/${item.slug}`}>
                      <Image
                        src={item.image!}
                        alt={item.title}
                        width={400}
                        height={300}
                        className="w-full object-cover"
                      />
                      <h4 className="p-3 font-semibold">{item.title}</h4>
                    </a>
                  </div>
                ))}
              </div>

              {/* Small Headlines */}
              <ul className="space-y-3">
                {cat.small.map((item) => (
                  <li key={item.id} className="flex items-start gap-2">
                    <span className="text-[var(--dark-red)] mt-1">•</span>
                    <a
                      href={`/news/${item.slug}`}
                      className="hover:text-[var(--dark-red)]"
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
