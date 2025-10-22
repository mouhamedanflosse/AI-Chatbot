-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "fullname" TEXT NOT NULL,
    "clerkId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Billings" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "plan" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" UUID,

    CONSTRAINT "Billings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Domain" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "userId" UUID,

    CONSTRAINT "Domain_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatBot" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "welcomeMessage" TEXT,
    "icon" TEXT,
    "domainId" UUID,

    CONSTRAINT "ChatBot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HelpDesk" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "domainId" UUID,

    CONSTRAINT "HelpDesk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FilterQuestions" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "question" TEXT NOT NULL,
    "answer" TEXT,
    "answered" TEXT,
    "domainId" UUID,

    CONSTRAINT "FilterQuestions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkId_key" ON "User"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "Billings_userId_key" ON "Billings"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ChatBot_domainId_key" ON "ChatBot"("domainId");

-- CreateIndex
CREATE UNIQUE INDEX "HelpDesk_domainId_key" ON "HelpDesk"("domainId");

-- AddForeignKey
ALTER TABLE "Billings" ADD CONSTRAINT "Billings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Domain" ADD CONSTRAINT "Domain_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatBot" ADD CONSTRAINT "ChatBot_domainId_fkey" FOREIGN KEY ("domainId") REFERENCES "Domain"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HelpDesk" ADD CONSTRAINT "HelpDesk_domainId_fkey" FOREIGN KEY ("domainId") REFERENCES "Domain"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FilterQuestions" ADD CONSTRAINT "FilterQuestions_domainId_fkey" FOREIGN KEY ("domainId") REFERENCES "Domain"("id") ON DELETE CASCADE ON UPDATE CASCADE;
