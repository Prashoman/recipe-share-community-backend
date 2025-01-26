import { Types } from "mongoose"

export type TLike={
    recipe: Types.ObjectId;
    user: Types.ObjectId;
    isLiked: boolean;
}