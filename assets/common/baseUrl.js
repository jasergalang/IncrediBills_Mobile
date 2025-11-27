import { Platform } from "react-native";
import Constants from "expo-constants";

const extra = Constants.expoConfig?.extra || Constants.manifest?.extra || {};
<<<<<<< Updated upstream
const BASE_IP =
  extra.BASE_IP || extra.BASEIP || process.env.BASEIP || "192.168.1.5";
=======

// 1. Define the input IP (Changed name to RAW_BASE to match your usage below)
const RAW_BASE = extra.BASE_IP || extra.BASEIP || process.env.EXPO_PUBLIC_BASEIP || "192.168.1.9";
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
  // contains a port (e.g. 192.168.1.12:8080)
  baseURL = `http://${normalized}`;
} else {
  baseURL = `http://${normalized}:${DEFAULT_PORT}`;
}


=======
  // It contains a port (e.g. 192.168.1.12:8080), just add http
  baseURL = `http://${normalized}:${DEFAULT_PORT}`;
} else {
  // It's just an IP or 'localhost', add http and port
  baseURL = `http://$192.168.0.223:8000`;
}
// baseURL = "http://192.168.0.223:8000";
// console.log("BASE_IP from config:", RAW_BASE);
baseURL = `http://${process.env.EXPO_PUBLIC_BASEIP}:${DEFAULT_PORT}`;
console.log("Final baseURL:", baseURL);
>>>>>>> Stashed changes

export default baseURL;
// ...existing code...
