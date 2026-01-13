import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import baseURL from "../../assets/common/baseUrl";

const api = axios.create({
  baseURL: `${baseURL}/api`,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

// Request interceptor to add token
api.interceptors.request.use(async (config) => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (token && token !== "undefined" && token !== "null") {
      config.headers.Authorization = `Bearer ${token.replace(/['"]+/g, "").trim()}`;
    }
  } catch (error) {
    console.error("Error getting token:", error);
  }
  return config;
});

// Safe fetch helper
const safeFetch = async (url, fallback = {}) => {
  try {
    const res = await api.get(url);
    return res.data || fallback;
  } catch (err) {
    console.warn(`Failed to fetch ${url}`, err.message);
    return fallback;
  }
};

// Fetch all bills and analytics
export const fetchAllBillsData = async () => {
  const [
    electricData,
    waterData,
    electricPred,
    waterPred,
    electricAnalytics,
    waterAnalytics,
  ] = await Promise.all([
    safeFetch("/electric-bill/all", { bills: [] }),
    safeFetch("/water-bill/all", { bills: [] }),
    safeFetch("/electric-bill/predictions", { predictions: [] }),
    safeFetch("/water-bill/predictions", { predictions: [] }),
    safeFetch("/electric-bill/analytics", { monthly: [], yearly: {} }),
    safeFetch("/water-bill/analytics", { monthly: [], yearly: {} }),
  ]);

  return {
    electricData,
    waterData,
    electricPred,
    waterPred,
    electricAnalytics,
    waterAnalytics,
  };
};
