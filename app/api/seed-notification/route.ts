
import { NextResponse } from "next/server";
import { sendPushNotification } from "@/lib/pushNotification";

export async function GET() {
    try {
        const title = "Test Notification from Seed API";
        const body = "This is a dummy notification to verify the push system.";
        // Using a dummy slug or a known existing one for testing deep linking
        const data = { slug: "test-notification-slug" };

        console.log("Triggering test push notification with data:", { title, body, data });

        // The sendPushNotification function handles fetching subscribers and sending
        await sendPushNotification(title, body, data);

        console.log("sendPushNotification completed (check other logs for details)");

        return NextResponse.json({
            success: true,
            message: "Test notification process initiated. Check server logs for details."
        });
    } catch (error) {
        console.error("Error in seed-notification route:", error);
        return NextResponse.json(
            { success: false, error: "Failed to send test notification" },
            { status: 500 }
        );
    }
}
