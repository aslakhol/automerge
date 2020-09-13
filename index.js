const core = require("@actions/core");
const github = require("@actions/github");

try {
  const pullRequest = github.context.payload["pull_request"];
  const pr_id = pullRequest.node_id;

  console.log(`pr id: ${pr_id}`);

  const repoToken = core.getInput("repo-token");
  const octokit = github.getOctokit(repoToken);

  octokit
    .graphql(
      `
      mutation {
        mergePullRequest(input: {pullRequestId: ${pr_id}}) {
          clientMutationId
        }
      }
    `
    )
    .catch((err) => {
      core.error(err);
      core.setFailed(err.message);
    });
} catch (error) {
  core.setFailed(error.message);
}
