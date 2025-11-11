import { Platform } from "react-native";
import Constants from "expo-constants";

const extra = Constants.expoConfig?.extra || Constants.manifest?.extra || {};
const RAW_BASE =
  extra.BASE_IP || extra.BASEIP || process.env.BASEIP || "192.168.1.5";
const DEFAULT_PORT = String(extra.PORT || "3000");

function normalize(ip) {
  if (!ip) return ip;
  const trimmed = ip.toString().trim().replace(/\/+$/, "");
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://"))
    return trimmed;
  return trimmed;
}

const normalized = normalize(RAW_BASE);

// map emulator localhost to Android emulator host
let host = normalized;
if (Platform.OS === "android" && (host === "localhost" || host === "127.0.0.1")) {
  host = "10.0.2.2";
}

let baseURL = "";
if (!host) {
  baseURL = `http://192.168.1.5:${DEFAULT_PORT}`;
} else if (host.startsWith("http://") || host.startsWith("https://")) {
  baseURL = host;
} else if (/:/.test(host)) {
  // contains a port already (e.g. 192.168.1.12:8080)
  baseURL = `http://${host}`;
} else {
  baseURL = `http://${host}:${DEFAULT_PORT}`;
}

console.log("BASE_IP from config:", RAW_BASE);
console.log("Final baseURL:", baseURL);

export default baseURL;