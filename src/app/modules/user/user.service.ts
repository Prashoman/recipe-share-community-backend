import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { TUser, TUserLogin } from "./user.interface";
import { User } from "./user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config";
import createToken from "../../../utils/createToken";
import { sendImageToCloudinary } from "../../../utils/uploadImageToCloudinary";

const signUpIntoDB = async (userImage: any, payload: TUser) => {
  const existEmail = await User.findOne({ email: payload.email });
  if (existEmail) {
    throw new AppError(httpStatus.FORBIDDEN, "Email already exist");
  }

  //   const imagePath = userImage ? userImage?.path : null;
  //   const imageName = `${payload?.userName}-${Date.now()}`;
  //   console.log({imagePath,imageName});

  //  const {secure_url}= await sendImageToCloudinary(imageName,imagePath);

  //  console.log({secure_url});

  payload.profileImage = userImage?.path;

  console.log(payload);
  const result = await User.create(payload);
  return result;
};

const getAllUsersFormDB = async () => {
  const result = await User.find();
  return result;
};

const createAdminIntoDB = async (payload: TUser) => {
  const exist = await User.findOne({ email: payload.email });
  if (exist) {
    throw new AppError(httpStatus.FORBIDDEN, "Email already exist");
  }
  payload.role = "admin";
  const result = await User.create(payload);
  return result;
};

const useLoginFromDB = async (payload: TUserLogin) => {
  const { email, password } = payload;
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "Email Not Found");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Password dose not match");
  }
  const jwtPayload = { id: user._id, userRole: user.role };
  const accessToken = createToken(
    jwtPayload,
    config.jwt_token_secret as string,
    config.jwt_token_expiry as string
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_token_secret as string,
    config.jwt_refresh_token_expiry as string
  );

  const userWithOutPassword = await User.findById(user._id);
  return {
    userWithOutPassword,
    accessToken,
    refreshToken,
  };
};

const getAllAdminIntoDB = async () => {
  const result = await User.find({ role: "admin" });
  return result;
};

export const UserService = {
  signUpIntoDB,
  getAllUsersFormDB,
  useLoginFromDB,
  createAdminIntoDB,
  getAllAdminIntoDB,
};
