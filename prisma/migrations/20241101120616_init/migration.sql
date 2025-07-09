/*
  Warnings:

  - You are about to drop the column `username` on the `Musician` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Musician` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `areaOfExpertise` to the `Musician` table without a default value. This is not possible if the table is not empty.
  - Added the required column `avatarUrl` to the `Musician` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Musician` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullName` to the `Musician` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Musician` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Musician` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Musician" DROP COLUMN "username",
ADD COLUMN     "areaOfExpertise" TEXT NOT NULL,
ADD COLUMN     "avatarUrl" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "fullName" TEXT NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userType" TEXT NOT NULL DEFAULT 'musician';

-- CreateTable
CREATE TABLE "Organization" (
    "ID" SERIAL NOT NULL,
    "orgName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "avatarUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userType" TEXT NOT NULL DEFAULT 'organization',

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("ID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Organization_orgName_key" ON "Organization"("orgName");

-- CreateIndex
CREATE UNIQUE INDEX "Organization_email_key" ON "Organization"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Musician_email_key" ON "Musician"("email");
