import mongoose from "mongoose";
import { Comment } from "./comment.model";
import { TComment } from "./commet.interface";

const createCommentIntoDB = async (
  payload: Partial<TComment>,
  userId: string
) => {
  const comment = await Comment.create({ ...payload, user: userId });
  return comment;
};
const updateCommentIntoDB = async (
  commentId: string,
  userId: string,
  payload: Partial<TComment>
) => {
  const mathComment = await Comment.findOne({ _id: commentId, user: userId });
  if (!mathComment) {
    throw new Error("Comment not found");
  }
  payload.user = new mongoose.Types.ObjectId(userId);
  const comment = await Comment.findByIdAndUpdate(commentId, payload, {
    new: true,
  });
  return comment;
};
const getAllCommentsFromDB = async (userId: string) => {
  const comments = await Comment.find({ user: userId });
  return comments;
};

const getCommentByRecipeIdFromDB = async (recipeId: string) => {
  const comments = await Comment.find({ recipe: recipeId })
    .sort({
      createdAt: -1,
    })
    .populate("user", "userName email profileImage _id");
  return comments;
};

const deleteCommentFromDB = async (commentId: string, userId: string) => {
  const mathComment = await Comment.findOne({ _id: commentId, user: userId });
  if (!mathComment) {
    throw new Error("Comment not found");
  }
  const comment = await Comment.findByIdAndDelete(commentId);
  return comment;
};

export const CommentService = {
  createCommentIntoDB,
  updateCommentIntoDB,
  getAllCommentsFromDB,
  getCommentByRecipeIdFromDB,
  deleteCommentFromDB,
};
