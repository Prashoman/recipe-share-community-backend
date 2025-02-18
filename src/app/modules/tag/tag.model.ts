import { model, Schema } from "mongoose";
import { TTag } from "./tag.interface";

const tagSchema = new Schema<TTag>(
  {
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    tagName: { type: [String], required: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const Tag = model<TTag>("Tag", tagSchema);
