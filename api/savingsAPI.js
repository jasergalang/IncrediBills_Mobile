import api from "./apiInstance";

export const fetchAllSavingsApi = async () => {
  const [electric, water] = await Promise.all([
    api.get("/electric-bill/savings"),
    api.get("/water-bill/savings"),
  ]);

  return {
    fetchAllElectricSavings: electric.data?.predictions || [],
    fetchAllWaterSavings: water.data?.predictions || [],
  };
};
