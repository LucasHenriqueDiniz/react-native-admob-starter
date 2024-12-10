/** @type {import('@babel/core').TransformOptions} */
module.exports = function (api) {
  api.cache(true)
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            app: "./app",
            components: "./components",
            hooks: "./hooks",
            utils: "./utils",
            store: "./store",
            i18n: "./i18n",
            assets: "./assets",
          },
        },
      ],
    ],
  }
}
