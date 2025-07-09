-- CreateTable
CREATE TABLE "Gig" (
    "ID" SERIAL NOT NULL,
    "orgID" INTEGER NOT NULL,
    "duration" TEXT NOT NULL,
    "gigType" TEXT NOT NULL,
    "musicianTypeNeeded" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Gig_pkey" PRIMARY KEY ("ID")
);

-- AddForeignKey
ALTER TABLE "Gig" ADD CONSTRAINT "Gig_orgID_fkey" FOREIGN KEY ("orgID") REFERENCES "Organization"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;
