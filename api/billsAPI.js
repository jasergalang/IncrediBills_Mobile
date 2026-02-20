import api from "./apiInstance";

export const fetchAllBills = async () => {
  const [electric, water, transport, grocery, miscellaneous, kitchenGas] = await Promise.all([
    api.get("/electric-bill/all"),
    api.get("/water-bill/all"),
    api.get("/transport-fuel-bill/bills"),
    api.get("/grocery-bill/bills"),
    api.get("/miscellaneous-bill/bills"),
    api.get("/kitchen-gas-bill")
  ]);

  return {
    fetchAllElectricBill: electric.data?.bills || [],
    fetchAllWaterBill: water.data?.bills || [],
    fetchAllTransportBill: transport.data?.bills || [],
    fetchAllGroceryBill: grocery.data?.bills || [],
    fetchAllMiscellaneousBill: miscellaneous.data?.bills || [],
    fetchAllKitchenGasBill: kitchenGas.data?.bills || [],
  };
};
