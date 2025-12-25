import type { MetadataRoute } from "next";
import connectDB from "@/lib/db";
import Content from "@/models/Content";
import Category from "@/models/Category";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

type SitemapItem = MetadataRoute.Sitemap[number];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = "https://www.bharatkibat.com";

    await connectDB();

    /* =========================
       1️⃣ CONTENT URLS
       ========================= */
    const contents = await Content.find(
        { published: true },
        { slug: 1, updatedAt: 1, type: 1 }
    ).lean();

    const contentUrls: SitemapItem[] = contents.map((item) => {
        let changeFrequency: SitemapItem["changeFrequency"];
        let priority: number;

        if (item.type === "5-min-news") {
            changeFrequency = "daily";
            priority = 0.95;
        } else if (item.type === "news") {
            changeFrequency = "daily";
            priority = 0.9;
        } else if (item.type === "biography") {
            changeFrequency = "weekly";
            priority = 0.8;
        } else {
            changeFrequency = "weekly";
            priority = 0.6;
        }

        return {
            url: `${baseUrl}/${item.slug}`,
            lastModified: item.updatedAt,
            changeFrequency,
            priority,
        };
    });

    /* =========================
       2️⃣ CATEGORY URLS
       ========================= */
    const categories = await Category.find(
        { isActive: true },
        { slug: 1, updatedAt: 1 }
    ).lean();

    const categoryUrls: SitemapItem[] = categories.map((cat) => ({
        url: `${baseUrl}/category/${cat.slug}`,
        lastModified: cat.updatedAt,
        changeFrequency: "daily",
        priority: 0.7,
    }));

    /* =========================
       3️⃣ STATIC URLS
       ========================= */
    const staticUrls: SitemapItem[] = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1,
        },
        { url: `${baseUrl}/about-us`, priority: 0.3 },
        { url: `${baseUrl}/contact-us`, priority: 0.3 },
        { url: `${baseUrl}/privacy-policy`, priority: 0.2 },
        { url: `${baseUrl}/terms-and-conditions`, priority: 0.2 },
        { url: `${baseUrl}/disclaimer`, priority: 0.2 },
    ];

    return [...staticUrls, ...categoryUrls, ...contentUrls];
}
