-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "email" TEXT NOT NULL,
    "clerkId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "JournalEntry" (
    "id" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "content" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "JournalEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Analyse" (
    "id" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "subject" TEXT NOT NULL,
    "mood" TEXT NOT NULL,
    "negative" BOOLEAN NOT NULL DEFAULT false,
    "summary" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "sentimateScore" REAL NOT NULL DEFAULT 0,
    "entryId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Analyse_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "JournalEntry" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Analyse_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "JournalEntry_id_key" ON "JournalEntry"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Analyse_id_key" ON "Analyse"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Analyse_id_entryId_key" ON "Analyse"("id", "entryId");
