/*
  Warnings:

  - You are about to drop the column `cemeteryBlock` on the `GraveRecord` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "GraveRecord_cemeteryBlock_idx";

-- AlterTable
ALTER TABLE "GraveRecord" DROP COLUMN "cemeteryBlock",
ADD COLUMN     "cemeteryBlockId" TEXT;

-- CreateTable
CREATE TABLE "CemeteryBlock" (
    "id" TEXT NOT NULL,
    "cemeteryId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "capacity" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CemeteryBlock_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CemeteryBlock_cemeteryId_idx" ON "CemeteryBlock"("cemeteryId");

-- CreateIndex
CREATE INDEX "CemeteryBlock_name_idx" ON "CemeteryBlock"("name");

-- CreateIndex
CREATE UNIQUE INDEX "CemeteryBlock_cemeteryId_name_key" ON "CemeteryBlock"("cemeteryId", "name");

-- CreateIndex
CREATE INDEX "Cemetery_municipality_idx" ON "Cemetery"("municipality");

-- CreateIndex
CREATE INDEX "Cemetery_province_idx" ON "Cemetery"("province");

-- CreateIndex
CREATE INDEX "GraveRecord_cemeteryBlockId_idx" ON "GraveRecord"("cemeteryBlockId");

-- CreateIndex
CREATE INDEX "GraveRecord_dateOfBurial_idx" ON "GraveRecord"("dateOfBurial");

-- CreateIndex
CREATE INDEX "GraveRecord_burialType_idx" ON "GraveRecord"("burialType");

-- AddForeignKey
ALTER TABLE "CemeteryBlock" ADD CONSTRAINT "CemeteryBlock_cemeteryId_fkey" FOREIGN KEY ("cemeteryId") REFERENCES "Cemetery"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GraveRecord" ADD CONSTRAINT "GraveRecord_cemeteryBlockId_fkey" FOREIGN KEY ("cemeteryBlockId") REFERENCES "CemeteryBlock"("id") ON DELETE SET NULL ON UPDATE CASCADE;
