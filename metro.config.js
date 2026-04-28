const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Fix for packages that use Node.js built-ins
config.resolver.blockList = [
  /node_modules\/xlsx\/lib\/nodelist\.js/,
];

config.resolver.extraNodeModules = {
  fs: require.resolve("@expo/vector-icons"),
  crypto: require.resolve("expo-crypto") ,
  stream: require.resolve("stream-browserify"),
  path: require.resolve("path-browserify"),
};

module.exports = withNativeWind(config, {
  input: "./global.css",
});