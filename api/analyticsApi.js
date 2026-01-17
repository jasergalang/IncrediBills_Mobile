import api from "./apiInstance";

export const fetchAnalyticsApi = async () => {
  const [electric, water, grocery, fuel, miscellaneous] = await Promise.all([
    api.get("/electric-bill/analytics"),
    api.get("/water-bill/analytics"),
    api.get("/grocery-bill/analytics"),
    api.get("/transport-fuel-bill/analytics"),
    api.get("/miscellaneous-bill/analytics")
  ]);

  return {
    fetchAllElectricAnalytics: electric.data || { monthly: [], yearly: {} },
    fetchAllWaterAnalytics: water.data || { monthly: [], yearly: {} },
    fetchAllGroceryAnalytics: grocery.data || { monthly: [], yearly: {} },
    fetchAllTransportFuelAnalytics: fuel.data || { monthly: [], yearly: {} },
    fetchAllMiscellaneousAnalytics: miscellaneous.data || { monthly: [], yearly: {} },
  };
};
