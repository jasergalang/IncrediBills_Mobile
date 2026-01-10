// redux/actions/billActions.js
import axios from "axios";
import baseURL from "../../../assets/common/baseUrl";
import { utilities } from "../../../constants/utilities";
import {
  getLatestBill,
  transformBills,
  mergeMonthlyAnalytics,
  formatBillDate,
} from "../../../utils/billUtils";
import { computeChange } from "../../../utils/predictionUtils";

// Action types
export const FETCH_BILLS_REQUEST = "FETCH_BILLS_REQUEST";
export const FETCH_BILLS_SUCCESS = "FETCH_BILLS_SUCCESS";
export const FETCH_BILLS_FAILURE = "FETCH_BILLS_FAILURE";

// Safe fetch helper
const safeFetch = async (url, headers, fallback = {}) => {
  try {
    const res = await axios.get(url, { headers });
    return res.data || fallback;
  } catch (err) {
    console.warn(`Failed to fetch ${url}`, err.message);
    return fallback;
  }
};

// Fetch all bills, predictions, and analytics
export const fetchBills = (token) => async (dispatch) => {
  if (!token) return;

  dispatch({ type: FETCH_BILLS_REQUEST });

  const headers = { Authorization: `Bearer ${token}` };

  try {
    const [
      electricData,
      waterData,
      electricPred,
      waterPred,
      electricAnalytics,
      waterAnalytics,
    ] = await Promise.all([
      safeFetch(`${baseURL}/api/electric-bill/all`, headers, { bills: [] }),
      safeFetch(`${baseURL}/api/water-bill/all`, headers, { bills: [] }),
      safeFetch(`${baseURL}/api/electric-bill/predictions`, headers, { predictions: [] }),
      safeFetch(`${baseURL}/api/water-bill/predictions`, headers, { predictions: [] }),
      safeFetch(`${baseURL}/api/electric-bill/analytics`, headers, { monthly: [], yearly: {} }),
      safeFetch(`${baseURL}/api/water-bill/analytics`, headers, { monthly: [], yearly: {} }),
    ]);

    const latestElectric = getLatestBill(electricData.bills);
    const latestWater = getLatestBill(waterData.bills);

    // Latest amounts
    const latestAmounts = {
      electricity: latestElectric?.cost || 0,
      water: latestWater?.cost || 0,
      gas: 0,
      fuel: 0,
      grocery: 0,
    };

    // Computed changes
    const computedChanges = {
      electricity: computeChange(latestElectric, electricPred.predictions ?? []),
      water: computeChange(latestWater, waterPred.predictions ?? []),
      gas: 0,
      fuel: 0,
      grocery: 0,
    };

    // Recent bills
    const allBills = transformBills(electricData, waterData);
    const recentBills = allBills.slice(0, 5);

    // Upcoming bills
    const formatPred = (preds) => (preds || []).map((p) => ({ ...p, date: p.predictedDate }));
    const upcomingBills = [];

    const predictedElectric = getLatestBill(formatPred(electricPred.predictions ?? []));
    const predictedWater = getLatestBill(formatPred(waterPred.predictions ?? []));

    if (predictedElectric) {
      const util = utilities.find((u) => u.id === "electricity");
      upcomingBills.push({
        id: "electricity",
        type: util.name,
        amount: Number(predictedElectric.predictedCost || 0),
        dueDate: formatBillDate(predictedElectric.date),
        icon: util.icon,
        color: util.color,
      });
    }

    if (predictedWater) {
      const util = utilities.find((u) => u.id === "water");
      upcomingBills.push({
        id: "water",
        type: util.name,
        amount: Number(predictedWater.predictedCost || 0),
        dueDate: formatBillDate(predictedWater.date),
        icon: util.icon,
        color: util.color,
      });
    }

    // Spending overview & categories
    const totalSum = latestAmounts.electricity + latestAmounts.water;
    const categories = utilities.map((u) => {
      const amt = latestAmounts[u.id] || 0;
      return {
        category: u.name,
        amount: amt,
        percent: totalSum > 0 ? Math.round((amt / totalSum) * 100) : 0,
        icon: u.icon,
        color: u.color,
      };
    });

    // Stats
    const electricPredicted = predictedElectric?.predictedCost ?? latestAmounts.electricity * 1.1;
    const waterPredicted = predictedWater?.predictedCost ?? latestAmounts.water * 1.1;
    const saved = Math.max(electricPredicted - latestAmounts.electricity, 0) +
                  Math.max(waterPredicted - latestAmounts.water, 0);
    const billsUploaded = (electricData.bills?.length || 0) + (waterData.bills?.length || 0);

    const statsData = {
      totalSpent: Math.round(latestAmounts.electricity + latestAmounts.water),
      savedAmount: Math.round(saved),
      billsUploaded,
      efficiency: billsUploaded > 0
        ? Math.round((saved / (latestAmounts.electricity + latestAmounts.water)) * 100)
        : 0,
    };

    // Analytics
    const analytics = {
      monthly: mergeMonthlyAnalytics(waterAnalytics.monthly ?? [], electricAnalytics.monthly ?? []),
      yearly: {
        water: waterAnalytics.yearly ?? {},
        electricity: electricAnalytics.yearly ?? {},
      },
    };

    dispatch({
      type: FETCH_BILLS_SUCCESS,
      payload: {
        latestAmounts,
        computedChanges,
        recentBills,
        upcomingBills,
        categories,
        statsData,
        analytics,
      },
    });
  } catch (err) {
    dispatch({
      type: FETCH_BILLS_FAILURE,
      payload: err.message || "Failed to fetch bills",
    });
  }
};
