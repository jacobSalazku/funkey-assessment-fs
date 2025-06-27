import { z } from "zod";

export const activitySchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
});

export const editActivitySchema = activitySchema.extend({
  media: z
    .array(
      z.object({
        title: z.string().min(1, "Media title is required"),
        url: z.string().url("Must be a valid URL"),
      }),
    )
    .optional(),
});

export type ActivityData = z.infer<typeof activitySchema>;
export type EditActivityData = z.infer<typeof editActivitySchema>;
