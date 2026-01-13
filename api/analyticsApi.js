import api from "./apiInstance";

export const fetchAnalyticsApi = async () => {
  const [electric, water] = await Promise.all([
    api.get("/electric-bill/analytics"),
    api.get("/water-bill/analytics"),
  ]);

  return {
    fetchAllElectricAnalytics: electric.data || { monthly: [], yearly: {} },
    fetchAllWaterAnalytics: water.data || { monthly: [], yearly: {} },
  };
};
