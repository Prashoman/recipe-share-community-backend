import { Request, Response } from "express";
import catchAsyn from "../../../utils/catchAsyn";
import { LikeService } from "./like.service";
import sendResponse from "../../../utils/sendResponse";
import httpStatus from "http-status";

const createLike = catchAsyn(async (req: Request, res: Response) => {
  const recipeId =req.body.recipeId;
  const userId = req.user.id;
  console.log(recipeId, userId);
  
  const like = await LikeService.likeCreateIntoDB(recipeId, userId);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Like created successfully",
    data: like,
  });
});

const deleteLike = catchAsyn(async (req: Request, res: Response) => {
    const recipeId = req.params.id;
    const userId = req.user.id;
   const likes = await LikeService.deleteLikeFromDB(recipeId, userId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Like deleted successfully",
        data: likes,
    });
})

const getLikes = catchAsyn(async (req: Request, res: Response) => {
    const userId = req.user.id;
    const likes = await LikeService.getLikesFromDB(userId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Likes fetched successfully",
        data: likes,
    });
})

export const LikeController={
    createLike,
    deleteLike,
    getLikes
}
