-- DropForeignKey
ALTER TABLE "ReadMessage" DROP CONSTRAINT "ReadMessage_messageId_fkey";

-- DropForeignKey
ALTER TABLE "ReadMessage" DROP CONSTRAINT "ReadMessage_userId_fkey";

-- AddForeignKey
ALTER TABLE "ReadMessage" ADD CONSTRAINT "ReadMessage_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Message"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadMessage" ADD CONSTRAINT "ReadMessage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
