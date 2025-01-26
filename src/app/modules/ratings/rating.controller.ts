import { Request, Response } from "express";
import catchAsyn from "../../../utils/catchAsyn";

import sendResponse from "../../../utils/sendResponse";
import httpStatus from "http-status";
import { RatingService } from "./rating.service";

const createRating = catchAsyn(async (req: Request, res: Response) => {
  const ratingInfo =req.body;
  const userId = req.user.id;
 
  
  const ratings = await RatingService.ratingCreateIntoDB(ratingInfo, userId);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Rating created successfully",
    data: ratings,
  });
});

const getMyRating = catchAsyn(async (req: Request, res: Response) => {
  const userId = req.user.id;
  const ratings = await RatingService.getMyRatingFromDB(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "My ratings",
    data: ratings,
  });
});


export const RatingController={
  createRating,
  getMyRating
}
