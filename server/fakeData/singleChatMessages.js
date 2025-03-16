import {faker} from "@faker-js/faker";
import { Message } from "../model/messageModel.js";
import { IndividualChat } from "../model/singleChatModel.js";

const generateSingleChatMessages = async (chatId) => {
    try {
        const messages = [];
        const users =await IndividualChat.findById(chatId);
        const userId = users.participants[1];

        for (let i = 0; i < 2; i++) {
            messages.push({
                sender: userId,
                content: faker.lorem.sentence(),
                chatId: chatId,
                chatType: "IndividualChat",
            });
        }
        await Message.insertMany(messages);
        console.log("created");
        process.exit(1);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

export { generateSingleChatMessages };