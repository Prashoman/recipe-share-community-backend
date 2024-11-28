import  express  from "express";
import { UserController } from "./user.controller";
import { validationMiddleware } from "../../middleware/Validation.Middelware";
import { UserValidation } from "./user.validation";
import auth from "../../middleware/auth";

const route = express.Router();

route.get('/users', UserController.getAllUsers);

route.post('/signup', validationMiddleware(UserValidation.UserCreateValidation), UserController.userSignUp);

route.post('/create/admin', auth('admin'), validationMiddleware(UserValidation.UserCreateValidation), UserController.createAdmin);
route.get('/admins',auth('admin'), UserController.getAllAdmin);

route.post('/login', validationMiddleware(UserValidation.UserLoginValidation), UserController.userLogin);
export const UserRoute = route;