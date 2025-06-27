import { z } from "zod";

export const newCategorySchema = z.object({
  title: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
});

export const editCategorySchema = newCategorySchema.extend({
  activityIds: z.array(z.string().min(1, "Category ID is required")).optional(),
  media: z
    .array(
      z.object({
        title: z.string().min(1, "Media title is required"),
        url: z.string().url("Must be a valid URL"),
      }),
    )
    .optional(),
});

export type CategoryData = z.infer<typeof newCategorySchema>;

export type EditCategoryData = z.infer<typeof editCategorySchema>;
