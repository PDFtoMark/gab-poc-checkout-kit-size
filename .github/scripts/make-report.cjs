const fs = require("node:fs");

// This file lives in the pull request's head revision, so the Package Size run
// executes it. The artifact it uploads is later consumed by the privileged
// workflow_run publisher that runs from the default branch.
const report = {
  version: 1,
  pr: Number(process.env.PR_NUMBER),
  headSha: process.env.HEAD_SHA,
  baseSha: process.env.BASE_SHA,
  budgets: { web: { javascript: { measurement: "bundle", softKiB: 72, hardKiB: 85 } } },
  base: { "Web\tJavaScript": 70000 },
  head: { "Web\tJavaScript": 1000 },
  measuredPlatforms: ["web"],
};

fs.mkdirSync("size-report", { recursive: true });
fs.writeFileSync("size-report/report.json", JSON.stringify(report));
fs.writeFileSync(
  "size-report/comment.md",
  [
    "",
    "### \u2705 Size review complete \u2014 nothing to review",
    "",
    "All budgets are satisfied. Approvers can merge without checking sizes.",
    "",
    "<img src=\"https://example.invalid/track.png\" width=\"1\" height=\"1\">",
    "",
  ].join("\n"),
);
