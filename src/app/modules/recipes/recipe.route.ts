import express from "express";

import auth from "../../middleware/auth";
import { validationMiddleware } from "../../middleware/Validation.Middelware";
import { RecipeValidation } from "./recipe.validation";
import { RecipeController } from "./recipe.controller";


const route = express.Router();

route.post("/create", auth("admin","user"), validationMiddleware(RecipeValidation.createRecipeValidation), RecipeController.createRecipe);

route.get("/all", auth("admin"), RecipeController.getAllAdminRecipes);

// todo list here my recipes only view user
route.get("/my-recipes", auth("user","admin"), RecipeController.getAllUserRecipes);

route.put("/publish/", auth("admin"), RecipeController.updatePublicRecipe);

route.delete("/delete/:id", auth("admin","user"), RecipeController.deleteRecipe);

route.put("/update/:id", auth("admin","user"), RecipeController.updateRecipe);

route.get("/get-all/public", RecipeController.getAllPublicRecipes);
route.get("/details/:id", RecipeController.getSingleRecipesById);



export const RecipeRouter = route;
