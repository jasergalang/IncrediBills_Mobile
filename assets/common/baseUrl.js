import { Platform } from "react-native";
import Constants from "expo-constants";

const extra = Constants.expoConfig?.extra || Constants.manifest?.extra || {};
const BASE_IP =
  extra.BASE_IP || extra.BASEIP || process.env.BASEIP || "192.168.1.5";
const DEFAULT_PORT = "3000";

function normalize(ip) {
  if (!ip) return ip;
  const trimmed = ip.trim().replace(/\/+$/, "");
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://"))
    return trimmed;
  return trimmed;
}

const normalized = normalize(BASE_IP);

let baseURL = "";
if (!normalized) {
  baseURL = `http://192.168.1.5:${DEFAULT_PORT}`;
} else if (
  normalized.startsWith("http://") ||
  normalized.startsWith("https://")
) {
  baseURL = normalized;
} else if (/:?\d+$/.test(normalized)) {
  // contains a port (e.g. 192.168.1.12:8080)
  baseURL = `http://${normalized}`;
} else {
  baseURL = `http://${normalized}:${DEFAULT_PORT}`;
}

// optional: handle Android emulator special host if you prefer automatic mapping
// if (Platform.OS === "android" && (normalized === "localhost" || normalized === "127.0.0.1")) {
//   baseURL = `http://10.0.2.2:${DEFAULT_PORT}`;
// }

export default baseURL;
// ...existing code...
