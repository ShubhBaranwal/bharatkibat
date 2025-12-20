import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import dbConnect from "@/lib/db";

export async function POST(req: NextRequest) {
    try {
        await dbConnect();

        // Security: Check if any user exists
        const userCount = await User.countDocuments();
        if (userCount > 0) {
            return NextResponse.json(
                { error: "Setup already complete. Registration is disabled." },
                { status: 403 }
            );
        }

        const body = await req.json();
        const { fullName, username, email, password } = body;

        // Basic validation
        if (!fullName || !username || !email || !password) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Create Admin User
        const newUser = await User.create({
            fullName,
            username,
            email,
            password,
            role: "admin", // Force admin role for first user
            status: "active",
        });

        return NextResponse.json(
            {
                message: "Admin user registered successfully",
                user: {
                    id: newUser._id,
                    username: newUser.username,
                    email: newUser.email,
                    role: newUser.role,
                },
            },
            { status: 201 }
        );

    } catch (error: unknown) {


        // Handle duplicate key errors (though unlikely for first user, good practice)
        if ((error as any).code === 11000) {
            return NextResponse.json(
                { error: "Username or email already exists" },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
