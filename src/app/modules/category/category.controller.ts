import { Request, Response } from "express";
import catchAsyn from "../../../utils/catchAsyn";
import sendResponse from "../../../utils/sendResponse";
import httpStatus from "http-status";
import { CategoryService } from "./category.service";

const createCategory = catchAsyn(async (req: Request, res: Response) => {
  const categoryInfo = req.body;

  const category = await CategoryService.createCategoryIntoDB(categoryInfo);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Category created successfully",
    data: category,
  });
});

const getCategories = catchAsyn(async (req: Request, res: Response) => {
  const id = req.params.id;
  if (id) {
    const category = await CategoryService.getCategoryByIdFromDB(id);
    if (!category) {
      sendResponse(res, {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: "Category not found",
        data: null,
      });
      return;
    }
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Category fetched successfully",
      data: category,
    });
    return;
  }
  const categories = await CategoryService.getCategoryFromDB();
  if (categories.length === 0) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: true,
      message: "No categories found",
      data: [],
    });
    return;
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Categories fetched successfully",
    data: categories,
  });
});

const updateCategory = catchAsyn(async (req: Request, res: Response) => {
  const id = req.params.id;
  const categoryInfo = req.body;

  const category = await CategoryService.updateCategoryInDB(id, categoryInfo);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Category updated successfully",
    data: category,
  });
});

const deleteCategory = catchAsyn(async (req: Request, res: Response) => {
  const id = req.params.id;
  const category = await CategoryService.deleteCategoryInDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Category deleted successfully",
    data: category,
  });
});

export const CategoryController = {
  createCategory,
    getCategories,
    updateCategory,
    deleteCategory
};
