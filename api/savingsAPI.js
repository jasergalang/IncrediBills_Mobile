import api from "./apiInstance";

export const fetchAllSavingsApi = async () => {
  const [electric, water, transport, grocery, miscellaneous, kitchenGas] = await Promise.all([
    api.get("/electric-bill/savings"),
    api.get("/water-bill/savings"),
    api.get("/transport-fuel-bill/savings"),
    api.get("/grocery-bill/savings"),
    api.get("/miscellaneous-bill/savings"),
    api.get("/kitchen-gas-bill/savings/all"),
  ]);

  return {
    fetchAllElectricSavings: electric.data?.predictions ?? electric.data?.savings ?? electric.data?.data ?? [],
    fetchAllWaterSavings: water.data?.predictions ?? water.data?.savings ?? water.data?.data ?? [],
    fetchAllTransportSavings: transport.data?.predictions ?? transport.data?.savings ?? transport.data?.data ?? [],
    fetchAllGrocerySavings: grocery.data?.predictions ?? grocery.data?.savings ?? grocery.data?.data ?? [],
    fetchAllMiscellaneousSavings: miscellaneous.data?.predictions ?? miscellaneous.data?.savings ?? miscellaneous.data?.data ?? [],
    fetchAllKitchenGasSavings: kitchenGas.data?.predictions ?? kitchenGas.data?.savings ?? kitchenGas.data?.data ?? [],
  };
};