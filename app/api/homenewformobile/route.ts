import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Category from "@/models/Category";
import Content from "@/models/Content";

export const dynamic = "force-dynamic"; // Ensure fresh data

export async function GET() {
    try {
        await dbConnect();

        // 1. Fetch all active categories
        const categories = await Category.find({ isActive: true })
            .sort({ priority: 1 })
            .lean();

        // 2. Fetch ALL news for each category
        const mobileData = await Promise.all(
            categories.map(async (cat) => {
                const items = await Content.find({
                    categoryId: cat._id,
                    published: true,
                })
                    .sort({ createdAt: -1 }) // Newest first
                    .select("title slug coverImage type createdAt author categoryId")
                    .lean();

                // Serialize items
                const serializableItems = Array.isArray(items)
                    ? items.map((item: any) => ({
                        id: item._id?.toString() || "",
                        _id: item._id?.toString() || "",
                        title: item.title,
                        slug: item.slug,
                        type: item.type,
                        author: item.author,
                        categoryId: item.categoryId?.toString() || "",
                        image: item.coverImage || null,
                        createdAt: item.createdAt
                            ? item.createdAt.toISOString()
                            : null,
                    }))
                    : [];

                return {
                    category: {
                        id: cat._id?.toString(),
                        name: cat.uiLabel || cat.name,
                        slug: cat.slug,
                    },
                    contents: serializableItems,
                };
            })
        );

        return NextResponse.json(mobileData, {
            headers: {
                "Cache-Control": "s-maxage=60, stale-while-revalidate=300",
            },
        });
    } catch (error) {
        console.error("Error in mobile homepage API:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
