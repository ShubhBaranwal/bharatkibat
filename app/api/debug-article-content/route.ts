import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Content from '@/models/Content';

export async function GET(req: NextRequest) {
    try {
        await dbConnect();
        const slug = "rashtra-prerna-sthal-lucknow-atal-irade-pm-modi";
        const article = await Content.findOne({ slug });

        if (!article) return NextResponse.json({ error: "Article not found" });

        // Filter to see the link blocks specifically
        const linkBlocks = article.contentBlocks.filter((b: any) => b.type === 'link');
        const allBlocks = article.contentBlocks.map((b: any) => ({ type: b.type, data: b.data }));

        return NextResponse.json({
            totalBlocks: article.contentBlocks.length,
            linkBlocksFound: linkBlocks.length,
            linkBlocks: linkBlocks,
            allBlocksPreview: allBlocks
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
