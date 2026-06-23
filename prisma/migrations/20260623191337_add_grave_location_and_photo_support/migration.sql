-- AlterTable
ALTER TABLE "MortuaryRegisterEntry" ADD COLUMN     "gpsAccuracy" DECIMAL(10,2),
ADD COLUMN     "gpsCapturedAt" TIMESTAMP(3),
ADD COLUMN     "graveLatitude" DECIMAL(10,7),
ADD COLUMN     "graveLongitude" DECIMAL(10,7),
ADD COLUMN     "gravePhotoCapturedAt" TIMESTAMP(3),
ADD COLUMN     "gravePhotoPublicId" TEXT,
ADD COLUMN     "gravePhotoUrl" TEXT;
