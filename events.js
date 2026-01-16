import { utils } from "./utils.js";
import { settings } from "./settings.js";

export const setupBotEvents = (bot) => {
  bot.on("text", async (msg) => {
    if (utils.isInAdminGroup(msg)) {
      // admins reply
      const original = msg.reply_to_message;

      if (!original) {
        await bot.sendMessage(msg.chat.id, "Please reply to a message.");
        return;
      }

      console.info(msg.reply_to_message.from, msg.reply_to_message.forward_origin)
      const originalUser = msg.reply_to_message.forward_origin.sender_user.id

      await bot.sendMessage(originalUser, msg.text);
    } else {
      // forward from user to admins
      bot.forwardMessage(settings.adminGroup, msg.chat.id, msg.message_id);
    }
  });
};
