import { NextFunction, Request, Response } from "express";
import catchAsyn from "../../utils/catchAsyn";
import AppError from "../error/AppError";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { User } from "../modules/user/user.model";

type TUserRole = "admin" | "user";
declare module "express-serve-static-core" {
  interface Request {
    user?: any;
  }
}

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsyn(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization
      ? req.headers.authorization.split(" ")[1]
      : undefined;
    // console.log("token:", token);

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not logged in");
    }

    const decoded = jwt.verify(token, config.jwt_token_secret as string);
    // console.log("decoded after:", decoded);

    if (!decoded) {
      throw new AppError(httpStatus.UNAUTHORIZED, "Invalid token");
    }

    const { id, userRole } = decoded as { id: string; userRole: string };

    const exitsUser = await User.findById(id);
    if (!exitsUser) {
      throw new AppError(httpStatus.UNAUTHORIZED, "User does not exits");
    }

    if (requiredRoles && !requiredRoles.includes(userRole as TUserRole)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You are not authorized  hi!"
      );
    }
    // console.log("decoded", decoded);

    req.user = decoded as JwtPayload & { userRole: string };
    next();
  });
};

export default auth;
