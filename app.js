import { setupBotEvents } from "./events.js";
import { utils } from "./utils.js";
// import { settings } from "./settings.js";

// import { getCollections, init } from "./db.js";

const bot = utils.createBot();
setupBotEvents(bot);
