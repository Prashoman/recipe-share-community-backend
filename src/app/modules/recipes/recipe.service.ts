import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { User } from "../user/user.model";
import { Recipe } from "./recipe.model";
import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";

const createRecipeIntoDB = async (recipe: any, user: any) => {
  const matchUser = await User.findById(user.id, { isDeleted: false });
  if (!matchUser) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  recipe.isPublished = false;
  if (matchUser.role === "admin") {
    recipe.isPublished = true;
  }
  recipe.user = user.id;
  const result = await Recipe.create(recipe);
  return result;
};

const getAllRecipesAdminFromDB = async (query: any) => {
  const allRecipeQuery = new QueryBuilder(
    Recipe.find({ isDeleted: false }).populate(
      "user",
      "userName email profileImage _id"
    ),
    query
  )
    .search(["title"])
    .sort()
    .paginate()
    .filter();
  const meta = await allRecipeQuery.countTotal();
  const result = await allRecipeQuery.modelQuery;
  return { meta, result };
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
  recipe.user = user?.id;
  recipe.likes = recipeInfo?.likes;
  recipe.isPublished = recipeInfo?.isPublished;
  recipe.isDeleted = recipeInfo?.isDeleted;
  recipe.isPremium = recipeInfo?.isPremium;
  recipe.status = recipeInfo?.status;
  const result = await Recipe.findByIdAndUpdate(recipeId, recipe, {
    new: true,
  });
  return result;
};

const getAllPublicRecipesFromDB = async (query: any) => {
  try {
    const { searchTerm, page = 1, limit = 10 } = query;

    const recipesWithRatings = await Recipe.aggregate([
      {
        $match: {
          isDeleted: false,
          isPublished: true,
          ...(searchTerm && {
            $or: [
              { title: { $regex: searchTerm, $options: "i" } },
              { cookingTime: { $regex: searchTerm, $options: "i" } },
              {
                ingredients: {
                  $elemMatch: {
                    name: { $regex: searchTerm, $options: "i" },
                  },
                },
              },
              {
                tags: { $in: [new RegExp(searchTerm, "i")] },
              },
              {
                steps: {
                  $elemMatch: {
                    description: { $regex: searchTerm, $options: "i" },
                  },
                },
              },
            ],
          }),
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
        $lookup: {
          from: "users", // Collection name
          localField: "user", // The field in the Recipe collection that references the User
          foreignField: "_id", // The _id field in the Users collection
          as: "user", // The result will be stored in a "user" array
        },
      },
      {
        $lookup: {
          from: "categories", // Collection name
          localField: "category", // The field in the Recipe collection that references the User
          foreignField: "_id", // The _id field in the Users collection
          as: "category", // The result will be stored in a "user" array
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
        },
      },
      {
        $unwind: "$category", // Converts category array into an object
      },
      {
        $unwind: {
          path: "$user", // Unwind the array to get a single object
          preserveNullAndEmptyArrays: true, // In case the user field is null
        },
      },
      {
        $project: {
          "category.__v": 0,
          "category.createdAt": 0,
          "category.updatedAt": 0,
          "category.isDeleted": 0,
          "category.categoryDescription": 0,
        },
      },
      {
        $project: {
          ratings: 0, // Remove the raw ratings array
          "user.password": 0, // Exclude sensitive fields from user
          "user.__v": 0,
          "user.address": 0,
          "user.bio": 0,
          "user.createdAt": 0,
          "user.expiryDate": 0,
          "user.isDeleted": 0,
          "user.memberShip": 0,
          "user.passwordUpdate": 0,
          "user.role": 0,
          "user.updatedAt": 0,
        },
      },
      {
        $sort: {
          likes: -1,
        },
      },
      {
        $limit: limit ? parseInt(limit) : 10,
      },
      {
        $skip: page ? (parseInt(page) - 1) * 10 : 0,
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
      {
        $lookup: {
          from: "categories", // Collection name
          localField: "category", // The field in the Recipe collection that references the User
          foreignField: "_id", // The _id field in the Users collection
          as: "category", // The result will be stored in a "user" array
        },
      },
      {
        $unwind: "$category", // Converts category array into an object
      },
      {
        $project: {
          "category.__v": 0,
          "category.createdAt": 0,
          "category.updatedAt": 0,
          "category.isDeleted": 0,
          "category.categoryDescription": 0,
        },
      },
      {
        $lookup: {
          from: "users", // Collection name
          localField: "user", // The field in the Recipe collection that references the User
          foreignField: "_id", // The _id field in the Users collection
          as: "user", // The result will be stored in a "user" array
        },
      },
      {
        $unwind: {
          path: "$user", // Unwind the array to get a single object
          preserveNullAndEmptyArrays: true, // In case the user field is null
        },
      },
      {
        $project: {
          ratings: 0, // Remove the raw ratings array
          "user.password": 0, // Exclude sensitive fields from user
          "user.__v": 0,
          "user.address": 0,
          "user.bio": 0,
          "user.createdAt": 0,
          "user.expiryDate": 0,
          "user.isDeleted": 0,
          "user.memberShip": 0,
          "user.passwordUpdate": 0,
          "user.role": 0,
          "user.updatedAt": 0,
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

const getAllUnPublishRecipesFromDB = async (query: any) => {
  const allRecipeQuery = new QueryBuilder(
    Recipe.find({ isDeleted: false, isPublished: false })
      .populate("user", "userName email profileImage _id")
      .populate("category", "categoryName _id"),
    query
  )
    .search(["title"])
    .sort()
    .paginate()
    .filter();
  const meta = await allRecipeQuery.countTotal();
  const result = await allRecipeQuery.modelQuery;

  return { meta, result };
};

const getLatestRecipesFromDB = async () => {
  const recipes = await Recipe.find({ isDeleted: false, isPublished: true })
    .sort({ createdAt: -1 })
    .limit(5)
    .populate("user", "userName email profileImage _id")
    .populate("category", "categoryName _id");
  return recipes;
};

const getTrendingRecipesFromDB = async () => {
  const recipes = await Recipe.find({ isDeleted: false, isPublished: true, isPremium: false })
    .sort({ likes: -1 })
    .limit(10)
    .populate("user", "userName email profileImage _id")
    .populate("category", "categoryName _id");
  return recipes;
}

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
  getAllUnPublishRecipesFromDB,
  getLatestRecipesFromDB,
  getTrendingRecipesFromDB
};
