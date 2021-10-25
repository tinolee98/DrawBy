/*
  Warnings:

  - A unique constraint covering the columns `[genreName]` on the table `Genre` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[hashtagName]` on the table `Hashtag` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Genre_genreName_key" ON "Genre"("genreName");

-- CreateIndex
CREATE UNIQUE INDEX "Hashtag_hashtagName_key" ON "Hashtag"("hashtagName");
