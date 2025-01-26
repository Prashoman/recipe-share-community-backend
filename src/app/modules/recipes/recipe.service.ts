import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { User } from "../user/user.model";
import { Recipe } from "./recipe.model";

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
    { isPublished: true },
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

export const RecipeService = {
  createRecipeIntoDB,
  getAllRecipesAdminFromDB,
  getAllRecipesUserFromDB,
  updatePublicRecipeIntoDB,
  deleteRecipeIntoDB,
  updateRecipeIntoDB,
};
