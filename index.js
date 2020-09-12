const core = require("@actions/core");
const github = require("@actions/github");

try {
  console.log(`automerge action log`);
  const pullRequest = github.context.payload["pull_request"];
  const base = pullRequest.base.ref;
  const head = pullRequest.head.ref;
  const id = github.context.payload["repository"].node_id;

  console.log(`id: ${id}`);
  console.log(`head: ${head}`);
  console.log(`base: ${base}`);

  console.log(github.context.payload);
} catch (error) {
  core.setFailed(error.message);
}
