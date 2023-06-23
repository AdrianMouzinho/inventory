-- CreateTable
CREATE TABLE "equipments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "employee" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "characteristics" TEXT NOT NULL,
    "receivedAt" DATETIME NOT NULL,
    "formattedAt" DATETIME
);

-- CreateIndex
CREATE UNIQUE INDEX "equipments_code_key" ON "equipments"("code");

-- CreateIndex
CREATE INDEX "equipments_code_idx" ON "equipments"("code");
