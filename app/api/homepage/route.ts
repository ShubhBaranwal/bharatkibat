import { getHomepageData } from "@/lib/data/homepage";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // Ensure fresh data if not using specific caching strategy

export async function GET() {
    try {
        const homepageData = await getHomepageData();

        return NextResponse.json(homepageData, {
            headers: {
                "Cache-Control": "s-maxage=60, stale-while-revalidate=300",
            },
        });
    } catch (error) {

        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
