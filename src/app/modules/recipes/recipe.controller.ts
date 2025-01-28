import httpStatus from "http-status";
import catchAsyn from "../../../utils/catchAsyn";
import sendResponse from "../../../utils/sendResponse";
import { RecipeService } from "./recipe.service";

const createRecipe = catchAsyn(async (req, res) => {
  const recipeInfo = req.body;
  const user = req.user;
  const recipe = await RecipeService.createRecipeIntoDB(recipeInfo, user);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    data: recipe,
    message: "Recipe created successfully",
  });
});

const getAllAdminRecipes = catchAsyn(async (req, res) => {
  const recipes = await RecipeService.getAllRecipesAdminFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: recipes,
    message: "All recipes fetched successfully",
  });
});

const getAllUserRecipes = catchAsyn(async (req, res) => {
  const user = req.user;
  const recipes = await RecipeService.getAllRecipesUserFromDB(user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: recipes,
    message: "All recipes fetched successfully",
  });
});

const updatePublicRecipe = catchAsyn(async (req, res) => {
  const recipeId = req.body;
  const recipe = await RecipeService.updatePublicRecipeIntoDB(recipeId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: recipe,
    message: "Recipe Public successfully",
  });
});

const deleteRecipe = catchAsyn(async (req, res) => {
  const recipeId = req.params.id;
  const recipe = await RecipeService.deleteRecipeIntoDB(recipeId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: recipe,
    message: "Recipe deleted successfully",
  });
});

const updateRecipe = catchAsyn(async (req, res) => {
  const recipeId = req.params.id;
  const recipeInfo = req.body;
  const user = req.user;
  const recipe = await RecipeService.updateRecipeIntoDB(
    recipeId,
    recipeInfo,
    user
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: recipe,
    message: "Recipe updated successfully",
  });
});

const getAllPublicRecipes = catchAsyn(async (req, res) => {
  const recipes = await RecipeService.getAllPublicRecipesFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: recipes,
    message: "All public recipes fetched successfully",
  });
});

const getSingleRecipesById = catchAsyn(async (req, res) => {
  const recipeId = req.params.id;
  const recipe = await RecipeService.getSingleRecipeByIdFromDB(recipeId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: recipe,
    message: "Recipe fetched successfully",
  });
});

export const RecipeController = {
  createRecipe,
  getAllAdminRecipes,
  getAllUserRecipes,
  updatePublicRecipe,
  deleteRecipe,
  updateRecipe,
  getAllPublicRecipes,
  getSingleRecipesById,
};
