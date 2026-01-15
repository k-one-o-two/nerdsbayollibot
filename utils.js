import { settings } from "./settings.js";
import TelegramBot from "node-telegram-bot-api";

const createBot = () => {
  const bot = new TelegramBot(settings.token, {
    polling: {
      params: {
        timeout: 30,
        limit: 100,
        drop_pending_updates: true,
      },
      autoStart: true,
    },
    webHook: { autoOpen: false },
  });
  console.info("Started");
  return bot;
};

const isInAdminGroup = (msg) => msg.chat.id.toString() === settings.adminGroup;

export const utils = { createBot, isInAdminGroup };
