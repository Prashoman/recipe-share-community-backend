import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { User } from "../user/user.model";
import { Recipe } from "../recipes/recipe.model";
import { Like } from "./like.model";

const likeCreateIntoDB = async (recipeId: string, userId: string) => {
  const matchUser = await User.findById(userId);
  if (!matchUser) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  const recipeMatch = await Recipe.findById(recipeId);
  if (!recipeMatch) {
    throw new AppError(httpStatus.NOT_FOUND, "Recipe not found");
  }
  const matchLike = await Like.findOne({ recipe: recipeId, user: userId });
  if (matchLike) {
    throw new AppError(httpStatus.BAD_REQUEST, "You already liked this recipe");
  }
  const result = await Like.create({ recipe: recipeId, user: userId });
  await Recipe.findByIdAndUpdate(
    recipeId,
    { $inc: { likes: 1 } },
    { new: true }
  );
  return result;
};

const deleteLikeFromDB = async (recipeId: string, userId: string) => {
    // console.log(recipeId, userId);
    
  const matchLike = await Like.findOne({ recipe: recipeId, user: userId });
//   console.log({ matchLike });
  
  if (!matchLike) {
    throw new AppError(httpStatus.NOT_FOUND, "Like not found");
  }
  await Recipe.findByIdAndUpdate(
    recipeId,
    {
      $inc: { likes: -1 },
    },
    { new: true }
  );
  const result = await Like.findOneAndDelete({
    recipe: recipeId,
    user: userId,
  });
  return result;
};

const getLikesFromDB = async (userId: string) => {
    const likes = await Like.find({ user: userId });
    return likes;
}

export const LikeService = {
  likeCreateIntoDB,
  deleteLikeFromDB,
  getLikesFromDB
};
