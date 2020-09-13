const core = require("@actions/core");
const github = require("@actions/github");

try {
  const repoToken = core.getInput("repo-token");
  const octokit = github.getOctokit(repoToken);
  const pullRequest = github.context.payload["pull_request"];
  const pr_id = pullRequest.node_id;
  const ref_id = pullRequest.ref_id;

  octokit
    .graphql(
      `
      mutation {
        mergePullRequest(input: {pullRequestId: "${pr_id}"}) {
          clientMutationId
        }
        deleteRef(input: {refId: "${ref_id}"})
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
