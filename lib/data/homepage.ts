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
    await dbConnect();

    const categories = await Category.find({
        isActive: true,
    })
        .sort({ priority: 1 })
        .limit(5)
        .lean();

    const homepageData = await Promise.all(
        categories.map(async (cat) => {
            const items = await Content.find({
                categoryId: cat._id,
                published: true,
            })
                .sort({ createdAt: -1 })
                .limit(6)
                .select("title slug coverImage type createdAt author categoryId")
                .lean();

            // Serialization for client components if needed (Next.js passes JSON to client components)
            // Mongoose lean() returns POJO.
            // We map items to ensure proper serialization and fallback handling.
            const serializableItems = items.map((item: any) => ({
                ...item,
                id: item._id ? item._id.toString() : "",
                image: item.coverImage || null,
                slug: item.slug,
                _id: item._id ? item._id.toString() : "",
                categoryId: item.categoryId ? item.categoryId.toString() : "",
                createdAt: item.createdAt ? item.createdAt.toISOString() : null,
                updatedAt: item.updatedAt ? item.updatedAt.toISOString() : null,
            }));

            return {
                category: {
                    name: cat.uiLabel || cat.name, // Fallback to name if uiLabel is missing, though schema says required.
                    slug: cat.slug,
                },
                left: serializableItems[0] || null,
                middle: serializableItems.slice(1, 3),
                right: serializableItems.slice(3, 6),
            };
        })
    );

    return homepageData;
}
