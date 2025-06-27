"use server";

import prisma from "@lib/prisma";
import { EditCategoryData } from "../zod";

export const updateCategory = async (id: string, data: EditCategoryData) => {
  const updatedCategory = await prisma.category.update({
    where: { id },
    data: {
      title: data.title,
      description: data.description,
      activities: {
        set: data.activityIds?.map((actId) => ({ id: actId })) || [],
      },
      media: {
        // Delete all existing media and re-add them with th new ones
        deleteMany: {},
        create:
          data.media?.map((mediaItem) => ({
            title: mediaItem.title,
            url: mediaItem.url,
          })) || [],
      },
    },
  });

  return updatedCategory;
};
