const path = require("path");
const { defineConfig } = require("vite");

/**
 * @type {import('vite').UserConfig}
 */
module.exports = defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/bbcode2html.ts"),
      name: "bbcode2html",
      fileName: (format) => `bbcode2html.${format}.js`,
    },
  },
});
