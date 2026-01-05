import dbConnect from "@/lib/db";
import Category from "@/models/Category";
import Content from "@/models/Content";

export type HomepageCategoryData = {
    category: {
        name: string;
        slug: string;
    };
    left: any | null;
    middle: any[];
    right: any[];
};

export async function getHomepageData(): Promise<HomepageCategoryData[]> {
    // ⭐ Ensure DB connection before any query
    await dbConnect();

    // ⭐ Fetch only active categories, ordered by priority
    const categories = await Category.find({ isActive: true })
        .sort({ priority: 1 })
        .limit(6)
        .lean();

    const homepageData = await Promise.all(
        categories.map(async (cat) => {

            // ⭐ Fetch enough items for layout:
            // ⭐ 1 (left) + 4 (middle) + 8 (right) = 13
            const items = await Content.find({
                categoryId: cat._id,
                published: true,
            })
                .sort({ createdAt: -1 })
                .limit(13) // ⭐ IMPORTANT: prevents right column from going empty
                .select("title slug coverImage type createdAt author categoryId")
                .lean();

            // ⭐ Defensive serialization (prevents runtime crashes)
            const serializableItems = Array.isArray(items)
                ? items.map((item: any) => ({
                    ...item,
                    id: item._id?.toString() || "", // ⭐ Client-safe ID
                    _id: item._id?.toString() || "",
                    slug: item.slug,
                    image: item.coverImage || null, // ⭐ Image fallback
                    categoryId: item.categoryId?.toString() || "",
                    createdAt: item.createdAt
                        ? item.createdAt.toISOString()
                        : null
                }))
                : [];

            // ⭐ SAFE LAYOUT SPLIT (NO UI BREAK POSSIBLE)
            const left =
                serializableItems.length > 0
                    ? serializableItems[0]
                    : null;

            // ⭐ Middle gets max 4 items (index 1–4)
            const middle =
                serializableItems.length > 1
                    ? serializableItems.slice(1, 5)
                    : [];

            // ⭐ Right gets max 8 items (index 5–12)
            const right =
                serializableItems.length > 5
                    ? serializableItems.slice(5, 13) // ⭐ FIXED: was 20 earlier
                    : [];

            return {
                category: {
                    name: cat.uiLabel || cat.name, // ⭐ Safe fallback
                    slug: cat.slug,
                },
                left,
                middle,
                right,
            };
        })
    );

    return homepageData;
}
