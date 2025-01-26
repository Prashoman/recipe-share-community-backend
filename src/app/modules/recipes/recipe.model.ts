import { model, Schema } from "mongoose";
import { TRecipe } from "./recipe.interface";

const recipeModel = new Schema<TRecipe>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    ingredients: [{ type: String, required: true }],
    cookingTime: { type: Number, required: true },
    likes: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: false },
    isPremium: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    category: { type: String, required: true },
    tags: [{ type: String, required: true }],
    status: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export const Recipe = model<TRecipe>(
  "Recipe",
  recipeModel
);
