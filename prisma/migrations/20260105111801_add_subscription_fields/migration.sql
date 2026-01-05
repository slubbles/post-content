-- AlterTable
ALTER TABLE "User" ADD COLUMN     "subscribed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "subscriptionEndsAt" TIMESTAMP(3),
ADD COLUMN     "subscriptionId" TEXT,
ADD COLUMN     "subscriptionStatus" TEXT;
