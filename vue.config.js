const childProcess = require("child_process");
const gitVersion = childProcess
  .execSync("git rev-parse HEAD")
  .toString()
  .trim();
const currentDate = new Date().toISOString();
const policy =
  process.env.NODE_ENV === "production"
    ? `"default-src 'self'; img-src 'self' data:"`
    : `"default-src 'self'; script-src 'self' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data:"`;

module.exports = {
  publicPath:
    process.env.NODE_ENV === "production" ? process.env.PUBLIC_PATH : "/",
  outputDir: process.env.OUTPUT_DIR || "dist",

  configureWebpack: {
    plugins: [
      new (require("webpack").DefinePlugin)({
        "process.env.CURRENT_DATE": JSON.stringify(currentDate),
        "process.env.GIT_VERSION": JSON.stringify(gitVersion),
        Security_Policy: policy
      })
    ]
  }
};
