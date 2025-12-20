import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Category from "@/models/Category";
import { z } from "zod";
import slugify from "slugify";


// Validation Schema
const CategorySchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    uiLabel: z.string().min(1, "UI Label is required"),
    slug: z.string().optional(), // Allow manual slug, fallback to generate
    description: z.string().optional(),
    icon: z.string().optional(),
    priority: z.number().optional(),
    isActive: z.boolean().optional(),
    meta: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        keywords: z.array(z.string()).optional(),
        ogImage: z.string().optional(),
    }).optional(),
});

export async function GET() {
    try {
        await dbConnect();
        const categories = await Category.find().sort({ priority: -1, createdAt: -1 });

        return NextResponse.json({ success: true, data: categories }, { status: 200 });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json({ success: false, error: message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const body = await req.json();

        // Validate
        const validData = CategorySchema.parse(body);


        // Determine Slug
        const slug = validData.slug
            ? slugify(validData.slug, { lower: true, strict: true })
            : slugify(validData.name, { lower: true, strict: true });

        // Check if exists
        const existing = await Category.findOne({ slug });
        if (existing) {
            return NextResponse.json({ success: false, error: "Category/Slug already exists" }, { status: 400 });
        }

        const category = await Category.create({
            ...validData,
            slug,
        });

        return NextResponse.json({ success: true, data: category }, { status: 201 });
    } catch (error: unknown) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ success: false, error: error.issues }, { status: 400 });
        }
        const message = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json({ success: false, error: message }, { status: 500 });
    }
}
