/* eslint-disable */

const S3_BUCKET = "upstairs-frontend-bucket";

import { execSync } from "child_process";
import { argv } from "process";

function main() {
  if (!argv.includes("--no-build")) {
    execSync("yarn build");
  }
  execSync(`aws s3 cp --recursive ./dist/ s3://${S3_BUCKET}/`);
}

try {
  main();
} catch (error) {
  console.error("Failed to deploy", error);
}
