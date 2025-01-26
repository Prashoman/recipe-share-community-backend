
import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { User } from "../user/user.model";
import { Recipe } from "../recipes/recipe.model";
import { Rating } from "./rating.model";
import { TRating } from "./rating.interface";


const ratingCreateIntoDB = async (ratingInfo: Partial<TRating> , userId: string) => {
  const recipeId = ratingInfo.recipe;
    const matchUser = await User.findById(userId);
    if (!matchUser) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }
    const recipeMatch = await Recipe.findById(recipeId);
    if (!recipeMatch) {
        throw new AppError(httpStatus.NOT_FOUND, "Recipe not found");
    }
    const matchRating = await Rating.findOne({ recipe: recipeId, user: userId });
    if (matchRating) {
        throw new AppError(httpStatus.BAD_REQUEST, "You already rated this recipe");
    }
    const result = await Rating.create({
        ...ratingInfo,
        user: userId,
    });
    return result;
};

const getMyRatingFromDB = async (userId: string) => {
    const matchUser = await User.findById(userId);
    if (!matchUser) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }
    const ratings = await Rating.find({ user: userId });
    return ratings;
}

export const RatingService = {
  ratingCreateIntoDB,
  getMyRatingFromDB
};
