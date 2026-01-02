import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Content from "@/models/Content";

export const revalidate = 60;

export async function GET() {
    try {
        await dbConnect();

        const latestNews = await Content.find({ published: true })
            .select('title slug coverImage type author categoryId createdAt')
            .sort({ createdAt: -1 })
            .limit(10)
            .lean();

        return NextResponse.json(latestNews, {
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
