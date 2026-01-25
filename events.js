import { utils } from "./utils.js";
import { settings } from "./settings.js";
import { getCollections } from "./db.js";

const commonHandler = async (bot, msg) => {
  const collections = await getCollections();
  if (utils.isInAdminGroup(msg)) {
    const original = msg.reply_to_message;

    if (!original) {
      return;
    }

    if (Number(original.from.id) !== Number(settings.botId)) {
      // not from bot
      return;
    }

    const lookupId = msg.reply_to_message.message_id;

    const foundUser = await collections.id_pairs.findOne({
      message_id: lookupId,
    });
    if (foundUser) {
      if (msg.photo) {
        bot.sendPhoto(foundUser.user_id, msg.photo.at(-1).file_id, {
          caption: msg.caption || "BR, Olli",
        });
      } else {
        await bot.sendMessage(foundUser.user_id, msg.text || "BR, Olli");
      }
    }
  } else {
    const newMessage = await bot.forwardMessage(
      settings.adminGroup,
      msg.chat.id,
      msg.message_id,
    );

    await collections.id_pairs.insertOne({
      user_id: msg.from.id,
      message_id: newMessage.message_id,
    });

    const counter = await collections.counters.findOne({
      user_id: msg.from.id,
    });
    if (!counter) {
      await collections.counters.insertOne({
        user_id: msg.from.id,
        username: msg.from.username,
        first_name: msg.from.first_name,
        count: 1,
      });
    } else {
      await collections.counters.updateOne(
        { user_id: msg.from.id },
        { $inc: { count: 1 } },
      );
    }
  }
};

export const setupBotEvents = (bot) => {
  bot.onText(/get_stat/i, async (msg) => {
    if (!utils.isInAdminGroup(msg)) {
      return;
    }

    const collections = await getCollections();
    const counters = await collections.counters.find({}).toArray();
    const message = counters
      .map((counter) => {
        return `@${counter.username} (${counter.first_name}): ${counter.count} messages`;
      })
      .join("\n");
    await bot.sendMessage(settings.adminGroup, message);
  });

  bot.on("text", (msg) => commonHandler(bot, msg));
  bot.on("photo", (msg) => commonHandler(bot, msg));
};
