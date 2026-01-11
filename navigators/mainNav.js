// import React, { useEffect } from "react";
// import { createDrawerNavigator, DrawerContentScrollView } from "@react-navigation/drawer";
// import { View, Text, TouchableOpacity, Alert } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { LinearGradient } from "expo-linear-gradient";
// import HomeNavigator from "./homeNav";
// import GameNavigator from "./gameNav";
// import AnalyticsNavigator from "./analyticsNav";
// import BillsNavigator from "./BillsNav";
// import UserNavigator from "./userNav";
// import PredictionNavigator from "./predictionNav";
// import { useAuth } from "../context/auth";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchUser } from '../redux/actions/user/userFetchAction';
// import LeaderboardsNavigator from "./leaderboardsNav";
// import SettingsNavigator from "./settingsNav";
// import RewardsNavigator from "./rewardsNav";

// const Drawer = createDrawerNavigator();

// function CustomDrawerContent(props) {
//   const menuItems = [
//     { icon: "home", label: "Dashboard", route: "Home" },
//     { icon: "cloud-upload", label: "Bills", route: "Upload", badge: null },
//     { icon: "cloud-upload", label: "Prediction", route: "Prediction", badge: null },
//     { icon: "game-controller", label: "Gamification", route: "Games", badge: "New" },
//     { icon: "stats-chart", label: "Analytics", route: "Analytics", badge: null },
//     { icon: "stats-chart", label: "Leaderboards", route: "Leaderboards", badge: null },
//     { icon: "game-controller", label: "Rewards", route: "Rewards", badge: null },
//     { icon: "person", label: "Settings", route: "Settings", badge: null },
//   ];

//   const { token, logout } = useAuth();
//   const dispatch = useDispatch();
//   const { userData } = useSelector((state) => state.user);

//   useEffect(() => {
//     if (token) {
//       dispatch(fetchUser(token));
//     }
//   }, [token]);

//   const currentRoute = props.state.routeNames[props.state.index];
//   const name = `${userData.firstName} ${userData.lastName}`.trim();


//   const handleLogout = () => {
//     Alert.alert("Logout", "Are you sure you want to logout?", [
//       { text: "Cancel", style: "cancel" },
//       {
//         text: "Logout",
//         style: "destructive",
//         onPress: () => {
//           logout();
//         },
//       },
//     ]);
//   };

//   return (
//     <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
//       {/* Logo */}
//       <View style={{ position: "absolute", right: -20, top: "50%", zIndex: 10 }}>
//         <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
//           <Ionicons name="chevron-forward-circle" size={32} color="#2563eb" />
//         </TouchableOpacity>
//       </View>
//       <View className="p-6 border-b border-slate-200 flex-row items-center gap-3">
//         <LinearGradient colors={["#2563eb", "#4f46e5"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} className="w-10 h-10 rounded-xl items-center justify-center">
//           <Text className="text-white font-bold text-xl">₿</Text>
//         </LinearGradient>
//         <View>
//           <Text className="text-xl font-bold text-blue-600">IncrediBills</Text>
//           <Text className="text-xs text-slate-500">Smart Bill Tracking</Text>
//         </View>
//       </View>

//       {/* User Info */}
//       <View className="p-4 border-b border-slate-200">
//         <LinearGradient colors={["#eff6ff", "#e0e7ff"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} className="rounded-xl p-4 border border-blue-100">
//           <View className="flex-row items-center gap-3 mb-3">
//             <LinearGradient colors={["#2563eb", "#4f46e5"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} className="w-12 h-12 rounded-full items-center justify-center">
//               <Text className="text-white font-bold text-lg">JD</Text>
//             </LinearGradient>
//             <View>
//               <Text className="font-bold text-slate-900 text-sm">{name}</Text>
//               <Text className="text-xs text-slate-600">{userData.email}</Text>
//             </View>
//           </View>
//           <View className="flex-row items-center justify-between">
//             <View className="items-center flex-1">
//               <Text className="text-lg font-bold text-blue-600">{userData.level}</Text>
//               <Text className="text-xs text-slate-600">Level</Text>
//             </View>
//             <View className="w-px h-8 bg-slate-200"></View>
//             <View className="items-center flex-1">
//               <Text className="text-lg font-bold text-green-600">{userData.points}</Text>
//               <Text className="text-xs text-slate-600">Points</Text>
//             </View>
//           </View>
//         </LinearGradient>
//       </View>

//       {/* Menu */}
//       <View className="p-4 flex-1">
//         {menuItems.map((item, idx) => {
//           const isActive = currentRoute === item.route;
//           return (
//             <TouchableOpacity
//               key={idx}
//               onPress={() => props.navigation.navigate(item.route)}
//               className={`flex-row items-center gap-3 px-4 py-3 rounded-xl mb-2 ${isActive ? "bg-blue-100" : ""}`}
//             >
//               <Ionicons name={item.icon} size={20} color={isActive ? "#2563eb" : "#475569"} />
//               <Text className={`font-medium text-base flex-1 ${isActive ? "text-blue-700" : "text-slate-700"}`}>{item.label}</Text>
//               {item.badge && (
//                 <View className="bg-blue-200 px-2 py-1 rounded-full">
//                   <Text className="text-xs font-bold text-blue-700">{item.badge}</Text>
//                 </View>
//               )}
//             </TouchableOpacity>
//           );
//         })}
//       </View>

//       {/* Logout Button */}
//       <View className="px-4 pb-6">
//         <TouchableOpacity
//           onPress={handleLogout}
//           className="bg-red-50 rounded-xl p-4 flex-row items-center justify-center border-2 border-red-200"
//           activeOpacity={0.7}
//         >
//           <View className="w-10 h-10 bg-red-100 rounded-lg items-center justify-center mr-3">
//             <Ionicons name="log-out-outline" size={22} color="#ef4444" />
//           </View>
//           <Text className="text-red-600 font-bold text-base">
//             Logout
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </DrawerContentScrollView>
//   );
// }

// export default function MainNavigator() {
//   return (
//     <Drawer.Navigator
//       drawerContent={(props) => <CustomDrawerContent {...props} />}
//       screenOptions={{ headerShown: false, drawerStyle: { width: 260 } }}
//     >
//       <Drawer.Screen name="Home" component={HomeNavigator} />
//       <Drawer.Screen name="Upload" component={BillsNavigator} />
//       <Drawer.Screen name="Prediction" component={PredictionNavigator} />
//       <Drawer.Screen name="Games" component={GameNavigator} />
//       <Drawer.Screen name="Analytics" component={AnalyticsNavigator} />
//       <Drawer.Screen name="Leaderboards" component={LeaderboardsNavigator} />
//       <Drawer.Screen name="Rewards" component={RewardsNavigator} />
//       <Drawer.Screen name="Settings" component={SettingsNavigator} />
//     </Drawer.Navigator>
//   );
// }
import React, { useEffect } from "react";
import { createDrawerNavigator, DrawerContentScrollView } from "@react-navigation/drawer";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import HomeNavigator from "./homeNav";
import GameNavigator from "./gameNav";
import AnalyticsNavigator from "./analyticsNav";
import BillsNavigator from "./BillsNav";
import UserNavigator from "./userNav";
import PredictionNavigator from "./predictionNav";
import { useAuth } from "../context/auth";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from '../redux/actions/user/userFetchAction';
import LeaderboardsNavigator from "./leaderboardsNav";
import SettingsNavigator from "./settingsNav";
import RewardsNavigator from "./rewardsNav";

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const menuItems = [
    { icon: "🏠", label: "Dashboard", route: "Home" },
    { icon: "📊", label: "Bills", route: "Upload", badge: null },
    { icon: "🎯", label: "Prediction", route: "Prediction", badge: null },
    { icon: "🎮", label: "Gamification", route: "Games", badge: "New" },
    { icon: "📈", label: "Analytics", route: "Analytics", badge: null },
    { icon: "🏆", label: "Leaderboards", route: "Leaderboards", badge: null },
    { icon: "🎁", label: "Rewards", route: "Rewards", badge: null },
    { icon: "⚙️", label: "Settings", route: "Settings", badge: null },
  ];

  const { token, logout } = useAuth();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    if (token) {
      dispatch(fetchUser(token));
    }
  }, [token]);

  const currentRoute = props.state.routeNames[props.state.index];
  const name = `${userData.firstName} ${userData.lastName}`.trim();


  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => {
          logout();
        },
      },
    ]);
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      {/* Toggle Button */}
      <View style={{ position: "absolute", right: -20, top: "50%", zIndex: 10 }}>
        <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
          <View className="w-8 h-8 bg-blue-600 rounded-full items-center justify-center">
            <Text className="text-white text-xl">›</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Logo */}
      <View className="p-6 border-b border-slate-200 flex-row items-center gap-3">
        <LinearGradient colors={["#2563eb", "#4f46e5"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} className="w-10 h-10 rounded-xl items-center justify-center">
          <Text className="text-white font-bold text-xl">₿</Text>
        </LinearGradient>
        <View>
          <Text className="text-xl font-bold text-blue-600">IncrediBills</Text>
          <Text className="text-xs text-slate-500">Smart Bill Tracking</Text>
        </View>
      </View>

      {/* User Info */}
      <View className="p-4 border-b border-slate-200">
        <LinearGradient colors={["#eff6ff", "#e0e7ff"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} className="rounded-xl p-4 border border-blue-100">
          <View className="flex-row items-center gap-3 mb-3">
            <LinearGradient colors={["#2563eb", "#4f46e5"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} className="w-12 h-12 rounded-full items-center justify-center">
              <Text className="text-white font-bold text-lg">JD</Text>
            </LinearGradient>
            <View>
              <Text className="font-bold text-slate-900 text-sm">{name}</Text>
              <Text className="text-xs text-slate-600">{userData.email}</Text>
            </View>
          </View>
          <View className="flex-row items-center justify-between">
            <View className="items-center flex-1">
              <Text className="text-lg font-bold text-blue-600">{userData.level}</Text>
              <Text className="text-xs text-slate-600">Level</Text>
            </View>
            <View className="w-px h-8 bg-slate-200"></View>
            <View className="items-center flex-1">
              <Text className="text-lg font-bold text-green-600">{userData.points}</Text>
              <Text className="text-xs text-slate-600">Points</Text>
            </View>
          </View>
        </LinearGradient>
      </View>

      {/* Menu */}
      <View className="p-4 flex-1">
        {menuItems.map((item, idx) => {
          const isActive = currentRoute === item.route;
          return (
            <TouchableOpacity
              key={idx}
              onPress={() => props.navigation.navigate(item.route)}
              className={`flex-row items-center gap-3 px-4 py-2 rounded-xl mb-2 ${isActive ? "bg-blue-100" : ""}`}
            >
              <Text style={{ fontSize: 20 }}>{item.icon}</Text>
              <Text className={`font-medium text-base flex-1 ${isActive ? "text-blue-700" : "text-slate-700"}`}>{item.label}</Text>
              {item.badge && (
                <View className="bg-blue-200 px-2 py-1 rounded-full">
                  <Text className="text-xs font-bold text-blue-700">{item.badge}</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Logout Button */}
      <View className="px-4 pb-6">
        <TouchableOpacity
          onPress={handleLogout}
          className="bg-red-50 rounded-xl p-4 flex-row items-center justify-center border-2 border-red-200"
          activeOpacity={0.7}
        >
          <View className="w-10 h-10 bg-red-100 rounded-lg items-center justify-center mr-3">
            <Text style={{ fontSize: 22 }}>🚪</Text>
          </View>
          <Text className="text-red-600 font-bold text-base">
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

export default function MainNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{ headerShown: false, drawerStyle: { width: 260 } }}
    >
      <Drawer.Screen name="Home" component={HomeNavigator} />
      <Drawer.Screen name="Upload" component={BillsNavigator} />
      <Drawer.Screen name="Prediction" component={PredictionNavigator} />
      <Drawer.Screen name="Games" component={GameNavigator} />
      <Drawer.Screen name="Analytics" component={AnalyticsNavigator} />
      <Drawer.Screen name="Leaderboards" component={LeaderboardsNavigator} />
      <Drawer.Screen name="Rewards" component={RewardsNavigator} />
      <Drawer.Screen name="Settings" component={SettingsNavigator} />
    </Drawer.Navigator>
  );
}