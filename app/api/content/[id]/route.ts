import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Content from "@/models/Content";
import { z } from "zod";
import slugify from "slugify";

// Define Block Schema Validation
const BlockInputSchema = z.object({
    blockId: z.string().optional(),
    type: z.enum(["heading", "paragraph", "image", "quote", "list", "timeline", "embed", "factBox"]),
    data: z.any(), // Flexible for now, can be strict per type later
});

const ContentUpdateSchema = z.object({
    title: z.string().min(2).optional(),
    slug: z.string().min(2).optional(),
    type: z.enum(["news", "biography", "story", "episode"]).optional(),
    categoryId: z.string().optional(),
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
    contentBlocks: z.array(BlockInputSchema).optional(), // For full block updates
});

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const { id } = await params;

        const content = await Content.findById(id).populate("categoryId", "name slug");
        if (!content) {
            return NextResponse.json({ success: false, error: "Content not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: content }, { status: 200 });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json({ success: false, error: message }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const { id } = await params;
        const body = await req.json();

        const validData = ContentUpdateSchema.parse(body);

        let updateData: any = { ...validData };

        // Handle Slug update
        if (validData.slug) {
            const targetSlug = slugify(validData.slug, { lower: true, strict: true });
            const existing = await Content.findOne({ slug: targetSlug, _id: { $ne: id } });
            if (existing) {
                return NextResponse.json({ success: false, error: "Slug already exists" }, { status: 400 });
            }
            updateData.slug = targetSlug;
        }

        const content = await Content.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

        if (!content) {
            return NextResponse.json({ success: false, error: "Content not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: content }, { status: 200 });
    } catch (error: unknown) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ success: false, error: error.issues }, { status: 400 });
        }
        const message = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json({ success: false, error: message }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const { id } = await params;

        const content = await Content.findByIdAndDelete(id);

        if (!content) {
            return NextResponse.json({ success: false, error: "Content not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Content deleted successfully" }, { status: 200 });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json({ success: false, error: message }, { status: 500 });
    }
}
