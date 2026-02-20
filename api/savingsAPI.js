import api from "./apiInstance";

export const fetchAllSavingsApi = async () => {
  const [electric, water, transport, grocery, miscellaneous, kitchenGas] = await Promise.all([
    api.get("/electric-bill/savings"),
    api.get("/water-bill/savings"),
    api.get("/transport-fuel-bill/savings"),
    api.get("/grocery-bill/savings"),
    api.get("/miscellaneous-bill/savings"),
    api.get("/kitchen-gas-bill/savings/all")
  ]);

  return {
    fetchAllElectricSavings: electric.data?.predictions || [],
    fetchAllWaterSavings: water.data?.predictions || [],
    fetchAllTransportSavings: transport.data?.predictions || [],
    fetchAllGrocerySavings: grocery.data?.predictions || [],
    fetchAllMiscellaneousSavings: miscellaneous.data?.predictions || [],
    fetchAllKitchenGasSavings: kitchenGas.data?.predictions || [],
  };
};
