/*
  Warnings:

  - You are about to drop the column `commentId` on the `Comment` table. All the data in the column will be lost.
  - Added the required column `commentId` to the `NestedComment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pictureId` to the `NestedComment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `NestedComment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_commentId_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "commentId";

-- AlterTable
ALTER TABLE "NestedComment" ADD COLUMN     "commentId" INTEGER NOT NULL,
ADD COLUMN     "pictureId" INTEGER NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "LikeNestCom" (
    "userId" INTEGER NOT NULL,
    "nestedCommentId" INTEGER NOT NULL,

    CONSTRAINT "LikeNestCom_pkey" PRIMARY KEY ("userId","nestedCommentId")
);

-- AddForeignKey
ALTER TABLE "NestedComment" ADD CONSTRAINT "NestedComment_pictureId_fkey" FOREIGN KEY ("pictureId") REFERENCES "Picture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NestedComment" ADD CONSTRAINT "NestedComment_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NestedComment" ADD CONSTRAINT "NestedComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikeNestCom" ADD CONSTRAINT "LikeNestCom_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikeNestCom" ADD CONSTRAINT "LikeNestCom_nestedCommentId_fkey" FOREIGN KEY ("nestedCommentId") REFERENCES "NestedComment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
