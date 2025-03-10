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
  const recipes = await RecipeService.getAllRecipesAdminFromDB(req.query);
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
  const recipeId = req.params.id;
  const info = req.body;
  const recipe = await RecipeService.updatePublicRecipeIntoDB(recipeId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: recipe,
    message: recipe?.isPublished ? "Recipe published" : "Recipe unpublished",
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
  const recipes = await RecipeService.getAllPublicRecipesFromDB(req.query);
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

const getRecipesByUserId = catchAsyn(async (req, res) => {
  const userId = req.params.userId;
  const recipes = await RecipeService.getRecipesByUserIdFromDB(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: recipes,
    message: "All recipes fetched successfully",
  });
});

const getAllUnPublishRecipes = catchAsyn(async (req, res) => {

  const recipes = await RecipeService.getAllUnPublishRecipesFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: recipes,
    message: "All unpublished recipes fetched successfully",
  });
});

const getLatestRecipes = catchAsyn(async (req, res) => {
  const recipes = await RecipeService.getLatestRecipesFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: recipes,
    message: "All latest recipes fetched successfully",
  });
});

const getTrendingRecipes = catchAsyn(async (req, res) => {
  const recipes = await RecipeService.getTrendingRecipesFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: recipes,
    message: "All trending recipes fetched successfully",
  });
}
)

export const RecipeController = {
  createRecipe,
  getAllAdminRecipes,
  getAllUserRecipes,
  updatePublicRecipe,
  deleteRecipe,
  updateRecipe,
  getAllPublicRecipes,
  getSingleRecipesById,
  getRecipesByUserId,
  getAllUnPublishRecipes,
  getLatestRecipes,
  getTrendingRecipes
};
