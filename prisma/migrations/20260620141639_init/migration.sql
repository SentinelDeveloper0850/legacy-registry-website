-- CreateEnum
CREATE TYPE "BurialType" AS ENUM ('BURIAL', 'CREMATION', 'ASH_INTERMENT', 'MEMORIAL_ONLY');

-- CreateTable
CREATE TABLE "Cemetery" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "municipality" TEXT,
    "province" TEXT,
    "address" TEXT,
    "latitude" DECIMAL(10,7),
    "longitude" DECIMAL(10,7),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cemetery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GraveRecord" (
    "id" TEXT NOT NULL,
    "cemeteryId" TEXT NOT NULL,
    "firstNames" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3),
    "dateOfDeath" TIMESTAMP(3),
    "dateOfBurial" TIMESTAMP(3),
    "burialType" "BurialType" NOT NULL DEFAULT 'BURIAL',
    "cemeteryBlock" TEXT,
    "rowNumber" TEXT,
    "graveNumber" TEXT,
    "latitude" DECIMAL(10,7),
    "longitude" DECIMAL(10,7),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GraveRecord_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Cemetery_name_idx" ON "Cemetery"("name");

-- CreateIndex
CREATE INDEX "GraveRecord_firstNames_idx" ON "GraveRecord"("firstNames");

-- CreateIndex
CREATE INDEX "GraveRecord_lastName_idx" ON "GraveRecord"("lastName");

-- CreateIndex
CREATE INDEX "GraveRecord_fullName_idx" ON "GraveRecord"("fullName");

-- CreateIndex
CREATE INDEX "GraveRecord_cemeteryId_idx" ON "GraveRecord"("cemeteryId");

-- CreateIndex
CREATE INDEX "GraveRecord_cemeteryBlock_idx" ON "GraveRecord"("cemeteryBlock");

-- AddForeignKey
ALTER TABLE "GraveRecord" ADD CONSTRAINT "GraveRecord_cemeteryId_fkey" FOREIGN KEY ("cemeteryId") REFERENCES "Cemetery"("id") ON DELETE CASCADE ON UPDATE CASCADE;
