import Slimbot from "slimbot"
import { Gitlab } from '@gitbeaker/node'
import dayjs from "dayjs"
import dotenv from "dotenv"
dotenv.config()

const slimbot = new Slimbot(process.env.TELEGRAM_BOT_ID || "");

const api = new Gitlab({
  token: process.env.GITLAB_TOKEN || "",
});

const updateFile = async (file, contentToAdd) => {
  console.log(file, contentToAdd)
  let content
  try {
    content = await api.RepositoryFiles.showRaw(process.env.GITLAB_PROJECT_ID, file, process.env.GITLAB_BRANCH || "master")
    content = content + `\t- ${contentToAdd}\n`
    await api.RepositoryFiles.edit(process.env.GITLAB_PROJECT_ID, file, process.env.GITLAB_BRANCH || "master", content, "auto commit from interstitial")
  } catch (e) {
    console.error(e)
  }
  return content
}

const getFileName = (dateInt) => `journals/${dayjs(dateInt * 1000).format("YYYY_MM_DD")}.md`

const getTimeStamp = (dateInt) => dayjs(dateInt * 1000).format("HH:mm")

slimbot.on('message', message => {
  updateFile(getFileName(message.date), `${getTimeStamp(message.date)} ${message.text}`)
    .then(() => slimbot.sendMessage(message.chat.id, 'Message saved'))
    .catch(err => { slimbot.sendMessage(message.chat.id, JSON.stringify(error)) });
});

if (process.env.NODE_ENV === "production") {
  slimbot.setWebhook(`${process.env.HEROKU_WEBHOOK_URL}${process.env.TELEGRAM_BOT_ID}`)
} else {
  slimbot.startPolling();
}
