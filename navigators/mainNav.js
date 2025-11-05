import React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import HomeNavigator from "./homeNav";
import GameNavigator from "./gameNav";
import AnalyticsNavigator from "./analyticsNav";
import UploadNavigator from "./uploadNav";
import UserNavigator from "./userNav";

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const menuItems = [
    { icon: "home", label: "Dashboard", route: "Home" },
    {
      icon: "cloud-upload",
      label: "Upload Bills",
      route: "Upload",
      badge: null,
    },
    {
      icon: "game-controller",
      label: "Gamification",
      route: "Games",
      badge: "New",
    },
    {
      icon: "stats-chart",
      label: "Analytics",
      route: "Analytics",
      badge: null,
    },
    { icon: "person", label: "Profile", route: "Profile", badge: null },
  ];

  const currentRoute = props.state.routeNames[props.state.index];

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      {/* Logo & Brand */}
      <View className="p-6 border-b border-slate-200 flex-row items-center gap-3">
        <LinearGradient
          colors={["#2563eb", "#4f46e5"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="w-10 h-10 rounded-xl items-center justify-center"
        >
          <Text className="text-white font-bold text-xl">₿</Text>
        </LinearGradient>
        <View>
          <Text className="text-xl font-bold text-blue-600">IncrediBills</Text>
          <Text className="text-xs text-slate-500">Smart Bill Tracking</Text>
        </View>
      </View>

      {/* User Info */}
      <View className="p-4 border-b border-slate-200">
        <LinearGradient
          colors={["#eff6ff", "#e0e7ff"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="rounded-xl p-4 border border-blue-100"
        >
          <View className="flex-row items-center gap-3 mb-3">
            <LinearGradient
              colors={["#2563eb", "#4f46e5"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="w-12 h-12 rounded-full items-center justify-center"
            >
              <Text className="text-white font-bold text-lg">JD</Text>
            </LinearGradient>
            <View>
              <Text className="font-bold text-slate-900 text-sm">
                Juan Dela Cruz
              </Text>
              <Text className="text-xs text-slate-600">juan@email.com</Text>
            </View>
          </View>
          <View className="flex-row items-center justify-between">
            <View className="items-center flex-1">
              <Text className="text-lg font-bold text-blue-600">12</Text>
              <Text className="text-xs text-slate-600">Level</Text>
            </View>
            <View className="w-px h-8 bg-slate-200"></View>
            <View className="items-center flex-1">
              <Text className="text-lg font-bold text-green-600">850</Text>
              <Text className="text-xs text-slate-600">Points</Text>
            </View>
          </View>
        </LinearGradient>
      </View>

      {/* Menu */}
      <View className="p-4">
        {menuItems.map((item, idx) => {
          const isActive = currentRoute === item.route;
          return (
            <TouchableOpacity
              key={idx}
              onPress={() => props.navigation.navigate(item.route)}
              className={`flex-row items-center gap-3 px-4 py-3 rounded-xl mb-2 ${isActive ? "bg-blue-100" : ""}`}
            >
              <Ionicons
                name={item.icon}
                size={20}
                color={isActive ? "#2563eb" : "#475569"}
              />
              <Text
                className={`font-medium text-base flex-1 ${isActive ? "text-blue-700" : "text-slate-700"}`}
              >
                {item.label}
              </Text>
              {item.badge && (
                <View className="bg-blue-200 px-2 py-1 rounded-full">
                  <Text className="text-xs font-bold text-blue-700">
                    {item.badge}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Quick Stats */}
      <View className="p-4">
        <LinearGradient
          colors={["#f0fdf4", "#dcfce7"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="rounded-xl p-4 border border-green-100"
        >
          <View className="flex-row items-center gap-2 mb-2">
            <Text className="text-xl">💰</Text>
            <Text className="text-sm font-semibold text-slate-900">
              This Month
            </Text>
          </View>
          <Text className="text-2xl font-bold text-green-600 mb-1">₱2,340</Text>
          <View className="flex-row items-center gap-1">
            <Ionicons name="trending-up" size={14} color="#16a34a" />
            <Text className="text-xs text-green-600 font-semibold">
              Saved 23% vs last month
            </Text>
          </View>
        </LinearGradient>
      </View>
    </DrawerContentScrollView>
  );
}

export default function MainNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: { width: 260 },
      }}
    >
      <Drawer.Screen name="Home" component={HomeNavigator} />
      <Drawer.Screen name="Upload" component={UploadNavigator} />
      <Drawer.Screen name="Games" component={GameNavigator} />
      <Drawer.Screen name="Analytics" component={AnalyticsNavigator} />
      <Drawer.Screen name="Profile" component={UserNavigator} />
    </Drawer.Navigator>
  );
}
