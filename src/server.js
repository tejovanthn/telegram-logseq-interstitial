
import restify from "restify"
import { updateFile } from "./updateFile.js"
import { getFileName, getTimeStamp } from "./utils.js"

export default (slimbot) => {
  let server = restify.createServer();
  server.use(restify.plugins.bodyParser());

  slimbot.setWebhook(`${process.env.HEROKU_WEBHOOK_URL}/bot_updates`)
  console.log(slimbot.getWebhookInfo());

  server.post('/bot_updates', (req, res) => {
    let { message } = req.body;
    updateFile(getFileName(message.date), `${getTimeStamp(message.date)} ${message.text}`)
      .then(() => slimbot.sendMessage(message.chat.id, 'Message saved'))
      .catch(error => { slimbot.sendMessage(message.chat.id, JSON.stringify(error)) });
  });

  server.listen(process.env.PORT || 3000);
}