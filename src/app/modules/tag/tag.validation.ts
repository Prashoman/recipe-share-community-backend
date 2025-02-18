import { z } from "zod";

const TagCreateValidation = z.object({
  body: z.object({
    tagName: z.array(z.string()).nonempty({
      message: "Tag Name is required",
    }),
  }),
});

const TagUpdateValidation = z.object({
  body: z.object({
    tagName: z
      .array(z.string())
      .nonempty({
        message: "Tag Name is required",
      })
      .optional(),
  }),
});

export const TagValidation = {
  TagCreateValidation,
  TagUpdateValidation,
};
