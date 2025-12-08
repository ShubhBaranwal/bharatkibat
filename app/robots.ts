/**
 * WHY?
 * ----
 * - Search engines use this to learn access rules
 * - Enables Google crawling immediately after launch
 */

export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/" }], // Allow all pages
    sitemap: "https://bharatkibaat.com/sitemap.xml",
  }
}
