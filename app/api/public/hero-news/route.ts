import { NextResponse } from "next/server";
import { getHeroNews } from "@/lib/news-service";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const data = await getHeroNews();

        return NextResponse.json({
            success: true,
            data,
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Failed to fetch hero news" },
            { status: 500 }
        );
    }
}
