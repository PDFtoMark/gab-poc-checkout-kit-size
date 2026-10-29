const fs = require("node:fs");

const report = {
  version: 1,
  pr: Number(process.env.PR_NUMBER),
  headSha: process.env.HEAD_SHA,
  baseSha: process.env.BASE_SHA,
  budgets: { web: { javascript: { measurement: "bundle", softKiB: 72, hardKiB: 85 } } },
  base: { "Web\tJavaScript": 70000 },
  head: { "Web\tJavaScript": 76000 },
  measuredPlatforms: ["web"],
};

fs.mkdirSync("size-report", { recursive: true });
fs.writeFileSync("size-report/report.json", JSON.stringify(report));
fs.writeFileSync(
  "size-report/comment.md",
  "Web bundle: 74.22 KiB (+5.86 KiB). Above soft budget; acceptance required.\n",
);
