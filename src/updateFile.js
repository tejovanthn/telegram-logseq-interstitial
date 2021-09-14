import { getFileName, getTimeStamp } from "./utils.js"

export const updateFile = async ({ api, message }) => {
  const file = getFileName(message.date)
  const contentToAdd = `${getTimeStamp(message.date)} ${message.text}`
  let content;
  try {
    content = await api.RepositoryFiles.showRaw('29570777', 'journals/2021_09_14.md', "master");
    if (!content.endsWith("\n")) {
      content = content + `\n`
    }
    content = content + `\t- ${contentToAdd}\n`;
    await api.RepositoryFiles.edit(process.env.GITLAB_PROJECT_ID, file, process.env.GITLAB_BRANCH || "master", content, "auto commit from interstitial");
  } catch (e) {
    console.error(e);
  }
  return content;
};
