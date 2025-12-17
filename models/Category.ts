import { Schema, model, models } from "mongoose";

const CategorySchema = new Schema(
    {
        /** CATEGORY NAME */
        name: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },

        uiLabel: {
            type: String,
            required: true,
            trim: true,
            unique:true
        },

        /** MANUAL SLUG (Admin must enter) */
        slug: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            unique: true,
            index: true,
        },

        /** DESCRIPTION */
        description: {
            type: String,
            default: "",
        },

        /** ICON NAME (lucide-react or custom) */
        icon: {
            type: String,
            default: "Folder",
        },

        /** PRIORITY FOR SORTING */
        priority: {
            type: Number,
            default: 0,
        },

        /** ACTIVE / INACTIVE TO HIDE CATEGORY FROM UI */
        isActive: {
            type: Boolean,
            default: true,
        },

        /** SEO META */
        meta: {
            title: { type: String, default: "" },
            description: { type: String, default: "" },
            keywords: { type: [String], default: [] },
            ogImage: { type: String, default: "" },
        },
    },
    { timestamps: true }
);

export default models.Category || model("Category", CategorySchema);
