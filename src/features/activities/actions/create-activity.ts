"use server";

import prisma from "@lib/prisma";
import { ActivityData } from "../zod";

export const createActivity = async (data: ActivityData) => {
  const newActivity = await prisma.activity.create({
    data: {
      ...data,
    },
  });

  return newActivity;
};
