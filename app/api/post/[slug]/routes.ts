// /**
//  * WHY FETCH BY SLUG?
//  * ------------------
//  * - Better SEO (Google loves slug URLs)
//  * - Cleaner URL structure for users
//  * - More shareable on social media
//  */

// import { NextResponse } from "next/server"
// import db from "@/app/lib/db"
// import Post from "@/app/models/Post"

// export async function GET(req: Request, { params }: any) {
//   await db
//   const post = await Post.findOne({ slug: params.slug })

//   if (!post) return NextResponse.json(
//     { error: "Not found" },
//     { status: 404 }
//   ) // WHY? → Prevent crash if article missing

//   return NextResponse.json(post)
// }
