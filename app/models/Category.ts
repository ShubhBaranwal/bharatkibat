import { Schema, models, model } from "mongoose";

/**
 * CATEGORY SCHEMA (Advanced SEO + NEWS Optimized)
 * ===============================================
 * This schema powers all category-based content in a news website.
 *
 * Where it's used:
 * - Main navigation menu
 * - Homepage category sections
 * - Category detail pages (/category/politics)
 * - Filters in the admin panel
 * - SEO metadata for category-level ranking
 *
 * Why important?
 * - Helps Google understand your site structure
 * - Improves internal linking
 * - Organizes content by topics
 */

const CategorySchema = new Schema(
  {
    /**
     * CATEGORY NAME
     * -------------
     * Human-friendly category title.
     * Visible to users on:
     * - Homepage
     * - Menus
     * - Category pages
     */
    name: {
      type: String,
      required: true,
      trim: true,
    },

    /**
     * SLUG (SEO URL)
     * --------------
     * Clean URL-safe identifier for category pages.
     * Example:
     *  - name: "Indian Politics" → slug: "indian-politics"
     *  - name: "Sports" → slug: "sports"
     *
     * Why important?
     * - Required for SEO-friendly URLs
     * - Used to generate `/category/slug`
     * - Indexed for fast lookup
     */
    slug: {
      type: String,
      required: true,
      unique: true, // No two categories can share the same slug
      index: true, // Faster searching in queries
    },

    /**
     * DESCRIPTION
     * -----------
     * A short text about the category.
     * Used for:
     * - SEO description on category pages
     * - Showing extra info in the admin panel
     * - Enhancing Google ranking
     *
     * Example:
     * "Latest political news, updates, and reports."
     */
    description: {
      type: String,
      default: "",
    },

    /**
     * SEO META FIELDS
     * ---------------
     * Helps Google understand category-specific info.
     *
     * meta.title:
     *    - Overwrites the default category title
     *    - Appears in <title> tag
     *
     * meta.description:
     *    - Appears in <meta name="description">
     *
     * meta.keywords:
     *    - Helps Google relate category with topics
     *
     * meta.ogImage:
     *    - Used for social media sharing (Facebook, Twitter, WhatsApp)
     */
    meta: {
      title: { type: String, default: "" },
      description: { type: String, default: "" },
      keywords: { type: [String], default: [] },
      ogImage: { type: String, default: "" },
    },

    /**
     * ICON (FOR UI)
     * -------------
     * Used mainly in the admin dashboard or on the website menu.
     *
     * Example icons:
     * - "Newspaper"   → General news
     * - "Globe"       → World category
     * - "Users"       → Biography category
     *
     * Can be:
     * - lucide-react icons
     * - heroicons names
     * - fontawesome keys
     */
    icon: {
      type: String,
      default: "Folder",
    },

    /**
     * PRIORITY (ORDER)
     * ----------------
     * Controls how categories appear visually.
     *
     * Example:
     * priority: 10 → Show at top
     * priority: 1 → Show at bottom
     *
     * Where used?
     * - Homepage category sorting
     * - Top navigation bar order
     * - Sidebar ordering
     *
     * Index added to make sorting faster.
     */
    priority: {
      type: Number,
      default: 0,
      index: true,
    },

    /**
     * STATUS
     * ------
     * Allows enabling/disabling a category without deleting it.
     *
     * "active"   → visible to users on website
     * "inactive" → hidden but still stored in DB
     *
     * Useful for:
     * - Admin testing
     * - Seasonal categories (e.g., "Elections 2025")
     */
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
      index: true,
    },

    /**
     * createdBy & updatedBy
     * ---------------------
     * Helps in admin auditing.
     *
     * Example:
     * createdBy: "Shubh"
     * updatedBy: "Senior Editor"
     *
     * Useful if:
     * - Multiple admins manage content
     * - You want edit history tracking
     */
    createdBy: { type: String, default: "Admin" },
    updatedBy: { type: String, default: "Admin" },
  },

  /**
   * TIMESTAMPS
   * ----------
   * MongoDB will automatically create:
   * createdAt → When category was added
   * updatedAt → When category was last modified
   *
   * VERY useful for:
   * - Sorting by newest categories
   * - Analytics (how often categories change)
   * - Automated sitemap updates
   */
  { timestamps: true }
);

export default models.Category || model("Category", CategorySchema);
