import { Gitlab } from '@gitbeaker/node'

const api = new Gitlab({
  token: process.env.GITLAB_TOKEN || "",
});

export const updateFile = async (file, contentToAdd) => {
  console.log(file, contentToAdd);
  let content;
  try {
    content = await api.RepositoryFiles.show('29570777', 'journals/2021_09_14.md', "master");
    console.log(content)
    // content = content + `\t- ${contentToAdd}\n`;
    // await api.RepositoryFiles.edit(process.env.GITLAB_PROJECT_ID, file, process.env.GITLAB_BRANCH || "master", content, "auto commit from interstitial");
  } catch (e) {
    console.error(e);
  }
  return content;
};
