const core = require("@actions/core");
const github = require("@actions/github");

try {
  console.log(`automerge action log`);
  const pullRequest = github.context.payload["pull_request"];
  // console.log(pullRequest);

  const main_branch = pullRequest.main_branch;
  const head = pullRequest.head;

  const id = github.context.payload["repository"].id;

  console.log(id, head, main_branch);
} catch (error) {
  core.setFailed(error.message);
}
