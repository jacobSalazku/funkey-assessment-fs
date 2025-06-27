import prisma from "@lib/prisma";

export const getActivity = async (id: string) => {
  const activity = await prisma.activity.findUnique({
    where: { id },
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

  return activity;
};

export type Activity = Awaited<ReturnType<typeof getActivity>>;
