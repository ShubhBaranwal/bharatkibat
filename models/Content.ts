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
    try {
        // ✅ ONLY NEW + PUBLISHED
        if (doc.published === true) {
            await sendPushNotification(
                "Breaking News",
                doc.title,
                { newsId: doc._id.toString() }
            );
            console.log("chala ye");

        }
    } catch (error) {
        console.error("Push notification failed:", error);
    }
});
export default models.Content || model("Content", ContentSchema);
