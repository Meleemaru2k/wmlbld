/*
  Warnings:

  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL DEFAULT '',
    "isCreator" BOOLEAN NOT NULL DEFAULT false,
    "authenticationCode" TEXT,
    "isAuthenticated" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_User" ("authenticationCode", "email", "id", "isAuthenticated", "isCreator", "name") SELECT "authenticationCode", "email", "id", "isAuthenticated", "isCreator", "name" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
