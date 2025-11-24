import { Platform } from "react-native";
import Constants from "expo-constants";

const extra = Constants.expoConfig?.extra || Constants.manifest?.extra || {};
const BASE_IP =
  extra.BASE_IP || extra.BASEIP || process.env.BASEIP || "192.168.1.9";
const DEFAULT_PORT = "3000";

{
  Platform.OS == "android"
    ? (baseURL = "http://192.168.1.9:3000")
    : (baseURL = "http://192.168.1.9:3000");
}

const normalized = normalize(RAW_BASE);

// map emulator localhost to Android emulator host
let host = normalized;
if (Platform.OS === "android" && (host === "localhost" || host === "127.0.0.1")) {
  host = "10.0.2.2";
}

let baseURL = "";
if (!normalized) {
  baseURL = `http://192.168.1.9:${DEFAULT_PORT}`;
} else if (
  normalized.startsWith("http://") ||
  normalized.startsWith("https://")
) {
  baseURL = normalized;
} else if (/:?\d+$/.test(normalized)) {
  // contains a port (e.g. 192.168.1.12:8080)
  baseURL = `http://${normalized}`;
} else {
  baseURL = `http://${host}:${DEFAULT_PORT}`;
}

console.log("BASE_IP from config:", RAW_BASE);
console.log("Final baseURL:", baseURL);

export default baseURL;