
// import { NextResponse } from "next/server"
// import db from "@/app/lib/db"
// import Post from "@/app/models/Post"

// /**
//  * WHY POST ROUTE?
//  * ---------------
//  * - Admin can create posts from dashboard
//  * - Central API ensures clean backend logic
//  */

// export async function POST(req: Request) {
//   await db // WHY? → Ensure DB connected once

//   const body = await req.json() // WHY? → Receive post data

//   const post = await Post.create(body) // WHY? → Add new article
//   return NextResponse.json({ success: true, post })
// }

// /**
//  * WHY GET ROUTE?
//  * --------------
//  * - Homepage needs Latest, Trending etc.
//  * - This automatically feeds frontend sections
//  */

// export async function GET() {
//   await db
//   const posts = await Post.find().sort({ createdAt: -1 }) // WHY sort? → Latest first
//   return NextResponse.json(posts)
// }
