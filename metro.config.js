/*const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);
//module.exports = config;
module.exports = withNativeWind(config, {
  input: "./global.css",
}); 
*/


//const { getDefaultConfig } = require("expo/metro-config");

//const config = getDefaultConfig(__dirname);

//module.exports = config;


const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Simple approach: just ensure CSS files are processed
config.resolver.sourceExts.push("css");

module.exports = config;