// import React, { useState, useCallback, useEffect } from "react";
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { ScrollView, StatusBar } from "react-native";
// import BillsHeader from "../../components/bills/billCategories/BillsHeader";
// import BillsTotalCard from "../../components/bills/billCategories/BillsTotalCard";
// import BillsUtilitiesGrid from "../../components/bills/billCategories/BillsUtilitiesGrid";
// import BillsTrendsChart from "../../components/bills/billCategories/BillsTrendChart";
// import BillsRecentSection from "../../components/bills/billCategories/BillsRecentSection";
// import { utilities } from "../../constants/utilities";
// import { useFocusEffect } from "@react-navigation/native";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchBills } from "../../redux/actions/bills/fetchBillsAction";
// import { useAuth } from "../../context/auth";
// export default function BillCategories({ navigation }) {
//   const [activeTab, setActiveTab] = useState("all");
//   const [timeRange, setTimeRange] = useState("month");
//   const dispatch = useDispatch();
//   const { token } = useAuth();
//   const {
//     latestAmounts,
//     computedChanges,
//     recentBills,
//     upcomingBills,
//     categories,
//     statsData,
//     analytics,
//     loading,
//     error,
//   } = useSelector((state) => state.bills);

//   useEffect(() => {
//     dispatch(fetchBills(token)); 
//   }, [dispatch, token]);


//   const filteredBills =
//     activeTab === "all"
//       ? recentBills
//       : recentBills.filter((bill) => bill.type === activeTab);

//   // ✔ Compute total for all utilities
//   const totalAmount = Object.values(latestAmounts).reduce((total, num) => total + num, 0);
//   const totalChange = Object.values(computedChanges).reduce((total, num) => total + parseFloat(num), 0);

//   // ✔ Fill utilities with dynamic amounts & changes
//   const dynamicUtilities = utilities.map((u) => ({
//     ...u,
//     amount: latestAmounts[u.id] || 0,
//     change: computedChanges[u.id] || 0
//   }));

//   const handleCategoryPress = (category) => {
//     const routes = {
//       water: "WaterBills",
//       electricity: "ElectricBills",
//       fuel: "TransportBills",
//       gas: "KitchenGasBills",
//       grocery: "GroceryBills",
//     };
//     navigation.navigate(routes[category.id] || "BillCategories", { category });
//   };

//   useFocusEffect(
//     useCallback(() => {
//       dispatch(fetchBills(token));
//     }, [])
//   );

//   return (
//     <SafeAreaView className="flex-1 bg-slate-50">
//       <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
//       <BillsHeader navigation={navigation}/>
//       <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
//         <BillsTotalCard totalAmount={totalAmount} totalChange={totalChange} />
//         <BillsUtilitiesGrid
//           utilities={dynamicUtilities}
//           onPress={handleCategoryPress}
//         />
//         <BillsTrendsChart
//           totalChange={totalChange}
//           timeRange={timeRange}
//           setTimeRange={setTimeRange}
//           monthlyData={analytics.monthly}
//         />
//         <BillsRecentSection
//           activeTab={activeTab}
//           setActiveTab={setActiveTab}
//           utilities={utilities}
//           recentBills={recentBills}
//           filteredBills={filteredBills}
//         />
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

import React, { useState, useCallback } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, StatusBar } from "react-native";
import BillsHeader from "../../components/bills/billCategories/BillsHeader";
import BillsTotalCard from "../../components/bills/billCategories/BillsTotalCard";
import BillsUtilitiesGrid from "../../components/bills/billCategories/BillsUtilitiesGrid";
import BillsTrendsChart from "../../components/bills/billCategories/BillsTrendChart";
import BillsRecentSection from "../../components/bills/billCategories/BillsRecentSection";
import { utilities } from "../../constants/utilities";
import { useFocusEffect } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { fetchBills } from "../../redux/slices/bills/billSlice"; 
import { useAuth } from "../../context/auth";

export default function BillCategories({ navigation }) {
  const [activeTab, setActiveTab] = useState("all");
  const [timeRange, setTimeRange] = useState("month");

  const dispatch = useDispatch();
  const { token } = useAuth();

  const {
    latestAmounts,
    computedChanges,
    recentBills,
    upcomingBills,
    categories,
    statsData,
    analytics,
    loading,
    error,
  } = useSelector((state) => state.bills); // ✅ use new slice state

  // Fetch bills once on mount
  React.useEffect(() => {
    if (token) dispatch(fetchBills());
  }, [dispatch, token]);

  // Refetch on focus
  useFocusEffect(
    useCallback(() => {
      if (token) dispatch(fetchBills());
    }, [dispatch, token])
  );

  // Filter bills by active tab
  const filteredBills =
    activeTab === "all"
      ? recentBills
      : recentBills.filter((bill) => bill.type === activeTab);

  // Total amounts and changes
  const totalAmount = Object.values(latestAmounts || {}).reduce((total, num) => total + num, 0);
  const totalChange = Object.values(computedChanges || {}).reduce((total, num) => total + parseFloat(num || 0), 0);

  // Map utilities dynamically with latest data
  const dynamicUtilities = utilities.map((u) => ({
    ...u,
    amount: latestAmounts?.[u.id] || 0,
    change: computedChanges?.[u.id] || 0,
  }));

  const handleCategoryPress = (category) => {
    const routes = {
      water: "WaterBills",
      electricity: "ElectricBills",
      fuel: "TransportBills",
      gas: "KitchenGasBills",
      grocery: "GroceryBills",
    };
    navigation.navigate(routes[category.id] || "BillCategories", { category });
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
      <BillsHeader navigation={navigation} />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <BillsTotalCard totalAmount={totalAmount} totalChange={totalChange} />
        <BillsUtilitiesGrid utilities={dynamicUtilities} onPress={handleCategoryPress} />
        <BillsTrendsChart
          totalChange={totalChange}
          timeRange={timeRange}
          setTimeRange={setTimeRange}
          monthlyData={analytics?.monthly || []}
        />
        <BillsRecentSection
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          utilities={utilities}
          recentBills={recentBills || []}
          filteredBills={filteredBills || []}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
