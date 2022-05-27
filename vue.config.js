// vue.config.js

module.exports = {
  pwa: {
    name: "Rurall Strong",
    themeColor: "#16BA77",
    workboxOptions: {
      skipWaiting: true
    }
  },
  parallel: true,
  outputDir: "dist",
  lintOnSave: true,
  transpileDependencies: ["vuetify"]
};
