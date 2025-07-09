/*
  Warnings:

  - You are about to drop the column `gigLocation` on the `Gig` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Musician` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Organization` table. All the data in the column will be lost.
  - Added the required column `latitude` to the `Gig` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationName` to the `Gig` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `Gig` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latitude` to the `Musician` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationName` to the `Musician` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `Musician` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latitude` to the `Organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationName` to the `Organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `Organization` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Gig" DROP COLUMN "gigLocation",
ADD COLUMN     "latitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "locationName" TEXT NOT NULL,
ADD COLUMN     "longitude" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Musician" DROP COLUMN "location",
ADD COLUMN     "latitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "locationName" TEXT NOT NULL,
ADD COLUMN     "longitude" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Organization" DROP COLUMN "location",
ADD COLUMN     "latitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "locationName" TEXT NOT NULL,
ADD COLUMN     "longitude" DOUBLE PRECISION NOT NULL;
