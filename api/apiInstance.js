import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import baseURL from "../assets/common/baseUrl";

const api = axios.create({
  baseURL: `${baseURL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Attach token automatically
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");

    if (token && token !== "undefined" && token !== "null") {
      config.headers.Authorization = `Bearer ${token
        .replace(/['"]+/g, "")
        .trim()}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: global response handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // You can centralize logout / token expiry here later
    console.warn("API Error:", error?.response?.status);
    return Promise.reject(error);
  }
);

export default api;
