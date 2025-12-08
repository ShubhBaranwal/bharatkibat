import { Schema, models, model, Types } from "mongoose";

/**
 * BLOCK-BASED CONTENT SYSTEM
 * --------------------------
 * Each section of your article is a "block".
 * Example: paragraph, image, quote, list, timeline etc.
 * Highly flexible for long biographies & news.
 */

const BlockSchema = new Schema(
  {
    blockId: { type: String }, // helps frontend keys

    type: {
      type: String,
      enum: [
        "heading",
        "subheading",
        "paragraph",
        "image",
        "quote",
        "list",
        "timeline",
        "embed",
        "factBox",
      ],
      required: true,
    },

    /**
     * FLEXIBLE DATA HOLDER
     * --------------------
     * Every block stores custom fields here.
     * Example:
     * - paragraph → { text: "..." }
     * - image → { url: "...", caption: "..." }
     * - list → { items: [...] }
     * This allows FULL customization.
     */
    data: {
      type: Schema.Types.Mixed,
      required: true,
    },
  },
  { _id: false }
);

/**
 * MAIN CONTENT SCHEMA
 * -------------------
 * Stores News, Biographies, Articles, Stories.
 */
const ContentSchema = new Schema(
  {
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

    type: {
      type: String,
      enum: ["news", "biography", "story", "episode"],
      default: "news",
    },

    categoryId: {
      type: Types.ObjectId,
      ref: "Category",
      required: true,
    },

    author: {
      type: String,
      default: "Admin",
    },

    coverImage: {
      type: String,
      default: "",
    },

    /**
     * TAGS → Recommended news system
     */
    tags: {
      type: [String],
      default: [],
    },

    /**
     * MAIN CONTENT BLOCKS
     */
    contentBlocks: {
      type: [BlockSchema],
      default: [],
    },

    /**
     * SEO META FIELDS
     */
    meta: {
      title: String,
      description: String,
      keywords: [String],
      ogImage: String,
    },

    /**
     * EPISODE SUPPORT
     * ----------------
     * Example:
     * Biography Part 1, Part 2, etc.
     */
    episodes: [
      {
        episodeId: { type: Types.ObjectId, ref: "Episode" },
      },
    ],

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

export default models.Content || model("Content", ContentSchema);
