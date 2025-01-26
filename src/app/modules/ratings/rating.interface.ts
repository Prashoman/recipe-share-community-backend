import { Types } from "mongoose"

export type TRating={
    recipe: Types.ObjectId;
    user: Types.ObjectId;
    rating: number;
} 