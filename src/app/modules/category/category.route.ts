import express, { NextFunction, Request, Response } from "express";
import { validationMiddleware } from "../../middleware/Validation.Middelware";
import auth from "../../middleware/auth";
import { CategoryValidation } from "./category.validation";
import { CategoryController } from "./category.controller";

const route = express.Router();

route.get(
  "/categories/:id?",
  auth("admin", "user"),
  CategoryController.getCategories
);

route.post(
  "/categories",
  auth("admin"),
  validationMiddleware(CategoryValidation.CategoryCreateValidation),
  CategoryController.createCategory
);

route.put(
  "/categories/:id",
  auth("admin"),
  validationMiddleware(CategoryValidation.CategoryUpdateValidation),
  CategoryController.updateCategory
);

route.delete(
  "/categories/:id",
  auth("admin"),
  CategoryController.deleteCategory
);

export const CategoryRoutes = route;
