import { Category, PrismaClient } from "@prisma/client";
import data from "../export.json" assert { type: "json" };

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // Insert categories
  for (const category of data.categories) {
    await prisma.category.create({
      data: {
        id: category.id, // Preserving original IDs (optional)
        title: category.title,
        description: category.description,
      },
    });
  }

  // Insert activities
  for (const activity of data.activities) {
    await prisma.activity.create({
      data: {
        id: activity.id,
        title: activity.title,
        description: activity.description,
        category: {
          connect: activity.category.map((cat: Category) => ({ id: cat.id })),
        },
      },
    });
  }

  // Insert media
  for (const media of data.media) {
    await prisma.media.create({
      data: {
        id: media.id,
        title: media.title,
        url: media.url,
        activityId: media.activityId,
        categoryId: media.categoryId,
      },
    });
  }

  console.log("✅ Seed complete.");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
