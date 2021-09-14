import Slimbot from "slimbot"
import { Gitlab } from '@gitbeaker/node'

import dotenv from "dotenv"
dotenv.config()

import createServer from "./server.js";
import createPoller from "./poll.js";

const slimbot = new Slimbot(process.env.TELEGRAM_BOT_ID || "");

const api = new Gitlab({
  token: process.env.GITLAB_TOKEN || "",
});



if (process.env.NODE_ENV === "production") {
  createServer({ slimbot, api })
} else {
  createPoller({ slimbot, api })
}
