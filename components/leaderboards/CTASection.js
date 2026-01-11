import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function CTASection({ navigation }) {
  return (
    <View className="mb-2">
      <TouchableOpacity onPress={() => navigation.navigate("Games")}>
        <LinearGradient
          colors={["#9333ea", "#c4a5f8"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="rounded-xl p-5"
        >
          {/* Rocket positioned at top right */}
          <View className="absolute top-3 right-3">
            <Text className="text-7xl">🚀</Text>
          </View>

          <View>
            <Text className="text-white font-bold text-lg mb-1 pr-16">
              Climb the Leaderboard!
            </Text>
            <Text className="text-white/80 text-sm mb-4 pr-16">
              Complete more quests, defeat pollution monsters, and save on your bills
              to earn points and rise through the ranks!
            </Text>

            {/* Buttons in a row */}
            <View className="flex-row gap-2">
              {/* View Rewards */}
              <TouchableOpacity
                onPress={() => navigation.navigate("Games")}
                className="bg-white px-4 py-3 rounded-lg flex-1"
              >
                <Text className="text-purple-700 font-semibold text-sm text-center">
                  View Active Quests
                </Text>
              </TouchableOpacity>

              {/* Invite Friends */}
              <TouchableOpacity
                onPress={() => navigation.navigate("InviteFriends")}
                className="border border-white px-4 py-3 rounded-lg flex-1 flex-row items-center justify-center"
              >
                <Ionicons name="person-add-outline" size={16} color="#fff" />
                <Text className="text-white font-semibold text-sm ml-1">
                  Invite
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}