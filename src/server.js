
import restify from "restify"
import { updateFile } from "./updateFile.js"

const setupWebhooks = async () => {
  const connection = await slimbot.getWebhookInfo()
  if (connection) {
    await slimbot.deleteWebhook()
  }
  await slimbot.setWebhook(`${process.env.HEROKU_WEBHOOK_URL}/bot_updates`)
}

export default ({ slimbot, api }) => {
  let server = restify.createServer();
  server.use(restify.plugins.bodyParser());
  let recent_id = -1

  setupWebhooks()
    .then(() => {
      server.post('/bot_updates', (req, res) => {
        let { message } = req.body;
        console.log(message.date, recent_id, message.message_id)
        if (message.date > recent_id) {
          updateFile({ api, message })
            .then(() => slimbot.sendMessage(message.chat.id, 'Message saved'))
            .catch(error => { slimbot.sendMessage(message.chat.id, JSON.stringify(error)) });
          recent_id = message.date
        }
        else {
          console.warn(`retriggered on ${recent_id}`)
        }
      });

      server.listen(process.env.PORT || 3000);
    })
    .catch(console.error)
}