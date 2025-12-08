// app/api/admin/categories/route.ts
import { NextRequest, NextResponse } from "next/server";
import  dbConnect  from "@/app/lib/db";
import Content from "@/app/models/Content";



export async function POST(req: NextRequest) {

  try {
    await dbConnect();

    const body = await req.json();

    /**
        * WHAT:
        * - Create dynamic block-based content
        * WHY:
        * - Your system supports flexible blocks (image, heading, timeline, etc.)
        * WHEN:
        * - Admin presses “Create Content”
        */


    const newContent = await Content.create({
      title: body.title,
      slug: body.slug,
      type: body.type || "news",
      categoryId: body.categoryId,
      author: body.author || "Admin",
      coverImage: body.coverImage || "",
      tags: body.tags || [],
      contentBlocks: body.contentBlocks || [], // ⭐ blocks inserted later
      meta: body.meta || {},
      published: body.published || false,
    });

    return NextResponse.json({
      ok: true,
      message: "Content created successfully",
      data: newContent,
    });


  } catch (error: any) {

    return NextResponse.json(
      { ok: false, message: error.message || "Failed to create content" },
      { status: 400 }
    );

  }

}


/**
 * BLOCK GET API (Dynamic + Optimized)
 * -----------------------------------
 * Supports:
 * - Pagination
 * - Sorting
 * - Search
 * - Dynamic Filters
 * - Lean optimized queries
 */

/**
 * Safe number parser:
 * Converts query params to numbers.
 * If invalid -> fallback value is used.
 */
const toNumber = (value: any, fallback: number) => {
  const n = Number(value);
  return isNaN(n) ? fallback : n;
};

/**
 * GET → Fetch full content with blocks
 * Supports:
 * - Pagination
 * - Filtering (type, published, category)
 * - Search (title)
 * - Sorting
 */
export async function GET(req: Request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);

    // Pagination
    const page = toNumber(searchParams.get("page"), 1);
    const limit = toNumber(searchParams.get("limit"), 20);
    const skip = (page - 1) * limit;

    // Filters
    const type = searchParams.get("type"); // "news", "biography", "story", "episode"
    const published = searchParams.get("published"); // "true" or "false"
    const categoryId = searchParams.get("categoryId");

    // Search
    const search = searchParams.get("search"); // title search keyword

    // Sorting
    const sortBy = searchParams.get("sortBy") || "createdAt"; // createdAt | updatedAt | title
    const sortOrder = searchParams.get("sortOrder") === "asc" ? 1 : -1;

    // Build Query
    const query: any = {};

    if (type) query.type = type;

    if (categoryId) query.categoryId = categoryId;

    if (published !== null) {
      query.published = published === "true";
    }

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    // Fetch data + total count
    const [data, total] = await Promise.all([
      Content.find(query)
        .sort({ [sortBy]: sortOrder })
        .skip(skip)
        .limit(limit)
        .lean(), // performance optimized

      Content.countDocuments(query),
    ]);

    // Response
    return NextResponse.json({
      success: true,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      filtersUsed: { type, categoryId, published, search },
      data, // full content including contentBlocks[]
    });

  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to fetch content" },
      { status: 500 }
    );
  }
}