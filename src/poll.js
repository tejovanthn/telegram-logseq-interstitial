import { updateFile } from "./updateFile.js"

export default ({ slimbot, api }) => {
  slimbot.deleteWebhook();
  slimbot.on('message', message => {
    updateFile({ api, message })
      .then(() => slimbot.sendMessage(message.chat.id, 'Message saved'))
      .catch(error => { slimbot.sendMessage(message.chat.id, JSON.stringify(error)) });
  });

  slimbot.startPolling();
}