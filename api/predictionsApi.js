import api from "./apiInstance";

export const fetchPredictionsApi = async () => {
  const [electric, water] = await Promise.all([
    api.get("/electric-bill/predictions"),
    api.get("/water-bill/predictions"),
  ]);

  return {
    fetchAllElectricPrediction: electric.data?.predictions || [],
    fetchAllWaterPrediction: water.data?.predictions || [],
  };
};
