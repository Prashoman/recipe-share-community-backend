import AppError from "../../error/AppError";
import httpStatus from "http-status";
import { Category } from "./category.model";
import { TCategory } from "./category.interface";

const createCategoryIntoDB = async (category: TCategory) => {
  
    const categoryExist = await Category.findOne({
      categoryName: category.categoryName,
    });
    if (categoryExist) {
      throw new AppError(httpStatus.BAD_REQUEST, "Category already exist");
    }
    const newCategory = await Category.create(category);
    return newCategory;
  
};

const getCategoryFromDB = async () => {
  const result = await Category.find({ isDeleted: false });
  return result;
};

const getCategoryByIdFromDB = async (categoryId: string) => {
  const result = await Category.findOne({ _id: categoryId, isDeleted: false });
  return result;
};

const updateCategoryInDB = async (categoryId: string, category: TCategory) => {
  category.isDeleted = false;
  const result = await Category.findByIdAndUpdate(categoryId, category, {
    new: true,
  });
  return result;
};

const deleteCategoryInDB = async (categoryId: string) => {
  const result = await Category.findByIdAndUpdate(
    categoryId,
    { isDeleted: true },
    { new: true }
  );
  return result;
};

export const CategoryService = {
  createCategoryIntoDB,
  getCategoryFromDB,
  getCategoryByIdFromDB,
  updateCategoryInDB,
  deleteCategoryInDB,
};
