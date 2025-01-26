import { Types } from "mongoose";

export type TRecipe = {
    user: Types.ObjectId;
    title: string;
    description: string;
    image: string;
    ingredients: string[];
    cookingTime: number;
    likes: number;
    isPublished: boolean;
    isPremium: boolean;
    isDeleted: boolean;
    category: string;
    tags: string[];
    status: boolean;
}