import { Schema, Types } from "mongoose";

export const BlockSchema = new Schema(
  {
    blockId: { type: String, default: () => new Types.ObjectId().toString() },
    type: { type: String, enum: ["heading", "paragraph", "image", "quote", "list", "timeline", "embed", "factBox", "shayari", "link"], required: true },
    data: { type: Schema.Types.Mixed, required: true }
  },
  { _id: false }
);


// ✔️ Adsense Safe
// ✔️ Google Discover–Safe
// ✔️ AI Guardrails compliant (no risky language)
// ✔️ Evergreen (2027 के बाद भी valid)
// ✔️ SEO Perfect (H2, meta, keywords)
// ✔️ Readable (short paras, quotes, factBox)
// ✔️ Notion-style blocks (future-proof CMS)