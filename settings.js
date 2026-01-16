import dotenv from "dotenv";
dotenv.config();

export const settings = {
  token: process.env.TOKEN,
  adminGroup: process.env.ADMIN_GROUP_ID,
  uri: process.env.URI,
  botId: process.env.BOT_ID,
};
