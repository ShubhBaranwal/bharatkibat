import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Episode from "@/models/Episode";
import Content from "@/models/Content";
import { z } from "zod";
import slugify from "slugify";

// Schema for Creating Episode
const EpisodeCreateSchema = z.object({
    parentContentId: z.string().min(1, "Parent Content ID is required"),
    episodeNumber: z.coerce.number().min(1, "Episode number must be at least 1"),
    title: z.string().min(2, "Title must be at least 2 characters"),
    slug: z.string().optional(),
    coverImage: z.string().optional(),
    tags: z.array(z.string()).optional(),
    published: z.boolean().optional(),
    meta: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        keywords: z.array(z.string()).optional(),
        ogImage: z.string().optional(),
    }).optional(),
});

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const body = await req.json();

        // 1. Validate Input
        const validData = EpisodeCreateSchema.parse(body);

        // 2. Validate Parent Content Exists
        const parentContent = await Content.findById(validData.parentContentId);
        if (!parentContent) {
            return NextResponse.json({ success: false, error: "Parent Content not found" }, { status: 404 });
        }

        // 3. Generate Slug
        const slug = validData.slug
            ? slugify(validData.slug, { lower: true, strict: true })
            : slugify(`${validData.episodeNumber}-${validData.title}`, { lower: true, strict: true });

        // 4. Check Uniqueness (Episode Number in Parent)
        const existingNumber = await Episode.findOne({
            parentContentId: validData.parentContentId,
            episodeNumber: validData.episodeNumber
        });
        if (existingNumber) {
            return NextResponse.json({ success: false, error: `Episode ${validData.episodeNumber} already exists for this series` }, { status: 400 });
        }

        // Check Slug Uniqueness Global (or scoped? usually global for simplicity in routing)
        const existingSlug = await Episode.findOne({ slug });
        if (existingSlug) {
            return NextResponse.json({ success: false, error: "Slug already exists" }, { status: 400 });
        }

        // 5. Create Episode
        const episode = await Episode.create({
            ...validData,
            slug,
        });

        // 6. Link to Parent Content
        await Content.findByIdAndUpdate(validData.parentContentId, {
            $push: { episodes: episode._id }
        });

        return NextResponse.json({ success: true, data: episode }, { status: 201 });

    } catch (error: unknown) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ success: false, error: error.issues }, { status: 400 });
        }
        const message = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json({ success: false, error: message }, { status: 500 });
    }
}
