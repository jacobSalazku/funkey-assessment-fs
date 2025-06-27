import prisma from "@lib/prisma";
import { cache } from "react";

export const getAllActivities = cache(async () => {
  const activities = await prisma.activity.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      title: true,
      description: true,
      category: true,
      media: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return activities;
});
