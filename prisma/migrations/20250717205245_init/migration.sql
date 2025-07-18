/*
  Warnings:

  - The primary key for the `Commande` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Date` on the `Commande` table. All the data in the column will be lost.
  - You are about to drop the column `adresse` on the `Commande` table. All the data in the column will be lost.
  - You are about to drop the column `emballage` on the `Commande` table. All the data in the column will be lost.
  - You are about to drop the column `mail` on the `Commande` table. All the data in the column will be lost.
  - You are about to drop the column `nom` on the `Commande` table. All the data in the column will be lost.
  - You are about to drop the column `num` on the `Commande` table. All the data in the column will be lost.
  - You are about to drop the column `prenom` on the `Commande` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `Commande` table. All the data in the column will be lost.
  - You are about to drop the column `quantite` on the `Commande` table. All the data in the column will be lost.
  - You are about to drop the column `region` on the `Commande` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Commande` table. All the data in the column will be lost.
  - You are about to drop the `Emballage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Farm` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `address` to the `Commande` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `Commande` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Commande` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Commande` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Commande` table without a default value. This is not possible if the table is not empty.
  - Added the required column `service` to the `Commande` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `Commande` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Commande` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Commande" DROP CONSTRAINT "Commande_productId_fkey";

-- DropForeignKey
ALTER TABLE "Emballage" DROP CONSTRAINT "Emballage_productId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_farmId_fkey";

-- AlterTable
ALTER TABLE "Commande" DROP CONSTRAINT "Commande_pkey",
DROP COLUMN "Date",
DROP COLUMN "adresse",
DROP COLUMN "emballage",
DROP COLUMN "mail",
DROP COLUMN "nom",
DROP COLUMN "num",
DROP COLUMN "prenom",
DROP COLUMN "productId",
DROP COLUMN "quantite",
DROP COLUMN "region",
DROP COLUMN "status",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "message" TEXT,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "service" TEXT NOT NULL,
ADD COLUMN     "time" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Commande_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Commande_id_seq";

-- DropTable
DROP TABLE "Emballage";

-- DropTable
DROP TABLE "Farm";

-- DropTable
DROP TABLE "Product";
