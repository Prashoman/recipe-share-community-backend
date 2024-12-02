import { Request, Response } from "express";
import catchAsyn from "../../../utils/catchAsyn";
import { UserService } from "./user.service";
import sendResponse from "../../../utils/sendResponse";
import httpStatus from "http-status";

const userSignUp = catchAsyn(async (req: Request, res: Response) => {
  const userImage = req.file;
  const userInfo = req.body;
  // console.log({userImage,userInfo});

  const insertedUser = await UserService.signUpIntoDB(userImage, userInfo);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: insertedUser,
    message: "User created successfully",
  });
});

const getAllUsers = catchAsyn(async (req: Request, res: Response) => {
  const allUsers = await UserService.getAllUsersFormDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: allUsers,
    message: "All users fetched successfully",
  });
});

const userLogin = catchAsyn(async (req: Request, res: Response) => {
  const userCredentials = req.body;
  const { userWithOutPassword, accessToken, refreshToken } =
    await UserService.useLoginFromDB(userCredentials);
  if (accessToken && refreshToken) {
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
    });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    token: accessToken,
    data: userWithOutPassword,
    message: "User logged in successfully",
  });
});

const createAdmin = catchAsyn(async (req: Request, res: Response) => {
  const userInfo = req.body;
  const insertedUser = await UserService.createAdminIntoDB(userInfo);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: insertedUser,
    message: "Admin created successfully",
  });
});

const getAllAdmin = catchAsyn(async (req: Request, res: Response) => {
  const admins = await UserService.getAllAdminIntoDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: admins,
    message: "All Admin  fetched successfully",
  });
});

export const UserController = {
  userSignUp,
  getAllUsers,
  userLogin,
  createAdmin,
  getAllAdmin,
};
