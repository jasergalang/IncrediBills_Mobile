import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import baseURL from "../../assets/common/baseUrl"; // Your existing config

const api = axios.create({
  baseURL: `${baseURL}/api/chatbot`,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds timeout
});

// Interceptor to add token to requests
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (token && token !== "undefined" && token !== "null") {
        const cleanToken = String(token).replace(/['"]+/g, "").trim();
        if (cleanToken) {
          config.headers.Authorization = `Bearer ${cleanToken}`;
        }
      }
    } catch (error) {
      console.error("Error getting token:", error);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor to handle token errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        await AsyncStorage.removeItem("token");
        // You might want to navigate to login screen here
        // navigationRef.current?.navigate('Login');
      } catch (e) {
        console.error("Error removing token:", e);
      }
    }
    return Promise.reject(error);
  }
);

export const sendMessage = async (message) => {
  return api.post("/message", { message });
};

export const clearChatSession = async () => {
  return api.post("/clear");
};

export const checkChatbotHealth = async () => {
  return api.get("/health");
};