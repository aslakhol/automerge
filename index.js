const core = require("@actions/core");
const github = require("@actions/github");

try {
  console.log(`automerge action log`);
  const pullRequest = github.context.payload["pull_request"];
  console.log(pullRequest);
  const payload = JSON.stringify(github.context.payload, undefined, 2);
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
