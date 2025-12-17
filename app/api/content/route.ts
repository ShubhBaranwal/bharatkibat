import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Content from "@/models/Content";
import { z } from "zod";
import slugify from "slugify";

const ContentCreateSchema = z.object({
    title: z.string().min(2, "Title must be at least 2 characters"),
    slug: z.string().optional(),
    type: z.enum(["news", "biography", "story", "episode"]).default("news"),
    categoryId: z.string().min(1, "Category is required"),
    author: z.string().optional(),
    coverImage: z.string().optional(),
    tags: z.array(z.string()).optional(),
    meta: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        keywords: z.array(z.string()).optional(),
        ogImage: z.string().optional(),
    }).optional(),
    published: z.boolean().optional(),
});

export async function GET(req: NextRequest) {
    try {
        await dbConnect();

        // Optional: Filter by Category or Typed
        const { searchParams } = new URL(req.url);
        const categoryId = searchParams.get("categoryId");
        const type = searchParams.get("type");

        let query: any = {};
        if (categoryId) query.categoryId = categoryId;
        if (type) query.type = type;

        const contents = await Content.find(query)
            .sort({ createdAt: -1 })
            .select("title slug type categoryId published views createdAt coverImage") // Select only needed fields for list
            .populate("categoryId", "name slug"); // Populate Category Name

        return NextResponse.json({ success: true, data: contents }, { status: 200 });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json({ success: false, error: message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const body = await req.json();

        // 1. Zod Validation
        const validData = ContentCreateSchema.parse(body);

        // 2. Slug Handling
        const slug = validData.slug
            ? slugify(validData.slug, { lower: true, strict: true })
            : slugify(validData.title, { lower: true, strict: true });

        // 3. Duplicate Check
        const existing = await Content.findOne({ slug });
        if (existing) {
            return NextResponse.json({ success: false, error: "Slug already exists" }, { status: 400 });
        }

        // 4. Create Content
        const content = await Content.create({
            ...validData,
            slug,
        });

        return NextResponse.json({ success: true, data: content }, { status: 201 });
    } catch (error: unknown) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ success: false, error: error.issues }, { status: 400 });
        }
        const message = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json({ success: false, error: message }, { status: 500 });
    }
}
