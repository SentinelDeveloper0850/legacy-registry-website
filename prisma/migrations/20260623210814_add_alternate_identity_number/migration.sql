-- AlterTable
ALTER TABLE "MortuaryRegisterEntry" ADD COLUMN     "alternateIdNumber" TEXT;

-- CreateIndex
CREATE INDEX "MortuaryRegisterEntry_alternateIdNumber_idx" ON "MortuaryRegisterEntry"("alternateIdNumber");
