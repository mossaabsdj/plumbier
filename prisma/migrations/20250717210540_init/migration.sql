/*
  Warnings:

  - The primary key for the `Commande` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `updatedAt` on the `Commande` table. All the data in the column will be lost.
  - The `id` column on the `Commande` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Commande" DROP CONSTRAINT "Commande_pkey",
DROP COLUMN "updatedAt",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "date" DROP NOT NULL,
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "time" DROP NOT NULL,
ADD CONSTRAINT "Commande_pkey" PRIMARY KEY ("id");
