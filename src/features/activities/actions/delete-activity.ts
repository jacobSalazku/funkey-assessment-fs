"use server";

import prisma from "@lib/prisma";

export const deleteActivity = async (id: string) => {
  const deletedActivity = await prisma.activity.delete({
    where: {
      id,
    },
  });

  return deletedActivity;
};
