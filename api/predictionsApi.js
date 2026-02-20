import api from "./apiInstance";

export const fetchPredictionsApi = async () => {
  const [electric, water, transport, grocery, miscellaneous, kitchenGas] = await Promise.all([
    api.get("/electric-bill/predictions"),
    api.get("/water-bill/predictions"),
    api.get("/transport-fuel-bill/predictions"),
    api.get("/grocery-bill/predictions"),
    api.get("/miscellaneous-bill/predictions"),
    api.get("/kitchen-gas-bill/predictions/all")
  ]);

  return {
    fetchAllElectricPrediction: electric.data?.predictions || [],
    fetchAllWaterPrediction: water.data?.predictions || [],
    fetchAllTransportPrediction: transport.data?.predictions || [],
    fetchAllGroceryPrediction: grocery.data?.predictions || [],
    fetchAllMiscellaneousPrediction: miscellaneous.data?.predictions || [],
    fetchAllKitchenGasPrediction: kitchenGas.data?.predictions || [],
  };
};
