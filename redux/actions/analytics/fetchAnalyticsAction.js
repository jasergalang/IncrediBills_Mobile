// redux/analytics/analyticsActions.js
import axios from "axios";
import baseURL from "../../../assets/common/baseUrl";
import { utilities } from "../../../constants/utilities";

// Action types
export const FETCH_ANALYTICS_REQUEST = "FETCH_ANALYTICS_REQUEST";
export const FETCH_ANALYTICS_SUCCESS = "FETCH_ANALYTICS_SUCCESS";
export const FETCH_ANALYTICS_FAILURE = "FETCH_ANALYTICS_FAILURE";

// ---------- Helpers ----------
// const getPredictionForMonth = (predictions = [], month) => {
//   const match = predictions.find((p) =>
//     p.predictedDate?.startsWith(month)
//   );
//   return match ? Number(p.predictedCost) : null;
// };
const getPredictionForMonth = (predictions = [], month) => {
  const match = predictions.find((p) =>
    p.predictedDate?.startsWith(month)
  );
  return match ? Number(match.predictedCost) : null;
};

const sumUtility = (months, data, predictions) => {
  let spent = 0;
  let saved = 0;

  months.forEach((month) => {
    const actual = data[month]?.totalCost || 0;
    const predicted =
      getPredictionForMonth(predictions, month) ?? actual * 1.1;

    spent += actual;
    saved += Math.max(predicted - actual, 0);
  });

  return { spent, saved };
};

const safeFetch = async (url, headers, fallback) => {
  try {
    const res = await axios.get(url, { headers });
    return res.data || fallback;
  } catch (err) {
    console.warn(`Failed to fetch ${url}`, err.message);
    return fallback;
  }
};

// ---------- Action ----------
export const fetchAnalytics = (token, dateRange = "month") => async (dispatch) => {
  if (!token) return;

  dispatch({ type: FETCH_ANALYTICS_REQUEST });

  try {
    const headers = { Authorization: `Bearer ${token}` };

    const [
      waterAnalytics,
      electricAnalytics,
      waterPredictions,
      electricPredictions,
    ] = await Promise.all([
      safeFetch(`${baseURL}/api/water-bill/analytics`, headers, { monthly: {} }),
      safeFetch(`${baseURL}/api/electric-bill/analytics`, headers, { monthly: {} }),
      safeFetch(`${baseURL}/api/water-bill/predictions`, headers, { predictions: [] }),
      safeFetch(`${baseURL}/api/electric-bill/predictions`, headers, { predictions: [] }),
    ]);

    const wData = waterAnalytics.monthly || {};
    const eData = electricAnalytics.monthly || {};

    const monthCount =
      dateRange === "month" ? 1 : dateRange === "3months" ? 3 : 6;

    const getLatestMonths = (data, count) =>
      Object.keys(data)
        .sort((a, b) => (a < b ? 1 : -1))
        .slice(0, count);

    const waterMonths = getLatestMonths(wData, monthCount);
    const electricMonths = getLatestMonths(eData, monthCount);

    // KPI
    const waterTotals = sumUtility(
      waterMonths,
      wData,
      waterPredictions.predictions
    );
    const electricTotals = sumUtility(
      electricMonths,
      eData,
      electricPredictions.predictions
    );

    const totalSpent = waterTotals.spent + electricTotals.spent;
    const totalSaved = waterTotals.saved + electricTotals.saved;

    const utilityKPI = {
      totalSpending: Math.round(totalSpent),
      totalSaved: Math.round(totalSaved),
      efficiency:
        totalSpent > 0 ? Math.round((totalSaved / totalSpent) * 100) : 0,
      avgMonthly: Math.round(totalSpent / monthCount),
      change: 0,
    };

    // Categories
    const latestAmounts = {
      electricity: eData[electricMonths[0]]?.totalCost || 0,
      water: wData[waterMonths[0]]?.totalCost || 0,
      gas: 0,
      fuel: 0,
      grocery: 0,
    };

    const totalAmount = Object.values(latestAmounts).reduce(
      (a, b) => a + b,
      0
    );

    const categories = utilities.map((u) => ({
      name: u.name,
      amount: latestAmounts[u.id] || 0,
      percent:
        totalAmount > 0
          ? Math.round(((latestAmounts[u.id] || 0) / totalAmount) * 100)
          : 0,
      icon: u.icon,
      color: u.color,
    }));

    // Spending trend
    const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const monthsSet = new Set([...Object.keys(wData), ...Object.keys(eData)]);
    const allMonthsSorted = Array.from(monthsSet).sort();

    const spendingData = allMonthsSorted.map((monthKey) => ({
      month: monthNames[parseInt(monthKey.split("-")[1], 10) - 1],
      amount:
        (wData[monthKey]?.totalCost || 0) +
        (eData[monthKey]?.totalCost || 0),
    }));

    dispatch({
      type: FETCH_ANALYTICS_SUCCESS,
      payload: {
        utilityKPI,
        categories,
        spendingData,
        dateRange,
      },
    });
  } catch (err) {
    dispatch({
      type: FETCH_ANALYTICS_FAILURE,
      payload: err.message || "Failed to fetch analytics",
    });
  }
};
