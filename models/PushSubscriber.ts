
import mongoose, { Schema, model, models } from "mongoose";

export interface IPushSubscriber {
    token: string;
    platform: string;
    createdAt: Date;
    updatedAt: Date;
}

const PushSubscriberSchema = new Schema<IPushSubscriber>(
    {
        token: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        platform: {
            type: String,
            required: true,
            enum: ["app", "web"], // We primarily use 'app', but keeping 'web' for flexibility if needed later (though currently ignored)
            default: "app",
        },
    },
    { timestamps: true }
);

const PushSubscriber = models.PushSubscriber || model<IPushSubscriber>("PushSubscriber", PushSubscriberSchema);

export default PushSubscriber;
