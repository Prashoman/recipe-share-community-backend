import { model, Schema } from "mongoose";
import { TComment } from "./commet.interface";

const commentSchema = new Schema<TComment>(
  {
    recipe: { type: Schema.Types.ObjectId, ref: "Recipe", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Comment = model<TComment>("Comment", commentSchema);
