module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@": "./", // if you're using @ as root
            "@assets": "./assets",
          },
        },
      ],
      "react-native-reanimated/plugin", // Must be listed last
    ],
  };
};
