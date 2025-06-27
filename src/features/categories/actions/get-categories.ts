"use server";

import prisma from "@lib/prisma";

export const getAllCategories = async () => {
  const categories = await prisma.category.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      media: true,
      activities: true,
    },
  });

  return categories;
};
