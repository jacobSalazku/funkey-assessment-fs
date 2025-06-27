"use server";

import prisma from "@lib/prisma";
import { CategoryData } from "../zod";

export const createCategory = async (data: CategoryData) => {
  const newCategory = await prisma.category.create({
    data: {
      title: data.title,
      description: data.description,
    },
  });

  return newCategory;
};
