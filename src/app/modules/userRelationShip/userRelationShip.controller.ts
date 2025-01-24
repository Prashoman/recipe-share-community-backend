import { Request, Response } from "express";
import catchAsyn from "../../../utils/catchAsyn";
import sendResponse from "../../../utils/sendResponse";
import httpStatus from "http-status";
import { UserRelationService } from "./userRelationShip.service";


const followUser = catchAsyn(async (req: Request, res: Response) => {

    const { followId } = req.body;
    const {id} = req.user;
    const followUserInfo = await UserRelationService.userFollowingDB(followId, id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        data: followUserInfo,
        message: "User followed successfully",
    });
});

const unFollowUser = catchAsyn(async (req: Request, res: Response) => {
    const { unFollowId } = req.body;
    const {id} = req.user;
  const result =  await UserRelationService.userUnFollowingDB(unFollowId, id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        data: result,
        message: "User unfollowed successfully",
    });
});

const getFollowers = catchAsyn(async (req: Request, res: Response) => {
    const {id} = req.user;
    const followers = await UserRelationService.getFollowersDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        data: followers,
        message: "Followers fetched successfully",
    });
});

const getFollowing = catchAsyn(async (req: Request, res: Response) => {
    const {id} = req.user;
    const followers = await UserRelationService.getFollowingDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        data: followers,
        message: "Following fetched successfully",
    });
});

export const UserRelationShipController = {
    followUser,
    unFollowUser,
    getFollowers,
    getFollowing
}