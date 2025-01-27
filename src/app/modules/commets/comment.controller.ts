import { Request, Response } from "express";
import catchAsyn from "../../../utils/catchAsyn";
import sendResponse from "../../../utils/sendResponse";
import { CommentService } from "./comment.service";

const createComment = catchAsyn(async (req: Request, res: Response) => {
  const commentInfo = req.body;
  const userId = req.user.id;

  const like = await CommentService.createCommentIntoDB(commentInfo, userId);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Comment created successfully",
    data: like,
  });
});

const getMyComments = catchAsyn(async (req: Request, res: Response) => {
    const {id} = req.params;
    const comments = await CommentService.getCommentByRecipeIdFromDB(id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Comments fetched successfully",
        data: comments,
    });
    })

export const CommentController = {
  createComment,
  getMyComments
};
