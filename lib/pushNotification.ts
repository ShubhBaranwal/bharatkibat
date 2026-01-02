
import { Expo, ExpoPushMessage } from "expo-server-sdk";
import PushSubscriber from "@/models/PushSubscriber";
import connectToDatabase from "@/lib/db";

// Initialize Expo SDK
const expo = new Expo({ accessToken: process.env.EXPO_ACCESS_TOKEN });

export async function sendPushNotification(
    title: string,
    body: string,
    data: Record<string, unknown> = {}
) {
    try {
        await connectToDatabase();

        // 1. Fetch all 'app' subscribers
        const subscribers = await PushSubscriber.find({ platform: "app" });
        console.log(`Found ${subscribers.length} 'app' subscribers.`);

        if (!subscribers.length) {
            console.log("No push subscribers found. Ensure the app has registered a token.");
            return;
        }

        // 2. Filter valid tokens and construct messages
        const messages: ExpoPushMessage[] = [];
        const invalidTokens: string[] = [];

        for (const sub of subscribers) {
            if (!Expo.isExpoPushToken(sub.token)) {
                console.error(`Push token ${sub.token} is not a valid Expo push token`);
                invalidTokens.push(sub.token);
                continue;
            }

            messages.push({
                to: sub.token,
                sound: "default",
                title,
                body,
                data,
            });
        }

        // Clean up invalid tokens from DB (optional but recommended)
        if (invalidTokens.length > 0) {
            await PushSubscriber.deleteMany({ token: { $in: invalidTokens } });
        }

        // 3. Batch send notifications (Expo recommends chunking)
        const chunks = expo.chunkPushNotifications(messages);
        const tickets = [];

        for (const chunk of chunks) {
            try {
                const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
                console.log("Chunk sent. Tickets:", ticketChunk);
                tickets.push(...ticketChunk);
            } catch (error) {
                console.error("Error sending push notification chunk:", error);
            }
        }

        // 4. Handle receipts/tickets errors (identify invalid tokens post-send)
        // NOTE: This usually requires a separate process if you want to check receipts later,
        // but we can check the immediate ticket status for blatant errors like DeviceNotRegistered.

        // Simple logs for now
        console.log(`Push notifications sent: ${tickets.length}/${messages.length}`);

    } catch (error) {
        console.error("Critical error in sendPushNotification:", error);
    }
}
