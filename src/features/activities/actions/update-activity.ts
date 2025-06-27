"use server";

import prisma from "@lib/prisma";
import { EditActivityData } from "../zod";

export const updateActivity = async (id: string, data: EditActivityData) => {
  const updatedActivity = await prisma.activity.update({
    where: { id },
    data: {
      title: data.title,
      description: data.description,
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

  return updatedActivity;
};
