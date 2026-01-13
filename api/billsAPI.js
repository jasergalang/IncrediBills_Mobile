import api from "./apiInstance";

export const fetchAllBills = async () => {
  const [electric, water] = await Promise.all([
    api.get("/electric-bill/all"),
    api.get("/water-bill/all"),
  ]);

  return {
    fetchAllElectricBill: electric.data?.bills || [],
    fetchAllWaterBill: water.data?.bills || [],
  };
};
