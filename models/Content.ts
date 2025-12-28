import { Schema, model, models, Types } from "mongoose";
import { BlockSchema } from "./Block";
import { sendPushNotification } from "@/lib/pushNotification";
/**
 * NOTION-LIKE BLOCK CONTENT
 * Used for paragraphs, headings, images, quotes, lists etc.
 */


/**
 * MAIN CONTENT SCHEMA
 * Stores news, biography, story + block content
 */
const ContentSchema = new Schema(
    {
        /** TITLE */
        title: {
            type: String,
            required: true,
            trim: true,
        },

        /** SLUG (Admin must manually enter) */
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
        },

        /** CONTENT TYPE */
        type: {
            type: String,
            enum: ["news", "biography", "story", "episode", "5-min-news"],
            default: "news",
            index: true,
        },

        /** CATEGORY RELATION */
        categoryId: {
            type: Types.ObjectId,
            ref: "Category",
            required: true,
            index: true,
        },

        /** AUTHOR NAME */
        author: {
            type: String,
            default: "Admin",
        },

        /** COVER IMAGE URL */
        coverImage: {
            type: String,
            default: "",
        },

        /** TAGS FOR RELATED ARTICLES */
        tags: {
            type: [String],
            default: [],
            index: true,
        },

        /** MAIN RICH CONTENT (BLOCK FORMAT) */
        contentBlocks: {
            type: [BlockSchema],
            default: [],
        },

        /** SEO FIELDS */
        meta: {
            title: String,
            description: String,
            keywords: [String],
            ogImage: String,
        },

        /** EPISODE REFERENCES */
        episodes: [
            {
                type: Types.ObjectId,
                ref: "Episode",
            },
        ],

        /** PUBLISH STATUS */
        published: {
            type: Boolean,
            default: false,
        },

        /** ANALYTICS */
        views: {
            type: Number,
            default: 0,
            index: true,
        },
    },
    { timestamps: true }
);

/**
 * PUSH NOTIFICATION HOOKS
 * Triggered when a new article is created or published
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
ContentSchema.post("save", async function (doc: any) {
    if (doc.type === "news" || doc.type === "5-min-news") {
        // Prepare payload
        const payload = { newsId: doc._id.toString() };
        // Trigger push
        sendPushNotification(
            "Breaking News", // Title
            doc.title,       // Body
            payload
        ).catch(err => console.error("Auto-push failed on save:", err));
    }
});

// For findOneAndUpdate (upserts or updates)
// For findOneAndUpdate (upserts or updates)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
ContentSchema.post("findOneAndUpdate", async function (doc: any) {
    if (!doc) return;

    // Logic: Only send if it's a news item and published
    // NOTE: This might trigger on EVERY update. 
    // To limit to specific conditions (like "just published"), we'd need more logic or 'pre' hooks to check changes.
    // For now, based on requirements "whenever a new news record is inserted", relying on 'upsert' or 'save' is key.
    // However, findOneAndUpdate post hook doesn't easily tell us if it was an insert or update without `rawResult`.
    // A safer approach for "only new" via API/Admin usually results in a 'save' or 'create' call.
    // But seed scripts use findOneAndUpdate with upsert.

    // We will check createdAt vs updatedAt closeness to guess if it's new, OR just let it fire (might be spammy on edits).
    // BETTER STRATEGY: Check if createdAt is very recent (within last 2 seconds)

    const isRecentlyCreated =
        doc.createdAt &&
        doc.updatedAt &&
        Math.abs(doc.createdAt.getTime() - doc.updatedAt.getTime()) < 2000;

    // For seeded content (upsert: true), createdAt == updatedAt usually on first insert.
    if ((doc.type === "news" || doc.type === "5-min-news") && isRecentlyCreated) {
        const payload = { newsId: doc._id.toString() };
        sendPushNotification(
            "Breaking News",
            doc.title,
            payload
        ).catch(err => console.error("Auto-push failed on upsert:", err));
    }
});

export default models.Content || model("Content", ContentSchema);
