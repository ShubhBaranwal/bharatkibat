import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
    try {
        await dbConnect();

        const { identifier, password } = await req.json();

        if (!identifier || !password) {
            return NextResponse.json(
                { success: false, message: "Missing credentials" },
                { status: 400 }
            );
        }

        // find by email or username
        const user = await User.findOne({
            $or: [
                { email: identifier.toLowerCase() },
                { username: identifier.toLowerCase() },
            ],
        }).select("+password");

        if (!user) {
            return NextResponse.json(
                { success: false, message: "Invalid credentials" },
                { status: 200 }
            );
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return NextResponse.json(
                { success: false, message: "Invalid credentials" },
                { status: 200 }
            );
        }

        // ---------- CREATE JWT TOKEN ----------
        const token = jwt.sign(
            {
                id: user._id,
                role: user.role,
                email: user.email,
                username: user.username,
            },
            process.env.JWT_SECRET!,
            { expiresIn: "7d" }
        );

        const response = NextResponse.json(
            {
                success: true,
                message: "Login successful",
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    role: user.role,
                },
            },
            { status: 200 }
        );

        // ---------- SET HTTP-ONLY COOKIE ----------
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24 * 7, // 7 days
        });

        return response;

    } catch (error) {

        return NextResponse.json(
            { success: false, error: "Server error" },
            { status: 500 }
        );
    }
}
