import{ faker }from "@faker-js/faker";
import { User } from "../model/userModel.js";
import bcrypt from "bcrypt";

const generateUser = async (usersNum) => {

  try {
    const users = [];
    const hashedPassword = await bcrypt.hash("Password@123", 10);
    for (let i = 0; i < usersNum; i++) {
      users.push({
        username: faker.internet.username(),
        email: faker.internet.email(),
        password: hashedPassword,
        avatar: faker.image.avatar(),
      });
    }
    await User.insertMany(users);
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export { generateUser };
