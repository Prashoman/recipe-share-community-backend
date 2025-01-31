import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { TUser, TUserLogin } from "./user.interface";
import { User } from "./user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config";
import createToken from "../../../utils/createToken";
import { sendEmail } from "./user.constant";
import { UserRelationShip } from "../userRelationShip/userRelationShip.model";
import QueryBuilder from "../../builder/QueryBuilder";

const signUpIntoDB = async (payload: TUser) => {
  const existEmail = await User.findOne({ email: payload.email });
  if (existEmail) {
    throw new AppError(httpStatus.FORBIDDEN, "Email already exist");
  }
  payload.bio = "";
  payload.address = "";
  payload.role = "user";
  // console.log(payload);
  const result = await User.create(payload);
  return result;
};

const getAllUsersFormDB = async (query: any) => {
  const allUserQuery = new QueryBuilder(
    User.find({ role: "user", isDeleted: false }),
    query
  )
    .search(["userName", "email"])
    .sort()
    .paginate()
    .filter();
  const meta = await allUserQuery.countTotal();
  const result = await allUserQuery.modelQuery;
  return { meta, result };
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
  // console.log({ email, password });

  const user = await User.findOne({ email, isDeleted: false }).select(
    "+password"
  );
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "Email Not Found");
  }
  // console.log({ user });

  const isMatch = await bcrypt.compare(password, user.password);
  // console.log({ isMatch });

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

const getAllAdminIntoDB = async (query:any) => {

  const allAdminQuery = new QueryBuilder(
    User.find({ role: "admin", isDeleted: false }),
    query
  )
    .search(["userName", "email"])
    .sort()
    .paginate()
    .filter();
  const meta = await allAdminQuery.countTotal();
  const result = await allAdminQuery.modelQuery;
  return { meta, result };
};

const changePasswordIntoDB = async (
  user: any,
  oldPassword: string,
  newPassword: string
) => {
  const userWithPassword = await User.findOne({
    _id: user.id,
    isDeleted: false,
  }).select("+password");
  if (!userWithPassword) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  const isMatch = await bcrypt.compare(oldPassword, userWithPassword.password);
  if (!isMatch) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Password dose not match");
  }
  const newPasswordHash = await bcrypt.hash(
    newPassword,
    Number(config.salts_rounds)
  );
  const updatePassword = await User.findByIdAndUpdate(user.id, {
    password: newPasswordHash,
    passwordUpdate: true,
  });
  return updatePassword;
};

const updateProfileIntoDB = async (user: any, userInfo: TUser) => {
  const matchUser = await User.findOne({ _id: user.id, isDeleted: false });
  if (!matchUser) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  const updatedUser = await User.findByIdAndUpdate({ _id: user.id }, userInfo, {
    new: true,
  });
  return updatedUser;
};

const getProfileFromDB = async (user: any) => {
  const matchUser = await User.findById({ _id: user.id, isDeleted: false });
  if (!matchUser) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  return matchUser;
};

const forgetPasswordIntoDB = async (email: string) => {
  const user = await User.findOne({ email, isDeleted: false });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  const jwtPayload = { id: user._id, userRole: user.role };
  const token = createToken(
    jwtPayload,
    config.jwt_token_secret as string,
    "5m"
  );
  const link = `${config.fronted_url}/reset-password?id=${user?._id}&token=${token}`;
  sendEmail(
    email,
    " Change Your Password with 5 Minutes ",
    "<b>Click the link to change password</b>" + link
  );
  return link;
};

const resetPasswordIntoDB = async (
  id: string,
  token: string,
  newPassword: string
) => {
  const user = await User.findOne({ _id: id, isDeleted: false });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  const jwtPayload: any = jwt.verify(token, config.jwt_token_secret as string);
  // console.log({ jwtPayload, user });

  if (jwtPayload.id != user._id) {
    throw new AppError(httpStatus.UNAUTHORIZED, "User not authorized");
  }

  const newPasswordHash = await bcrypt.hash(
    newPassword,
    Number(config.salts_rounds)
  );
  const updatePassword = await User.findByIdAndUpdate(
    {
      _id: user._id,
    },
    {
      password: newPasswordHash,
      passwordUpdate: true,
    }
  );
  return updatePassword;
};

const getUserByIdFromDB = async (userId: string) => {
  const matchUser = await User.findById({ _id: userId, isDeleted: false });
  const followInfo = await UserRelationShip.find({
    follower: userId,
  }).populate("following", "name email");
  const followerInfo = await UserRelationShip.find({
    following: userId,
  }).populate("follower", "name email");
  if (!matchUser) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  return { userInfo: matchUser, followInfo, followerInfo };
};

const getAllBothUserFromDB = async (query: any) => {
  // console.log({ query });

  const allUserQuery = new QueryBuilder(
    User.find({ isDeleted: false }).select("userName email profileImage _id"),
    query
  )
    .search(["userName", "email"])
    .sort()
    .paginate()
    .filter();
  const meta = await allUserQuery.countTotal();
  const result = await allUserQuery.modelQuery;
  return { meta, result };
};

export const UserService = {
  signUpIntoDB,
  getAllUsersFormDB,
  useLoginFromDB,
  createAdminIntoDB,
  getAllAdminIntoDB,
  changePasswordIntoDB,
  updateProfileIntoDB,
  getProfileFromDB,
  forgetPasswordIntoDB,
  resetPasswordIntoDB,
  getUserByIdFromDB,
  getAllBothUserFromDB,
};
// http://localhost:3000/reset-password?id=67926cf7dfd7c8f43b1d9d54&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3OTI2Y2Y3ZGZkN2M4ZjQzYjFkOWQ1NCIsInVzZXJSb2xlIjoidXNlciIsImlhdCI6MTczNzY5ODAzMywiZXhwIjoxNzM3Njk4MzMzfQ.jDUicc8ek6p1i0RAGcZkL6Ps1NdLTeDXP3-j3hVnIPc"
