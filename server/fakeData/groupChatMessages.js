import { faker } from "@faker-js/faker";
import { Message } from "../model/messageModel.js";
import { GroupChat } from "../model/groupChatModel.js";

const generateGroupChatMessages = async (groupChatId) => {
  try {
    const messages = [];
    const group = await GroupChat.findById(groupChatId)
    const userId = group.participants
    const randomUser = userId[Math.floor(Math.random() * userId.length)];
    for (let i = 0; i < 10; i++) {
      messages.push({
        sender: randomUser._id,
        content: faker.lorem.sentence(),
        chatId: groupChatId,
        chatType: "GroupChat",
      });
    }
    await Message.insertMany(messages);
    console.log('created')
    process.exit(1);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
export { generateGroupChatMessages };