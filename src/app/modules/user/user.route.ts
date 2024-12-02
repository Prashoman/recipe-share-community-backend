import express, { NextFunction, Request, Response } from "express";
import { UserController } from "./user.controller";
import { validationMiddleware } from "../../middleware/Validation.Middelware";
import { UserValidation } from "./user.validation";
import auth from "../../middleware/auth";

import { multerUpload } from "../../config/multer.config";

const route = express.Router();

route.get("/users", UserController.getAllUsers);

route.post(
  "/signup",
  multerUpload.single("profileImage"),
  (req: Request, res: Response, next: NextFunction) => {
    // console.log(req.body);
    req.body = JSON.parse(req.body.data);
    next();
  },
  validationMiddleware(UserValidation.UserCreateValidation),
  UserController.userSignUp
);
// , UserController.userSignUp

route.post(
  "/create/admin",
  auth("admin"),
  validationMiddleware(UserValidation.UserCreateValidation),
  UserController.createAdmin
);
route.get("/admins", auth("admin"), UserController.getAllAdmin);

route.post(
  "/login",
  validationMiddleware(UserValidation.UserLoginValidation),
  UserController.userLogin
);
export const UserRoute = route;
