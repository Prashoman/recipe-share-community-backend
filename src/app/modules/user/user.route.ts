import express, { NextFunction, Request, Response } from "express";
import { UserController } from "./user.controller";
import { validationMiddleware } from "../../middleware/Validation.Middelware";
import { UserValidation } from "./user.validation";
import auth from "../../middleware/auth";


const route = express.Router();

route.get("/users", auth("admin"), UserController.getAllUsers);

route.post(
  "/signup",
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

route.post("/change-password", auth("admin","user"), UserController.changePassword);

route.put("/update-profile", auth("admin","user"), UserController.updateProfile);

route.get("/profile", auth("admin","user"), UserController.getProfile);

route.post("/forget-password", UserController.forgetPassword);

route.post("/reset-password", UserController.resetPassword);

export const UserRoute = route;
