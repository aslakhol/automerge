const core = require("@actions/core");
const github = require("@actions/github");

try {
  console.log(`automerge action log`);
  const pullRequest = github.context.payload["pull_request"];
  const base = pullRequest.base.ref;
  const head = pullRequest.head.ref;
  const repo_id = github.context.payload["repository"].node_id;
  const pr_id = pullRequest.node_id;

  console.log(`repo id: ${repo_id}`);
  console.log(`pr id: ${pr_id}`);
  console.log(`head: ${head}`);
  console.log(`base: ${base}`);

  // console.log(github.context.payload);

  const myToken = core.getInput("myToken");

  const octokit = github.getOctokit(myToken);

  octokit.graphql(
    `
      mutation {
        mergePullRequest(input: {pullRequestId: ${pr_id}}) {
          clientMutationId
        }
    `
  );
} catch (error) {
  core.setFailed(error.message);
}
