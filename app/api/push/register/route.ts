
import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import PushSubscriber from "@/models/PushSubscriber";
import { Expo } from "expo-server-sdk";

export async function POST(req: Request) {
    try {
        const { token, platform } = await req.json();

        if (!token) {
            return NextResponse.json({ error: "Token is required" }, { status: 400 });
        }

        // 1. Platform Check
        if (platform !== "app") {
            // Per requirements: Ignore web tokens or anything not 'app'
            return NextResponse.json(
                { message: "Ignored: Only app platform is supported for push." },
                { status: 200 }
            );
        }

        // 2. Validate Expo Token
        if (!Expo.isExpoPushToken(token)) {
            return NextResponse.json({ error: "Invalid Expo Push Token" }, { status: 400 });
        }

        await connectToDatabase();

        // 3. Upsert Token
        await PushSubscriber.findOneAndUpdate(
            { token },
            { token, platform: "app" },
            { upsert: true, new: true }
        );

        return NextResponse.json(
            { message: "Device registered for push notifications successfully." },
            { status: 200 }
        );
    } catch (error) {
        console.error("Push registration error:", error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Internal Server Error" },
            { status: 500 }
        );
    }
}
