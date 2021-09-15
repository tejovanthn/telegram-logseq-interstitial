
import restify from "restify"
import { updateFile } from "./updateFile.js"

export default ({ slimbot, api }) => {
  let server = restify.createServer();
  server.use(restify.plugins.bodyParser());

  if (slimbot.getWebhookInfo()) {
    slimbot.deleteWebhook();
  }
  slimbot.setWebhook(`${process.env.HEROKU_WEBHOOK_URL}/bot_updates`)
  console.log(slimbot.getWebhookInfo());

  let recent_id = -1

  server.post('/bot_updates', (req, res) => {
    let { message } = req.body;
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
}