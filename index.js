const core = require("@actions/core");
const github = require("@actions/github");

try {
  const repoToken = core.getInput("repo-token");
  const octokit = github.getOctokit(repoToken);
  const pullRequest = github.context.payload["pull_request"];
  const pr_id = pullRequest.node_id;

  octokit
    .graphql(
      `
      mutation {
        mergePullRequest(input: {pullRequestId: "${pr_id}"}) {
          clientMutationId
        }
      }
    `
    )
    .catch((error) => {
      core.error(error);
      core.setFailed(error.message);
    });
} catch (error) {
  core.error(error);
  core.setFailed(error.message);
}
