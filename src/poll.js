import { updateFile } from "./updateFile.js"
import { getFileName, getTimeStamp } from "./utils.js"

export default (slimbot) => {
  slimbot.deleteWebhook();
  slimbot.on('message', message => {
    updateFile(getFileName(message.date), `${getTimeStamp(message.date)} ${message.text}`)
    // .then(() => slimbot.sendMessage(message.chat.id, 'Message saved'))
    // .catch(error => { slimbot.sendMessage(message.chat.id, JSON.stringify(error)) });
  });

  slimbot.startPolling();
}