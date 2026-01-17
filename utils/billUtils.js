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

// export function transformBills(electricData, waterData) {
//   const formatDate = (date) =>
//     new Date(date).toLocaleDateString("en-US", {
//       month: "long",
//       year: "numeric",
//     });

//   const mapBill = (bill, typeId) => {
//     const util = utilities.find((u) => u.id === typeId);
//     return {
//       id: bill._id,
//       type: typeId,
//       name: util?.name || typeId,
//       provider: util?.provider || "",
//       icon: util?.icon || "",
//       color: util?.color || "gray",
//       amount: bill.cost || 0,
//       date: formatDate(bill.date),
//       createdAt: bill.createdAt,
//       status: bill.status,
//     };
//   };

//   const electric = electricData.bills.map((b) => mapBill(b, "electricity"));
//   const water = waterData.bills.map((b) => mapBill(b, "water"));

//   return [...electric, ...water].sort(
//     (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//   );
// }
export function transformBills(...billDataObjects) {
  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });

  const mapBill = (bill, typeId) => {
    const util = utilities.find((u) => u.id === typeId);
    return {
      id: bill._id,
      type: typeId,
      name: util?.name || typeId,
      provider: util?.provider || "",
      icon: util?.icon || "",
      color: util?.color || "gray",
      amount: bill.cost || 0,
      date: formatDate(bill.date),
      createdAt: bill.createdAt,
      status: bill.status,
      // Include additional fields that might be useful
      consumption: bill.consumption || null,
      unit: bill.unit || null,
    };
  };

  // Map of expected bill types in order
  const billTypes = ["electricity", "water", "grocery", "fuel", "miscellaneous"];
  
  const allBills = [];

  // Process each bill data object
  billDataObjects.forEach((billData, index) => {
    if (billData && billData.bills && Array.isArray(billData.bills)) {
      const typeId = billTypes[index] || `unknown-${index}`;
      const mappedBills = billData.bills.map((b) => mapBill(b, typeId));
      allBills.push(...mappedBills);
    }
  });

  // Sort by createdAt date (most recent first)
  return allBills.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
}
// export const mergeMonthlyAnalytics = (a, b) => {
//   const all = new Set([...Object.keys(a), ...Object.keys(b)]);
//   const sorted = [...all].sort();

//   return sorted.map((m) => ({
//     month: m,
//     water: a[m]?.totalCost || 0,
//     electricity: b[m]?.totalCost || 0,
//   }));
// };
export const mergeMonthlyAnalytics = (
  waterData,
  electricityData,
  groceryData,
  fuelData,
  miscellaneousData
) => {
  // Collect all unique months from all datasets
  const allMonths = new Set([
    ...Object.keys(waterData || {}),
    ...Object.keys(electricityData || {}),
    ...Object.keys(groceryData || {}),
    ...Object.keys(fuelData || {}),
    ...Object.keys(miscellaneousData || {}),
  ]);

  // Sort months chronologically
  const sortedMonths = [...allMonths].sort();

  // Create merged data for each month
  return sortedMonths.map((month) => ({
    month,
    water: waterData?.[month]?.totalCost || 0,
    electricity: electricityData?.[month]?.totalCost || 0,
    grocery: groceryData?.[month]?.totalCost || 0,
    fuel: fuelData?.[month]?.totalCost || 0,
    miscellaneous: miscellaneousData?.[month]?.totalCost || 0,
  }));
};