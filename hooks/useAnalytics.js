import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import baseURL from "../assets/common/baseUrl";
import { utilities } from "../constants/utilities";
import { useAuth } from "../context/auth";

// Helper function to get prediction for the month
const getPredictionForMonth = (predictions = [], month) => {
  const match = predictions.find((p) => p.predictedDate?.startsWith(month));
  return match ? Number(p.predictedCost) : null;
};

// Helper function to sum utility data
const sumUtility = (months, data, predictions) => {
  let spent = 0;
  let saved = 0;
  months.forEach((month) => {
    const actual = data[month]?.totalCost || 0;
    const predicted = getPredictionForMonth(predictions, month) ?? actual * 1.1;
    spent += actual;
    saved += Math.max(predicted - actual, 0);
  });
  return { spent, saved };
};

export const useAnalytics = (initialDateRange = "month") => {
  const [utilityKPI, setUtilityKPI] = useState({});
  const [spendingData, setSpendingData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [dateRange, setDateRange] = useState(initialDateRange);
  const [errorMessage, setErrorMessage] = useState("");  // Add state for error message
  const { token, getToken } = useAuth();

  // Safe fetch function to handle failed API requests
  const safeFetch = async (url, headers, fallback = {}) => {
    try {
      const res = await axios.get(url, { headers });
      return res.data || fallback;
    } catch (err) {
      console.warn(`Failed to fetch ${url}. Using fallback.`, err.message);
      return fallback;
    }
  };

  const fetchAnalytics = useCallback(async () => {
    const userToken = token || (await getToken());
    if (!userToken) return;

    const headers = { Authorization: `Bearer ${userToken}` };

    try {
      // Safe fetch for the data from the API
      const [
        waterAnalytics,
        electricAnalytics,
        waterPredictions,
        electricPredictions,
      ] = await Promise.all([
        safeFetch(`${baseURL}/api/water-bill/analytics`, headers, { monthly: [] }),
        safeFetch(`${baseURL}/api/electric-bill/analytics`, headers, { monthly: [] }),
        safeFetch(`${baseURL}/api/water-bill/predictions`, headers, { predictions: [] }),
        safeFetch(`${baseURL}/api/electric-bill/predictions`, headers, { predictions: [] }),
      ]);

      const wData = waterAnalytics.monthly ?? {};
      const eData = electricAnalytics.monthly ?? {};

      const monthCount = dateRange === "month" ? 1 : dateRange === "3months" ? 3 : 6;
      const getLatestMonthsList = (monthlyData, count) =>
        Object.keys(monthlyData)
          .sort((a, b) => (a < b ? 1 : -1))
          .slice(0, count);

      const waterMonths = getLatestMonthsList(wData, monthCount);
      const electricMonths = getLatestMonthsList(eData, monthCount);

      // KPI calculations
      const waterTotals = sumUtility(waterMonths, wData, waterPredictions.predictions);
      const electricTotals = sumUtility(electricMonths, eData, electricPredictions.predictions);

      const totalSpent = waterTotals.spent + electricTotals.spent;
      const totalSaved = waterTotals.saved + electricTotals.saved;
      const efficiency = totalSpent > 0 ? Math.round((totalSaved / totalSpent) * 100) : 0;

      setUtilityKPI({
        totalSpending: Math.round(totalSpent),
        totalSaved: Math.round(totalSaved),
        efficiency,
        avgMonthly: Math.round(totalSpent / monthCount),
        change: 0,
      });

      // Categories calculation
      const latestAmounts = {
        electricity: eData[electricMonths[0]]?.totalCost || 0,
        water: wData[waterMonths[0]]?.totalCost || 0,
        gas: 0,
        fuel: 0,
        grocery: 0,
      };
      const totalAmount = Object.values(latestAmounts).reduce((a, b) => a + b, 0);
      setCategories(
        utilities.map((u) => ({
          name: u.name,
          amount: latestAmounts[u.id] || 0,
          percent: totalAmount > 0 ? Math.round((latestAmounts[u.id] || 0) / totalAmount * 100) : 0,
          icon: u.icon,
          color: u.color,
        }))
      );

      // Spending data calculation
      const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
      const monthsSet = new Set([...Object.keys(wData), ...Object.keys(eData)]);
      const allMonthsSorted = Array.from(monthsSet).sort();

      setSpendingData(
        allMonthsSorted.map((monthKey) => {
          const totalAmount = (wData[monthKey]?.totalCost || 0) + (eData[monthKey]?.totalCost || 0);
          return {
            month: monthNames[parseInt(monthKey.split("-")[1], 10) - 1],
            amount: totalAmount,
          };
        })
      );

    } catch (err) {
      console.warn("Error fetching analytics:", err);
      setErrorMessage("Failed to fetch analytics data. Please try again later.");
    }
  }, [dateRange, token]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  // Public refresh function
  const refresh = () => fetchAnalytics();

  return { utilityKPI, spendingData, categories, dateRange, setDateRange, refresh, errorMessage };
};
