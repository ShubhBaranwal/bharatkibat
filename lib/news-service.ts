import connectToDatabase from "@/lib/db";
import Content from "@/models/Content";

export async function getHeroNews() {
    await connectToDatabase();

    try {
        // Fetch 4 latest published news items with necessary fields
        const newsItems = await Content.find({
            // type: "news",
            published: true,
        })

            .sort({ createdAt: -1 })
            .limit(4)
            .select("title slug coverImage meta createdAt")
            .lean();

        // Transform data for frontend
        const formattedNews = newsItems.map((item: any) => ({
            id: item._id.toString(),
            title: item.title,
            slug: `/${item.slug}`, // Ensure correct path prefix if needed, or rely on stored slug
            image: item.coverImage || "", // Handle missing images
            excerpt: item.meta?.description || item.excerpt || "", // Fallback
            tag: "ताज़ा ख़बर", // Default tag, or fetch from category if needed
        }));

        // Split into featured (1st) and side news (rest)
        const featured = formattedNews[0] || null;
        const sideNews = formattedNews.slice(1);

        return {
            featured,
            sideNews,
        };
    } catch (error) {

        return {
            featured: null,
            sideNews: [],
        };
    }
}
