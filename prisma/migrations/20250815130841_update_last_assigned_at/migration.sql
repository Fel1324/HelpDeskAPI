/*
  Warnings:

  - Made the column `last_assigned_at` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "last_assigned_at" SET NOT NULL,
ALTER COLUMN "last_assigned_at" SET DEFAULT CURRENT_TIMESTAMP;
