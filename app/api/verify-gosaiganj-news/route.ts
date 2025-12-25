import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Content from '@/models/Content';

export async function GET() {
    try {
        await connectToDatabase();

        const slug = "gosaiganj-bypass-100-meter-compensation-dispute-ayodhya";
        const article = await Content.findOne({ slug }).populate('categoryId');

        if (article) {
            return NextResponse.json({
                exists: true,
                title: article.title,
                slug: article.slug,
                category: article.categoryId?.name,
                id: article._id
            });
        } else {
            return NextResponse.json({
                exists: false,
                message: "Article not found"
            });
        }

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
