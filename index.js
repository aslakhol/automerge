const core = require("@actions/core");
const github = require("@actions/github");

try {
  console.log(`automerge action log`);
  const pullRequest = github.context.payload["pull_request"];
  const main_branch = pullRequest.main_branch;
  const head = pullRequest.head;
  const id = github.context.payload["repository"].id;

  console.log(`id: ${id}`);
  console.log(`head: ${head}`);
  console.log(`main_branch: ${main_branch}`);

  console.log(github.context.payload);
} catch (error) {
  core.setFailed(error.message);
}
