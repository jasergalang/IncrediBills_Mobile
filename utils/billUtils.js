import { utilities } from "../constants/utilities";

export function getLatestBill(bills) {
  if (!bills || bills.length === 0) return null;
  return bills.reduce((latest, b) =>
    new Date(b.date) > new Date(latest.date) ? b : latest
  );
}

export function formatBillDate(date) {
  if (!date) return "";
  return new Date(date).toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });
}

export function transformBills(...billDataObjects) {
  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });

  const mapBill = (bill, typeId) => {
    const util = utilities.find((u) => u.id === typeId);
    return {
      _id: bill._id,
      id: bill._id,
      type: typeId,
      name: util?.name || typeId,
      icon: util?.icon || "",
      color: util?.color || "gray",
      provider: bill.provider || "",
      amount: bill.cost || 0,
      cost: bill.cost || 0,
      date: formatDate(bill.date),
      createdAt: bill.createdAt,
      status: bill.status || null,
      paymentStatus: bill.paymentStatus || null,
      billingPeriod: bill.billingPeriod || null,
      consumption: bill.consumption ?? null,
      unit: bill.unit || null,
      store: bill.store || null,
      category: bill.category || null,
      quantity: bill.quantity ?? null,
      purchaseType: bill.purchaseType || null,
      liters: bill.liters ?? null,
      stationLocation: bill.stationLocation || null,
      cylinders: bill.cylinders ?? null,
      cylinderSize: bill.cylinderSize || null,
      cycleDays: bill.cycleDays ?? null,
    };
  };

  const billTypes = ["electricity", "water", "grocery", "fuel", "miscellaneous", "kitchenGas"];
  const allBills = [];

  billDataObjects.forEach((billData, index) => {
    if (billData && billData.bills && Array.isArray(billData.bills)) {
      const typeId = billTypes[index] || `unknown-${index}`;
      const mappedBills = billData.bills.map((b) => mapBill(b, typeId));
      allBills.push(...mappedBills);
    }
  });

  return allBills.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

/**
 * API returns: { "2025-12": { totalCost: 950, ... }, "2026-01": { ... } }
 * This merges all 6 categories into:
 * [{ month: "2025-12", water: 0, electricity: 0, ... }, ...]
 */
export const mergeMonthlyAnalytics = (
  waterData = {},
  electricityData = {},
  groceryData = {},
  fuelData = {},
  miscellaneousData = {},
  kitchenGasData = {}
) => {
  // Collect every unique "YYYY-MM" key across all 6 categories
  const allMonths = new Set([
    ...Object.keys(waterData),
    ...Object.keys(electricityData),
    ...Object.keys(groceryData),
    ...Object.keys(fuelData),
    ...Object.keys(miscellaneousData),
    ...Object.keys(kitchenGasData),
  ]);

  return [...allMonths].sort().map((month) => ({
    month,
    water:         waterData[month]?.totalCost         ?? 0,
    electricity:   electricityData[month]?.totalCost   ?? 0,
    grocery:       groceryData[month]?.totalCost       ?? 0,
    fuel:          fuelData[month]?.totalCost          ?? 0,
    miscellaneous: miscellaneousData[month]?.totalCost ?? 0,
    kitchenGas:    kitchenGasData[month]?.totalCost    ?? 0,
  }));
};