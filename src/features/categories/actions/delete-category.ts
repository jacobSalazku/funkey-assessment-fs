"use server";

import prisma from "@lib/prisma";

export const deleteCategory = async (id: string) => {
  const deleteCategory = await prisma.category.delete({
    where: {
      id,
    },
  });

  return deleteCategory;
};
