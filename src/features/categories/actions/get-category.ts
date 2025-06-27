import prisma from "@lib/prisma";

export const getCategory = async (id: string) => {
  const category = await prisma.category.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      description: true,
      media: true,
      activities: true,
    },
  });

  return category;
};

export type Category = Awaited<ReturnType<typeof getCategory>>;
