import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import dbConnect from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
    try {
        await dbConnect();

        const { identifier, password } = await req.json();

        if (!identifier || !password) {
            return NextResponse.json({ success: false, message: "Missing credentials" }, { status: 400 });
        }

        const user = await User.findOne({
            $or: [
                { email: identifier.toLowerCase() },
                { username: identifier.toLowerCase() }
            ]
        }).select("+password");

        if (!user) {
            return NextResponse.json({ success: false }, { status: 200 });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return NextResponse.json({ success: false }, { status: 200 });
        }

        return NextResponse.json({ success: true }, { status: 200 });

    } catch (error) {

        return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
    }
}
