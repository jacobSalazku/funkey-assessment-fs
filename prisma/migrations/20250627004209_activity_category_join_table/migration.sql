/*
  Warnings:

  - You are about to drop the `_ActivityToCategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ActivityToCategory" DROP CONSTRAINT "_ActivityToCategory_A_fkey";

-- DropForeignKey
ALTER TABLE "_ActivityToCategory" DROP CONSTRAINT "_ActivityToCategory_B_fkey";

-- DropTable
DROP TABLE "_ActivityToCategory";

-- CreateTable
CREATE TABLE "_ActivityCategories" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ActivityCategories_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ActivityCategories_B_index" ON "_ActivityCategories"("B");

-- AddForeignKey
ALTER TABLE "_ActivityCategories" ADD CONSTRAINT "_ActivityCategories_A_fkey" FOREIGN KEY ("A") REFERENCES "Activity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActivityCategories" ADD CONSTRAINT "_ActivityCategories_B_fkey" FOREIGN KEY ("B") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
