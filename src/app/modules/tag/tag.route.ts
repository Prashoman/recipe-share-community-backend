import express, { NextFunction, Request, Response } from "express";
import { validationMiddleware } from "../../middleware/Validation.Middelware";
import auth from "../../middleware/auth";
import { TagValidation } from "./tag.validation";
import { Tag } from "./tag.model";
import { TagController } from "./tag.controller";

const route = express.Router();

route.post(
  "/tags",
  auth("admin"),
  validationMiddleware(TagValidation.TagCreateValidation),
  TagController.createTag
);

route.get("/tags/:id?", auth("admin", "user"), TagController.getTags);

route.put(
  "/tags/:id",
  auth("admin"),
  validationMiddleware(TagValidation.TagUpdateValidation),
  TagController.updateTag
);

route.delete("/tags/:id", auth("admin"), TagController.deleteTag);

route.get("/tags/:catId/category", auth("admin", "user"), TagController.getTagByCatId);

export const TagRoutes = route;
