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
      // ── Identity ─────────────────────────────────────────────────────────
      _id: bill._id,          // keep _id so update thunks can find the doc
      id: bill._id,           // alias for any legacy references

      // ── UI meta (from utilities config) ──────────────────────────────────
      type: typeId,
      name: util?.name || typeId,
      icon: util?.icon || "",
      color: util?.color || "gray",

      // ── Common fields ─────────────────────────────────────────────────────
      provider: bill.provider || "",
      amount: bill.cost || 0,       // normalised alias
      cost: bill.cost || 0,         // original backend field
      date: formatDate(bill.date),
      createdAt: bill.createdAt,
      status: bill.status || null,
      paymentStatus: bill.paymentStatus || null,
      billingPeriod: bill.billingPeriod || null,

      // ── Electricity / Water ───────────────────────────────────────────────
      consumption: bill.consumption ?? null,
      unit: bill.unit || null,

      // ── Grocery ───────────────────────────────────────────────────────────
      store: bill.store || null,
      category: bill.category || null,
      quantity: bill.quantity ?? null,

      // ── Miscellaneous ─────────────────────────────────────────────────────
      purchaseType: bill.purchaseType || null,

      // ── Transport / Fuel ──────────────────────────────────────────────────
      liters: bill.liters ?? null,
      stationLocation: bill.stationLocation || null,

      // ── Kitchen Gas ───────────────────────────────────────────────────────
      cylinders: bill.cylinders ?? null,
      cylinderSize: bill.cylinderSize || null,
      cycleDays: bill.cycleDays ?? null,
    };
  };

  // Map of expected bill types in order (must match the order args are passed)
  const billTypes = ["electricity", "water", "grocery", "fuel", "miscellaneous", "kitchenGas"];

  const allBills = [];

  billDataObjects.forEach((billData, index) => {
    if (billData && billData.bills && Array.isArray(billData.bills)) {
      const typeId = billTypes[index] || `unknown-${index}`;
      const mappedBills = billData.bills.map((b) => mapBill(b, typeId));
      allBills.push(...mappedBills);
    }
  });

  // Sort by createdAt (most recent first)
  return allBills.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
}

export const mergeMonthlyAnalytics = (
  waterData,
  electricityData,
  groceryData,
  fuelData,
  miscellaneousData
) => {
  const allMonths = new Set([
    ...Object.keys(waterData || {}),
    ...Object.keys(electricityData || {}),
    ...Object.keys(groceryData || {}),
    ...Object.keys(fuelData || {}),
    ...Object.keys(miscellaneousData || {}),
  ]);

  const sortedMonths = [...allMonths].sort();

  return sortedMonths.map((month) => ({
    month,
    water: waterData?.[month]?.totalCost || 0,
    electricity: electricityData?.[month]?.totalCost || 0,
    grocery: groceryData?.[month]?.totalCost || 0,
    fuel: fuelData?.[month]?.totalCost || 0,
    miscellaneous: miscellaneousData?.[month]?.totalCost || 0,
  }));
};