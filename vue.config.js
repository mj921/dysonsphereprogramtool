module.exports = {
  publicPath:
    process.env.NODE_ENV === "production" ? process.env.PUBLIC_PATH : "/",
  outputDir: process.env.OUTPUT_DIR || "dist"
};
