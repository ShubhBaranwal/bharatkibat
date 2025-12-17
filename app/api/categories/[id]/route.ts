import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Category from "@/models/Category";
import { z } from "zod";
import slugify from "slugify";

// Validation Schema (Partial for updates)
const CategoryUpdateSchema = z.object({
    name: z.string().min(2).optional(),
    uiLabel: z.string().min(1).optional(),
    slug: z.string().min(2).optional(),
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

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const { id } = await params;
        const category = await Category.findById(id);

        if (!category) {
            return NextResponse.json({ success: false, error: "Category not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: category }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const { id } = await params;
        const body = await req.json();

        const validData = CategoryUpdateSchema.parse(body);

        let updateData: any = { ...validData };

        // Handle Slug update
        // If slug is explicitly provided, use it. If not, and name is updated, generate from name? 
        // Best approach: If slug provided, use it. If NOT provided but NAME implies a change? 
        // Usually, if user provides slug, we update it. If they don't, we keep old slug unless they explicitly change it.
        // `updateData` will contain `slug` if user sent it.

        let targetSlug = "";
        if (validData.slug) {
            targetSlug = slugify(validData.slug, { lower: true, strict: true });
        } else if (validData.name && !validData.slug) {
            // Optional: If name changes, should slug change? 
            // Often better to ONLY change slug if explicitly requested to avoid breaking URLs.
            // But let's check duplicate if we DO have a target slug.
        }

        if (targetSlug) {
            // Check collision
            const existing = await Category.findOne({ slug: targetSlug, _id: { $ne: id } });
            if (existing) {
                return NextResponse.json({ success: false, error: "Slug already exists" }, { status: 400 });
            }
            updateData.slug = targetSlug;
        }

        const category = await Category.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

        if (!category) {
            return NextResponse.json({ success: false, error: "Category not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: category }, { status: 200 });
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ success: false, error: error.issues }, { status: 400 });
        }
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const { id } = await params;

        const category = await Category.findByIdAndDelete(id);

        if (!category) {
            return NextResponse.json({ success: false, error: "Category not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Category deleted successfully" }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
