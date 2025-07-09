-- CreateTable
CREATE TABLE "Musician" (
    "ID" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Musician_pkey" PRIMARY KEY ("ID")
);
