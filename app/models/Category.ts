import { Schema, models, model } from "mongoose";

/**
 * CATEGORY SCHEMA
 * ----------------
 * Why?
 * - Store categories like News, Biography, Politics, Sports.
 * - Used for filters, menus, homepage sections.
 */
const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    description: {
      type: String,
      default: "",
    },

    icon: {
      type: String, // e.g., lucide-react icon name
      default: "Folder",
    },

    priority: {
      type: Number,
      default: 0, // Higher priority = display first
    },
  },
  { timestamps: true }
);

export default models.Category || model("Category", CategorySchema);
