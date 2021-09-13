# Interstitial Journaling on LogSeq with Telegram (on GitLab)


Use BotFather on Telegram to get a bot id (TELEGRAM_BOT_ID)

On GitLab, create a token with API access. (GITLAB_TOKEN)
Collect the GitLab project ID from the UI (GITLAB_PROJECT_ID)

Create a heroku app, and the project URL (HEROKU_WEBHOOK_URL)

Set the above keys in a .env file in the project root. This defaults to the master branch, but you can chnage it with GITLAB_BRANCH key.