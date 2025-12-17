import { Schema, Types } from "mongoose";

export const BlockSchema = new Schema(
  {
    blockId: { type: String, default: () => new Types.ObjectId().toString() },
    type: { type: String, enum: ["heading", "paragraph", "image", "quote", "list", "timeline", "embed", "factBox"], required: true },
    data: { type: Schema.Types.Mixed, required: true }
  },
  { _id: false }
);
