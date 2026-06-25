CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "university" TEXT NOT NULL,
    "course" TEXT NOT NULL,
    "semester" TEXT NOT NULL,
    "avatarUrl" TEXT,
    "bio" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "HousingProfile" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "cleanlinessLevel" INTEGER NOT NULL,
    "noiseToleranceLevel" INTEGER NOT NULL,
    "socialLevel" INTEGER NOT NULL,
    "sleepTime" TEXT NOT NULL,
    "wakeTime" TEXT NOT NULL,
    "studyRoutine" TEXT NOT NULL,
    "acceptsPets" BOOLEAN NOT NULL,
    "hasPets" BOOLEAN NOT NULL,
    "budgetMin" DOUBLE PRECISION NOT NULL,
    "budgetMax" DOUBLE PRECISION NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HousingProfile_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

CREATE UNIQUE INDEX "HousingProfile_userId_key" ON "HousingProfile"("userId");

ALTER TABLE "HousingProfile" ADD CONSTRAINT "HousingProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
