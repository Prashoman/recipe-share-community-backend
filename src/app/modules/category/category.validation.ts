import { z } from "zod";

const CategoryCreateValidation = z.object({
  body: z.object({
    categoryName: z.string().nonempty({
      message: "Category Name is required",
    }),
  }),
});

const CategoryUpdateValidation = z.object({
  body: z.object({
    categoryName: z
      .string()
      .nonempty({
        message: "Category Name is required",
      })
      .optional(),
  }),
});

export const CategoryValidation = {
  CategoryCreateValidation,
  CategoryUpdateValidation,
};
