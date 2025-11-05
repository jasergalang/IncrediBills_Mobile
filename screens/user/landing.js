import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

export default function Landing() {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* HEADER */}
        <View className="flex-row items-center justify-center pt-12 pb-6">
          <LinearGradient
            colors={["#2563eb", "#4f46e5"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="w-12 h-12 rounded-xl items-center justify-center shadow-lg mr-3"
          >
            <Text className="text-white font-bold text-2xl">₿</Text>
          </LinearGradient>
          <Text className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
            IncrediBills
          </Text>
        </View>

        {/* MAIN CONTENT */}
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-3xl font-bold text-slate-900 text-center mb-4">
            Welcome to IncrediBills!
          </Text>
          <Text className="text-base text-slate-600 text-center mb-8">
            Track, predict, and manage your bills with AI-powered insights and
            gamified savings. Join thousands of Filipino families making bill
            management fun and rewarding!
          </Text>

          {/* Features List */}
          <View className="w-full max-w-md mb-10">
            <View className="flex-row items-center mb-4">
              <View className="w-8 h-8 bg-green-500 rounded-xl flex items-center justify-center mr-3">
                <Text className="text-white text-xl">📊</Text>
              </View>
              <Text className="text-slate-700 text-base font-medium">
                AI-powered bill prediction
              </Text>
            </View>
            <View className="flex-row items-center mb-4">
              <View className="w-8 h-8 bg-blue-500 rounded-xl flex items-center justify-center mr-3">
                <Text className="text-white text-xl">🎮</Text>
              </View>
              <Text className="text-slate-700 text-base font-medium">
                Gamified savings & rewards
              </Text>
            </View>
            <View className="flex-row items-center mb-4">
              <View className="w-8 h-8 bg-indigo-500 rounded-xl flex items-center justify-center mr-3">
                <Text className="text-white text-xl">⚡</Text>
              </View>
              <Text className="text-slate-700 text-base font-medium">
                Track bills in seconds
              </Text>
            </View>
            <View className="flex-row items-center mb-4">
              <View className="w-8 h-8 bg-purple-500 rounded-xl flex items-center justify-center mr-3">
                <Text className="text-white text-xl">🔒</Text>
              </View>
              <Text className="text-slate-700 text-base font-medium">
                Secure & private data
              </Text>
            </View>
          </View>

          {/* ACTION BUTTONS */}
          <View className="w-full max-w-xs">
            {/* Log In Button - Blue Gradient */}
            <LinearGradient
              colors={["#2563eb", "#4f46e5"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="rounded-xl mb-4 shadow-lg"
            >
              <TouchableOpacity
                className="py-4 items-center"
                onPress={() => navigation.navigate("Login")}
                activeOpacity={0.85}
              >
                <Text className="text-white text-lg font-semibold">Log In</Text>
              </TouchableOpacity>
            </LinearGradient>
            {/* Sign Up Button - Green Gradient */}
            <LinearGradient
              colors={["#22c55e", "#16a34a"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="rounded-xl shadow-lg"
            >
              <TouchableOpacity
                className="py-4 items-center"
                onPress={() => navigation.navigate("Register")}
                activeOpacity={0.85}
              >
                <Text className="text-white text-lg font-semibold">
                  Sign Up
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>

        {/* FOOTER */}
        <View className="items-center py-8">
          <Text className="text-slate-400 text-xs text-center">
            &copy; 2025 IncrediBills. Made with 💚 for Filipino families.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
