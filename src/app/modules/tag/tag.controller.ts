import { Request, Response } from "express";
import catchAsyn from "../../../utils/catchAsyn";
import sendResponse from "../../../utils/sendResponse";
import httpStatus from "http-status";
import { TagService } from "./tag.service";

const createTag = catchAsyn(async (req: Request, res: Response) => {
  const tagInfo = req.body;
  const newTag = await TagService.createTagIntoDB(tagInfo);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Tag created successfully",
    data: newTag,
  });
});

const getTags = catchAsyn(async (req: Request, res: Response) => {
  const id = req.params.id;
  if (id) {
    const tag = await TagService.getTagById(id);
    if (!tag) {
      sendResponse(res, {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: "Tag not found",
        data: null,
      });
      return;
    }
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Tag fetched successfully",
      data: tag,
    });
    return;
  }
  const tags = await TagService.getAllTag();
  if (tags.length === 0) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: true,
      message: "No tags found",
      data: [],
    });
    return;
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Tags fetched successfully",
    data: tags,
  });
});

const updateTag = catchAsyn(async (req: Request, res: Response) => {
  const id = req.params.id;
  const tagInfo = req.body;
  const updatedTag = await TagService.updateTagById(id, tagInfo);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Tag updated successfully",
    data: updatedTag,
  });
});

const deleteTag = catchAsyn(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await TagService.deleteTagById(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Tag deleted successfully",
    data: result,
  });
});

const getTagByCatId = catchAsyn(async (req: Request, res: Response) => {
  const catId = req.params.catId;
  const tags = await TagService.getTagByCatId(catId);
  if (tags.length === 0) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: true,
      message: "No tags found",
      data: [],
    });
    return;
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Tags fetched successfully",
    data: tags,
  });
});

export const TagController = {
  createTag,
  getTags,
  updateTag,
  deleteTag,
  getTagByCatId,
};
