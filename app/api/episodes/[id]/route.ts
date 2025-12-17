import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Episode from "@/models/Episode";
import Content from "@/models/Content";
import { z } from "zod";
import slugify from "slugify";

// Define Block Schema Validation (Reused conceptually)
const BlockInputSchema = z.object({
    blockId: z.string().optional(),
    type: z.enum(["heading", "paragraph", "image", "quote", "list", "timeline", "embed", "factBox"]),
    data: z.any(),
});

const EpisodeUpdateSchema = z.object({
    episodeNumber: z.coerce.number().optional(),
    title: z.string().min(2).optional(),
    slug: z.string().min(2).optional(),
    coverImage: z.string().optional(),
    tags: z.array(z.string()).optional(),
    published: z.boolean().optional(),
    meta: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        keywords: z.array(z.string()).optional(),
        ogImage: z.string().optional(),
    }).optional(),
    contentBlocks: z.array(BlockInputSchema).optional(),
});

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const { id } = await params;

        const episode = await Episode.findById(id).populate("parentContentId", "title slug");
        if (!episode) {
            return NextResponse.json({ success: false, error: "Episode not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: episode }, { status: 200 });
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

        const validData = EpisodeUpdateSchema.parse(body);
        let updateData: any = { ...validData };

        const currentEpisode = await Episode.findById(id);
        if (!currentEpisode) return NextResponse.json({ success: false, error: "Episode not found" }, { status: 404 });

        // Handle Slug uniqueness if changing
        if (validData.slug && validData.slug !== currentEpisode.slug) {
            const targetSlug = slugify(validData.slug, { lower: true, strict: true });
            const existing = await Episode.findOne({ slug: targetSlug, _id: { $ne: id } });
            if (existing) {
                return NextResponse.json({ success: false, error: "Slug already exists" }, { status: 400 });
            }
            updateData.slug = targetSlug;
        }

        // Handle Episode Number collision
        if (validData.episodeNumber && validData.episodeNumber !== currentEpisode.episodeNumber) {
            const existingNum = await Episode.findOne({
                parentContentId: currentEpisode.parentContentId,
                episodeNumber: validData.episodeNumber,
                _id: { $ne: id }
            });
            if (existingNum) {
                return NextResponse.json({ success: false, error: `Episode ${validData.episodeNumber} already exists` }, { status: 400 });
            }
        }

        const episode = await Episode.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

        return NextResponse.json({ success: true, data: episode }, { status: 200 });
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

        const episode = await Episode.findByIdAndDelete(id);
        if (!episode) {
            return NextResponse.json({ success: false, error: "Episode not found" }, { status: 404 });
        }

        // Unlink from Parent
        await Content.findByIdAndUpdate(episode.parentContentId, {
            $pull: { episodes: id }
        });

        return NextResponse.json({ success: true, message: "Episode deleted" }, { status: 200 });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json({ success: false, error: message }, { status: 500 });
    }
}
