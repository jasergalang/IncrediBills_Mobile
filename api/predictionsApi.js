import api from "./apiInstance";

export const fetchPredictionsApi = async () => {
  const [electric, water, transport, grocery, miscellaneous] = await Promise.all([
    api.get("/electric-bill/predictions"),
    api.get("/water-bill/predictions"),
    api.get("/transport-fuel-bill/predictions"),
    api.get("/grocery-bill/predictions"),
    api.get("/miscellaneous-bill/predictions"),
  ]);

  return {
    fetchAllElectricPrediction: electric.data?.predictions || [],
    fetchAllWaterPrediction: water.data?.predictions || [],
    fetchAllTransportPrediction: transport.data?.predictions || [],
    fetchAllGroceryPrediction: grocery.data?.predictions || [],
    fetchAllMiscellaneousPrediction: miscellaneous.data?.predictions || [],
  };
};
