import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Content from '@/models/Content';

export async function GET(req: NextRequest) {
    try {
        await dbConnect();
        const slug = "rashtra-prerna-sthal-lucknow-atal-irade-pm-modi";
        const article = await Content.findOne({ slug });

        if (!article) return NextResponse.json({ error: "Article not found" });

        const linkBlocks = article.contentBlocks.filter((b: any) => b.type === 'link');

        // Return stringified JSON to ensure we see everything
        return new NextResponse(JSON.stringify(linkBlocks, null, 2), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
