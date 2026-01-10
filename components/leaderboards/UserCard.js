// components/leaderboards/UserCard.js
import React from "react";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function UserCard({ currentUser }) {
  const {
    avatar = "🙂",
    level = 1,
    rank = 1,
    badges = [],
    points = 0,
    monstersDefeated = 0,
    streak = 0,
    savings = 0,
  } = currentUser;

  const fmt = (n) => Number(n ?? 0).toLocaleString();

  return (
    <LinearGradient
      colors={["#2563eb", "#7c3aed", "#a78bfa"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        borderRadius: 20,
        padding: 20,
        marginBottom: 16,
      }}
    >
      {/* Top Section: Avatar + Rank + Badges */}
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {/* Avatar */}
          <View style={{ marginRight: 16 }}>
            <View
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                backgroundColor: "rgba(255,255,255,0.2)",
                borderWidth: 3,
                borderColor: "rgba(255,255,255,0.4)",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 36, color: "white" }}>{avatar}</Text>
            </View>
            <View
              style={{
                position: "absolute",
                bottom: -5,
                right: -5,
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: "#f59e0b",
                borderWidth: 2,
                borderColor: "white",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>{level}</Text>
            </View>
          </View>

          {/* Rank and badges */}
          <View>
            <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
              Your Rank: #{rank}
            </Text>
            <Text style={{ color: "rgba(255,255,255,0.8)", marginTop: 4 }}>
              Keep pushing to reach the top!
            </Text>

            {/* Badges */}
            <View style={{ flexDirection: "row", marginTop: 8 }}>
              {badges.map((badge, index) => (
                <View
                  key={index}
                  style={{
                    width: 32,
                    height: 32,
                    backgroundColor: "rgba(255,255,255,0.2)",
                    borderRadius: 8,
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 8,
                  }}
                >
                  <Text style={{ fontSize: 18, color: "white" }}>{badge}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>

      {/* Stats Section */}
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          marginTop: 16,
          justifyContent: "space-between",
        }}
      >
        <Stat label="Points" value={fmt(points)} />
        <Stat label="Monsters" value={monstersDefeated} />
        <Stat label="Streak" value={`${streak} days`} />
        <Stat label="Saved" value={`₱${fmt(savings)}`} />
      </View>
    </LinearGradient>
  );
}

function Stat({ label, value }) {
  return (
    <View
      style={{
        width: "48%",
        backgroundColor: "rgba(255,255,255,0.1)",
        borderRadius: 12,
        padding: 12,
        alignItems: "center",
        marginBottom: 8,
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
        {value}
      </Text>
      <Text style={{ fontSize: 12, color: "rgba(255,255,255,0.8)", marginTop: 2 }}>
        {label}
      </Text>
    </View>
  );
}
