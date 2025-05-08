/*
  Warnings:

  - You are about to drop the column `pdfName` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `specPdf` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "pdfName",
DROP COLUMN "specPdf";
