import { Platform } from "react-native";
import Constants from "expo-constants";

const extra = Constants.expoConfig?.extra || Constants.manifest?.extra || {};
<<<<<<< HEAD
<<<<<<< Updated upstream
const BASE_IP =
  extra.BASE_IP || extra.BASEIP || process.env.BASEIP || "192.168.1.5";
=======

// 1. Define the input IP (Changed name to RAW_BASE to match your usage below)
const RAW_BASE = extra.BASE_IP || extra.BASEIP || process.env.EXPO_PUBLIC_BASEIP || "192.168.1.9";
>>>>>>> Stashed changes
=======

// 1. Define the input IP (Changed name to RAW_BASE to match your usage below)
const RAW_BASE = extra.BASE_IP || extra.BASEIP || process.env.BASEIP || "192.168.1.9";
>>>>>>> ab46273d0e7e6ca4d0f15d5b9ca4bdadc01a9bda
const DEFAULT_PORT = "3000";

// 2. Define the missing normalize function
const normalize = (str) => {
  if (!str) return "";
  return str.trim(); // Removes whitespace
};

const normalized = normalize(RAW_BASE);

// 3. Map localhost to Android emulator host (10.0.2.2)
let host = normalized;
if (Platform.OS === "android" && (host === "localhost" || host === "127.0.0.1")) {
  host = "10.0.2.2";
}

let baseURL = "";

if (!normalized) {
  // Fallback if no config found
  baseURL = `http://192.168.1.9:${DEFAULT_PORT}`;
} else if (normalized.startsWith("http://") || normalized.startsWith("https://")) {
  // It's already a full URL
  baseURL = normalized;
} else if (/:?\d+$/.test(normalized)) {
<<<<<<< HEAD
<<<<<<< Updated upstream
  // contains a port (e.g. 192.168.1.12:8080)
=======
  // It contains a port (e.g. 192.168.1.12:8080), just add http
>>>>>>> ab46273d0e7e6ca4d0f15d5b9ca4bdadc01a9bda
  baseURL = `http://${normalized}`;
} else {
  // It's just an IP or 'localhost', add http and port
  baseURL = `http://${host}:${DEFAULT_PORT}`;
}

<<<<<<< HEAD

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
=======
console.log("BASE_IP from config:", RAW_BASE);
console.log("Final baseURL:", baseURL);
>>>>>>> ab46273d0e7e6ca4d0f15d5b9ca4bdadc01a9bda

export default baseURL;
