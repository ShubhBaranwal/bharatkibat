import { Schema, model, models, Types } from "mongoose";
import { BlockSchema } from "./Block";

const EpisodeSchema = new Schema(
    {
        parentContentId: {
            type: Types.ObjectId,
            ref: "Content",
            required: true,
            index: true,
        },
        episodeNumber: {
            type: Number,
            required: true,
            index: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
        },
        coverImage: {
            type: String,
            default: "",
        },
        contentBlocks: {
            type: [BlockSchema],
            default: [],
        },
        tags: {
            type: [String],
            default: [],
            index: true,
        },
        meta: {
            title: String,
            description: String,
            keywords: [String],
            ogImage: String,
        },
        published: {
            type: Boolean,
            default: false,
        },
        views: {
            type: Number,
            default: 0,
            index: true,
        },
    },
    { timestamps: true }
);

// Ensure unique episode number per parent content
EpisodeSchema.index({ parentContentId: 1, episodeNumber: 1 }, { unique: true });

export default models.Episode || model("Episode", EpisodeSchema);
