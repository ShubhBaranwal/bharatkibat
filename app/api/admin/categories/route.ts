// app/api/admin/categories/route.ts
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/db";
import CategoryModel from "@/app/models/Category";

/**
 * CATEGORY CRUD API (PUBLIC FOR DEVELOPMENT)
 * -------------------------------------------
 * GET     -> list categories (search + pagination)
 * POST    -> create category
 * PATCH   -> update category
 * DELETE  -> delete category
 *
 * TODO (Production):
 *   - Add authentication middleware
 *   - Add rate-limit middleware
 */

/* -------------------------------------------------------------------------- */
/*                               GET: LIST CATS                               */
/* -------------------------------------------------------------------------- */
export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (id) {
      const category = await CategoryModel.findById(id).lean();
      if (!category) {
        return NextResponse.json(
          { ok: false, message: "Category not found" },
          { status: 404 }
        );
      }
      return NextResponse.json({ ok: true, data: category });
    }

    const q = url.searchParams.get("q") || "";
    const page = Math.max(1, Number(url.searchParams.get("page") || 1));
    const limit = Math.min(50, Math.max(5, Number(url.searchParams.get("limit") || 20)));
    const sort = url.searchParams.get("sort") || "priority";

    const skip = (page - 1) * limit;

    const filter: any = {};
    if (q) {
      filter.$or = [
        { name: { $regex: q, $options: "i" } },
        { slug: { $regex: q, $options: "i" } },
      ];
    }

    const projection = { name: 1, slug: 1, description: 1, icon: 1, priority: 1 };

    const [items, total] = await Promise.all([
      CategoryModel.find(filter, projection)
        .sort({ [sort]: -1, name: 1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      CategoryModel.countDocuments(filter),
    ]);

    return NextResponse.json({
      ok: true,
      data: items,
      meta: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, message: err.message || "Server error" },
      { status: 500 }
    );
  }
}

/* -------------------------------------------------------------------------- */
/*                           POST: CREATE CATEGORY                            */
/* -------------------------------------------------------------------------- */
export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const body = await req.json();
    const { name, slug, description = "", icon = "Folder", priority = 0 } = body;

    if (!name || typeof name !== "string") {
      return NextResponse.json(
        { ok: false, message: "Name is required" },
        { status: 400 }
      );
    }

    const finalSlug =
      slug?.trim() ||
      name
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9\-]/g, "");

    // check duplicates
    const exists = await CategoryModel.findOne({
      $or: [{ name: name.trim() }, { slug: finalSlug }],
    }).lean();

    if (exists) {
      return NextResponse.json(
        { ok: false, message: "Category with same name or slug exists" },
        { status: 409 }
      );
    }

    const category = await CategoryModel.create({
      name: name.trim(),
      slug: finalSlug,
      description,
      icon,
      priority,
    });

    return NextResponse.json({ ok: true, data: category }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, message: err.message || "Server error" },
      { status: 500 }
    );
  }
}

/* -------------------------------------------------------------------------- */
/*                           PATCH: UPDATE CATEGORY                           */
/* -------------------------------------------------------------------------- */
export async function PATCH(req: NextRequest) {
  try {
    await dbConnect();

    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    const slugParam = url.searchParams.get("slug");

    if (!id && !slugParam) {
      return NextResponse.json(
        { ok: false, message: "Provide id or slug as query parameter" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const allowed = ["name", "slug", "description", "icon", "priority"];

    const updateData: any = {};
    for (const key of allowed) {
      if (body[key] !== undefined) updateData[key] = body[key];
    }

    if (!Object.keys(updateData).length) {
      return NextResponse.json(
        { ok: false, message: "No updatable fields provided" },
        { status: 400 }
      );
    }

    const filter = id ? { _id: id } : { slug: slugParam };

    const updated = await CategoryModel.findOneAndUpdate(filter, updateData, {
      new: true,
    }).lean();

    if (!updated) {
      return NextResponse.json(
        { ok: false, message: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ ok: true, data: updated });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, message: err.message || "Server error" },
      { status: 500 }
    );
  }
}

/* -------------------------------------------------------------------------- */
/*                           DELETE: REMOVE CATEGORY                          */
/* -------------------------------------------------------------------------- */
export async function DELETE(req: NextRequest) {
  try {
    await dbConnect();

    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    const slugParam = url.searchParams.get("slug");

    if (!id && !slugParam) {
      return NextResponse.json(
        { ok: false, message: "Provide id or slug as query parameter" },
        { status: 400 }
      );
    }

    const filter = id ? { _id: id } : { slug: slugParam };

    const deleted = await CategoryModel.findOneAndDelete(filter).lean();

    if (!deleted) {
      return NextResponse.json(
        { ok: false, message: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ ok: true, message: "Deleted", data: deleted });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, message: err.message || "Server error" },
      { status: 500 }
    );
  }
}
