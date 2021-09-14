import Slimbot from "slimbot"
import dotenv from "dotenv"
dotenv.config()

import createServer from "./server.js";
import createPoller from "./poll.js";

const slimbot = new Slimbot(process.env.TELEGRAM_BOT_ID || "");


if (process.env.NODE_ENV === "production") {
  createServer(slimbot)
} else {
  createPoller(slimbot)
}
