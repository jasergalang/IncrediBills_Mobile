// import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function HomeHeader({ navigation, userData, unreadCount = 0, onBellPress }) {
  return (
    <View className="bg-white border-b border-slate-200 px-4 py-4">
      <View className="flex-row items-center justify-between">

        {/* Left: Greeting */}
        <View className="flex-1 pr-3">
          <Text className="text-2xl font-bold text-slate-900">
            Welcome back, {userData?.firstName}! 👋
          </Text>
          <Text className="text-sm text-slate-600">
            Here's what's happening with your bills today.
          </Text>
        </View>

        {/* Right: Actions */}
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>

          {/* Bell: view notification history */}
          <TouchableOpacity
            onPress={onBellPress}
            style={{
              position: "relative",
              width: 40,
              height: 40,
              borderRadius: 12,
              backgroundColor: "#dbeafe",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 20 }}>🔔</Text>

            {/* Unread badge */}
            {unreadCount > 0 && (
              <View
                style={{
                  position: "absolute",
                  top: 2,
                  right: 2,
                  minWidth: 16,
                  height: 16,
                  backgroundColor: "#ef4444",
                  borderRadius: 8,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingHorizontal: 3,
                  borderWidth: 1.5,
                  borderColor: "white",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 9,
                    fontWeight: "bold",
                    lineHeight: 12,
                  }}
                >
                  {unreadCount > 99 ? "99+" : unreadCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>

          {/* Drawer toggle */}
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              backgroundColor: "#f1f5f9",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 20 }}>☰</Text>
          </TouchableOpacity>

        </View>
      </View>
    </View>
  );
}