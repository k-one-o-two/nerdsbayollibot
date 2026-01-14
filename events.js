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

      await bot.sendMessage(original.chat.id, msg.text, {
        reply_to_message_id: original.message_id,
      });
    } else {
      // forward from user to admins
      bot.forwardMessage(settings.adminGroup, msg.chat.id, msg.message_id);
    }
  });
};
