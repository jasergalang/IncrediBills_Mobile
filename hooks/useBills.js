import { useEffect, useState } from "react";
import axios from "axios";
import {
  getLatestBill,
  transformBills,
  mergeMonthlyAnalytics,
  formatBillDate
} from "../utils/billUtils";
import { computeChange } from "../utils/predictionUtils";
import baseURL from "../assets/common/baseUrl";
import { useAuth } from "../context/auth";
import { utilities } from "../constants/utilities";

export function useBills() {
  const { token, getToken } = useAuth();

  const [recentBills, setRecentBills] = useState([]);
  const [spendingData, setSpendingData] = useState([]);
  const [upcomingBills, setUpcomingBills] = useState([]);
  const [statsData, setStatsData] = useState({
    totalSpent: 0,
    savedAmount: 0,
    billsUploaded: 0,
    efficiency: 0,
  });

  const [latestAmounts, setLatestAmounts] = useState({});
  const [computedChanges, setComputedChanges] = useState({});
  const [analytics, setAnalytics] = useState({ monthly: [], yearly: {} });


  // Fetch Bills + Predictions + Analytics
  const fetchBills = async () => {
    const userToken = token || (await getToken());
    if (!userToken) return;

    const headers = { Authorization: `Bearer ${userToken}` };

    const [
      electricRes,
      waterRes,
      electricPredRes,
      waterPredRes,
      electricAnalyticsRes,
      waterAnalyticsRes
    ] = await Promise.all([
      axios.get(`${baseURL}/api/electric-bill/all`, { headers }),
      axios.get(`${baseURL}/api/water-bill/all`, { headers }),
      axios.get(`${baseURL}/api/electric-bill/predictions`, { headers }),
      axios.get(`${baseURL}/api/water-bill/predictions`, { headers }),
      axios.get(`${baseURL}/api/electric-bill/analytics`, { headers }),
      axios.get(`${baseURL}/api/water-bill/analytics`, { headers }),
    ]);

    const electricData = electricRes.data;
    const waterData = waterRes.data;

    const electricPred = electricPredRes.data?.predictions ?? [];
    const waterPred = waterPredRes.data?.predictions ?? [];

    const latestElectric = getLatestBill(electricData.bills);
    const latestWater   = getLatestBill(waterData.bills);


    // LATEST AMOUNTS
    const electricCost = latestElectric?.cost || 0;
    const waterCost    = latestWater?.cost || 0;

    setLatestAmounts({
      electricity: electricCost,
      water: waterCost,
      gas: 0,
      grocery: 0,
      fuel: 0,
    });


    // COMPUTED CHANGES
    setComputedChanges({
      electricity: computeChange(latestElectric, electricPred),
      water: computeChange(latestWater, waterPred),
      gas: 0,
      grocery: 0,
      fuel: 0,
    });


    // RECENT BILLS
    const allBills = transformBills(electricData, waterData);
    setRecentBills(allBills.slice(0, 5));


    // UPCOMING BILLS (predictions)
    const formatPred = (preds) => (preds || []).map((p) => ({
      ...p,
      date: p.predictedDate,
    }));

    const upcoming = [];

    const predictedElectric = getLatestBill(formatPred(electricPred));
    const predictedWater = getLatestBill(formatPred(waterPred));

    if (predictedElectric) {
      const util = utilities.find((u) => u.id === "electricity");
      upcoming.push({
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
      upcoming.push({
        id: "water",
        type: util.name,
        amount: Number(predictedWater.predictedCost || 0),
        dueDate: formatBillDate(predictedWater.date),
        icon: util.icon,
        color: util.color,
      });
    }

    setUpcomingBills(upcoming);


    // SPENDING OVERVIEW
    const totalSum = electricCost + waterCost;

    const spending = utilities.map((u) => {
      const amt = latestAmounts[u.id] || 0;
      return {
        category: u.name,
        amount: amt,
        percent: totalSum > 0 ? Math.round((amt / totalSum) * 100) : 0,
        icon: u.icon,
        color: u.color,
      };
    });

    setSpendingData(spending);


    // STATS CARDS
    const electricPredicted = predictedElectric?.predictedCost ?? electricCost * 1.1;
    const waterPredicted    = predictedWater?.predictedCost ?? waterCost * 1.1;

    const saved =
      (electricPredicted - electricCost > 0 ? electricPredicted - electricCost : 0) +
      (waterPredicted - waterCost > 0 ? waterPredicted - waterCost : 0);

    const billsUploaded =
      (electricData.bills?.length || 0) +
      (waterData.bills?.length || 0);

    setStatsData({
      totalSpent: Math.round(electricCost + waterCost),
      savedAmount: Math.round(saved),
      billsUploaded,
      efficiency:
        billsUploaded > 0
          ? Math.round((saved / (electricCost + waterCost)) * 100)
          : 0,
    });


    // ANALYTICS
    setAnalytics({
      monthly: mergeMonthlyAnalytics(
        waterAnalyticsRes.data.monthly,
        electricAnalyticsRes.data.monthly
      ),
      yearly: {
        water: waterAnalyticsRes.data.yearly,
        electricity: electricAnalyticsRes.data.yearly,
      },
    });
  };

  useEffect(() => {
    fetchBills();
  }, []);

  return {
    recentBills,
    spendingData,
    upcomingBills,
    statsData,
    latestAmounts,
    computedChanges,
    analytics,
    refreshBills: fetchBills,
  };
}
