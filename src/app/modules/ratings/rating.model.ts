import { model, Schema } from "mongoose";
import { TRating } from "./rating.interface";

const ratingSchema = new Schema<TRating>(
  {
    recipe: { type: Schema.Types.ObjectId, ref: "Recipe", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export const Rating = model<TRating>("Rating", ratingSchema);
