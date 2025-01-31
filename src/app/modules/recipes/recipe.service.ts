import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { User } from "../user/user.model";
import { Recipe } from "./recipe.model";
import mongoose from "mongoose";

const createRecipeIntoDB = async (recipe: any, user: any) => {
  const matchUser = await User.findById(user.id, { isDeleted: false });
  if (!matchUser) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  recipe.user = user.id;
  const result = await Recipe.create(recipe);
  return result;
};

const getAllRecipesAdminFromDB = async () => {
  const recipes = await Recipe.find({ isDeleted: false }).populate(
    "user",
    "userName email profileImage _id"
  );
  return recipes;
};

const getAllRecipesUserFromDB = async (user: any) => {
  const recipes = await Recipe.find({
    user: user.id,
    isDeleted: false,
  }).populate("user");
  return recipes;
};

const updatePublicRecipeIntoDB = async (recipeId: any) => {
  // console.log({recipeId});

  const recipe = await Recipe.findById(recipeId, { isDeleted: false });
  if (!recipe) {
    throw new AppError(httpStatus.NOT_FOUND, "Recipe not found");
  }
  const recipeStatus = await Recipe.findByIdAndUpdate(
    recipeId,
    { isPublished: !recipe.isPublished },
    { new: true }
  );
  return recipeStatus;
};

const deleteRecipeIntoDB = async (recipeId: any) => {
  const recipe = await Recipe.findById(recipeId, { isDeleted: false });
  if (!recipe) {
    throw new AppError(httpStatus.NOT_FOUND, "Recipe not found");
  }
  const recipeStatus = await Recipe.findByIdAndUpdate(
    recipeId,
    { isDeleted: true },
    { new: true }
  );
  return recipeStatus;
};

const updateRecipeIntoDB = async (recipeId: any, recipe: any, user: any) => {
  const recipeInfo = await Recipe.findById(recipeId, { isDeleted: false });
  if (!recipeInfo) {
    throw new AppError(httpStatus.NOT_FOUND, "Recipe not found");
  }
  recipe.user = user.id;
  const result = await Recipe.findByIdAndUpdate(recipeId, recipe, {
    new: true,
  });
  return result;
};

const getAllPublicRecipesFromDB = async () => {
  try {
    const recipesWithRatings = await Recipe.aggregate([
      {
        $match: {
          isDeleted: false,
          isPublished: true,
        },
      },
      {
        $lookup: {
          from: "ratings", // Reference the ratings collection
          localField: "_id", // Match the recipe _id in recipes
          foreignField: "recipe", // Match the recipe field in ratings
          as: "ratings", // Include all ratings for the recipe
        },
      },
      {
        $addFields: {
          averageRating: { $avg: "$ratings.rating" },
        },
      },
      {
        $project: {
          ratings: 0,
        },
      },
      {
        $sort: {
          likes: -1,
        },
      },
    ]);

    return recipesWithRatings;
  } catch (error) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Internal Server Error"
    );
  }
};

const getSingleRecipeByIdFromDB = async (recipeId: any) => {
  try {
    const getSingleRecipeWithRatings = await Recipe.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(recipeId),
          isDeleted: false,
        },
      },
      {
        $lookup: {
          from: "ratings",
          localField: "_id",
          foreignField: "recipe",
          as: "ratings",
        },
      },
      {
        $addFields: {
          averageRating: { $avg: "$ratings.rating" },
        },
      },
      {
        $project: {
          ratings: 0,
        },
      },
    ]);
    // console.log({getSingleRecipeWithRatings});

    return getSingleRecipeWithRatings;
  } catch (error) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Internal Server Error"
    );
  }
};

const getRecipesByUserIdFromDB = async (userId: any) => {
  try {
    const recipes = await Recipe.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(userId),
          isDeleted: false,
        },
      },
      {
        $lookup: {
          from: "ratings",
          localField: "_id",
          foreignField: "recipe",
          as: "ratings",
        },
      },
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "recipe",
          as: "comments",
        },
      },

      {
        $addFields: {
          comments: { $size: "$comments" },
          averageRating: { $avg: "$ratings.rating" },
        },
      },
      {
        $project: {
          ratings: 0,
        },
      },
    ]).sort({ createdAt: -1 });
    return recipes;
  } catch (error) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Internal Server Error"
    );
  }
};

export const RecipeService = {
  createRecipeIntoDB,
  getAllRecipesAdminFromDB,
  getAllRecipesUserFromDB,
  updatePublicRecipeIntoDB,
  deleteRecipeIntoDB,
  updateRecipeIntoDB,
  getAllPublicRecipesFromDB,
  getSingleRecipeByIdFromDB,
  getRecipesByUserIdFromDB,
};
