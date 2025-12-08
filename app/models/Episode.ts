import { Schema, models, model, Types } from "mongoose";

/**
 * EPISODE SCHEMA
 * Used for:
 * - Biography Episode 1, Episode 2
 * - Story Chapters
 * - Multi-part reports
 */
const EpisodeSchema = new Schema(
  {
    parentContentId: {
      type: Types.ObjectId,
      ref: "Content", // links episode to biography
      required: true,
    },

    episodeNumber: {
      type: Number,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    coverImage: String,

    contentBlocks: [
      {
        blockId: String,
        type: {
          type: String,
          enum: [
            "heading",
            "paragraph",
            "image",
            "list",
            "quote",
            "timeline",
            "embed",
          ],
          required: true,
        },
        data: Schema.Types.Mixed,
      },
    ],

    tags: {
      type: [String],
      default: [],
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
    },
  },
  { timestamps: true }
);

export default models.Episode || model("Episode", EpisodeSchema);
