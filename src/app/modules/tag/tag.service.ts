import AppError from "../../error/AppError";
import httpStatus from "http-status";
import { TTag } from "./tag.interface";
import { Tag } from "./tag.model";

const createTagIntoDB = async (tag: TTag) => {
  try {
    const newTag = await Tag.create(tag);
    return newTag;
  } catch (error) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Internal Server Error"
    );
  }
};

const getAllTag = async () => {
  try {
    const tags = await Tag.find({ isDeleted: false }).populate(
      "category",
      "_id categoryName"
    );
    return tags;
  } catch (error) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Internal Server Error"
    );
  }
};

const getTagById = async (tagId: string) => {
  const tag = await Tag.findOne(
    { _id: tagId, isDeleted: false }
  ).populate("category", "_id categoryName");
  return tag;
};

const updateTagById = async (tagId: string, tag: TTag) => {
  try {
    const updatedTag = await Tag.findByIdAndUpdate(tagId, tag, {
      new: true,
    });
    return updatedTag;
  } catch (error) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Internal Server Error"
    );
  }
};

const deleteTagById = async (tagId: string) => {
  const result = await Tag.findByIdAndUpdate(tagId, {
    isDeleted: true,
  });
  return result;
};

const getTagByCatId = async (catId: string) => {
  const tags = await Tag.find({ category: catId, isDeleted: false });
  return tags;
};

export const TagService = {
  createTagIntoDB,
  getAllTag,
  getTagById,
  updateTagById,
  deleteTagById,
  getTagByCatId,
};
