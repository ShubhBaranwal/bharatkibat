import { Schema, model, models, Types } from "mongoose";
import { BlockSchema } from "./Block";
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

export default models.Content || model("Content", ContentSchema);
