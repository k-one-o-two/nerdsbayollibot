import { setupBotEvents } from "./events.js";
import { utils } from "./utils.js";
import { init } from "./db.js";

await init();

const bot = utils.createBot();
setupBotEvents(bot);
