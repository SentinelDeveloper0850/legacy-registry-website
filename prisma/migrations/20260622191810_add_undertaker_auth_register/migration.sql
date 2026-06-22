-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('UNDERTAKER_ADMIN', 'UNDERTAKER_USER', 'REGISTRY_ADMIN');

-- CreateTable
CREATE TABLE "Undertaker" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tradingName" TEXT,
    "branchName" TEXT,
    "contactEmail" TEXT,
    "contactPhone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Undertaker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "undertakerId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'UNDERTAKER_USER',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MortuaryRegisterEntry" (
    "id" TEXT NOT NULL,
    "undertakerId" TEXT NOT NULL,
    "createdByUserId" TEXT NOT NULL,
    "updatedByUserId" TEXT,
    "bodyNumber" TEXT NOT NULL,
    "firstNames" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "idNumber" TEXT,
    "dateReceivedAtMortuary" TIMESTAMP(3),
    "dateReleasedFromMortuary" TIMESTAMP(3),
    "timeReleasedFromMortuary" TEXT,
    "driverName" TEXT,
    "coffinType" TEXT,
    "cemeteryId" TEXT,
    "cemeteryBlockId" TEXT,
    "graveNumber" TEXT,
    "publishToRegistry" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MortuaryRegisterEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Undertaker_name_idx" ON "Undertaker"("name");

-- CreateIndex
CREATE INDEX "Undertaker_tradingName_idx" ON "Undertaker"("tradingName");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_undertakerId_idx" ON "User"("undertakerId");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "User"("role");

-- CreateIndex
CREATE INDEX "MortuaryRegisterEntry_undertakerId_idx" ON "MortuaryRegisterEntry"("undertakerId");

-- CreateIndex
CREATE INDEX "MortuaryRegisterEntry_createdByUserId_idx" ON "MortuaryRegisterEntry"("createdByUserId");

-- CreateIndex
CREATE INDEX "MortuaryRegisterEntry_cemeteryId_idx" ON "MortuaryRegisterEntry"("cemeteryId");

-- CreateIndex
CREATE INDEX "MortuaryRegisterEntry_cemeteryBlockId_idx" ON "MortuaryRegisterEntry"("cemeteryBlockId");

-- CreateIndex
CREATE INDEX "MortuaryRegisterEntry_fullName_idx" ON "MortuaryRegisterEntry"("fullName");

-- CreateIndex
CREATE INDEX "MortuaryRegisterEntry_idNumber_idx" ON "MortuaryRegisterEntry"("idNumber");

-- CreateIndex
CREATE INDEX "MortuaryRegisterEntry_publishToRegistry_idx" ON "MortuaryRegisterEntry"("publishToRegistry");

-- CreateIndex
CREATE UNIQUE INDEX "MortuaryRegisterEntry_undertakerId_bodyNumber_key" ON "MortuaryRegisterEntry"("undertakerId", "bodyNumber");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_undertakerId_fkey" FOREIGN KEY ("undertakerId") REFERENCES "Undertaker"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MortuaryRegisterEntry" ADD CONSTRAINT "MortuaryRegisterEntry_undertakerId_fkey" FOREIGN KEY ("undertakerId") REFERENCES "Undertaker"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MortuaryRegisterEntry" ADD CONSTRAINT "MortuaryRegisterEntry_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MortuaryRegisterEntry" ADD CONSTRAINT "MortuaryRegisterEntry_updatedByUserId_fkey" FOREIGN KEY ("updatedByUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MortuaryRegisterEntry" ADD CONSTRAINT "MortuaryRegisterEntry_cemeteryId_fkey" FOREIGN KEY ("cemeteryId") REFERENCES "Cemetery"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MortuaryRegisterEntry" ADD CONSTRAINT "MortuaryRegisterEntry_cemeteryBlockId_fkey" FOREIGN KEY ("cemeteryBlockId") REFERENCES "CemeteryBlock"("id") ON DELETE SET NULL ON UPDATE CASCADE;
