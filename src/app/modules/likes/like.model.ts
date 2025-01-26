import { model, Schema } from "mongoose";
import { TLike } from "./like.interface";

const likeSchema = new Schema<TLike>(
  {
    recipe: { type: Schema.Types.ObjectId, ref: "Recipe", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    isLiked: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export const Like = model<TLike>("Like", likeSchema);
