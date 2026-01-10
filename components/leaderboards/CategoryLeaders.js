import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";

export default function CategoryLeaders({ categoryLeaders }) {
  const leaders = categoryLeaders || {
    Electricity: { avatar: "💡", name: "Alice", points: 1200 },
    Water: { avatar: "💧", name: "Bob", points: 950 },
    Internet: { avatar: "🌐", name: "Charlie", points: 1100 },
    Gas: { avatar: "🔥", name: "Diana", points: 800 },
    Maintenance: { avatar: "🛠️", name: "Eve", points: 700 },
  };

  // Color mapping for each category
  const categoryColors = {
    Electricity: { bg: "#fef3c7", border: "#fbbf24", text: "#92400e" },
    Water: { bg: "#dbeafe", border: "#3b82f6", text: "#1e40af" },
    Internet: { bg: "#e0e7ff", border: "#6366f1", text: "#3730a3" },
    Gas: { bg: "#fee2e2", border: "#ef4444", text: "#991b1b" },
    Maintenance: { bg: "#f3e8ff", border: "#a855f7", text: "#6b21a8" },
  };

  const getCategoryColor = (category) => {
    return categoryColors[category] || { bg: "#f1f5f9", border: "#94a3b8", text: "#475569" };
  };

  return (
    <View>
    
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{gap: 12 }}
      >
        {Object.entries(leaders).map(([category, leader], index) => {
          const colors = getCategoryColor(category);
          const isTopPerformer = index === 0;
          
          return (
            <TouchableOpacity
              key={category}
              activeOpacity={0.7}
              style={{
                backgroundColor: "white",
                borderRadius: 16,
                borderWidth: 2,
                borderColor: colors.border,
                padding: 16,
                width: 140,
                position: "relative",
                shadowColor: colors.border,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.15,
                shadowRadius: 8,
                elevation: 4,
              }}
            >
              {/* Top badge for best performer */}
              {isTopPerformer && (
                <View
                  style={{
                    position: "absolute",
                    top: -8,
                    right: 8,
                    backgroundColor: "#fbbf24",
                    borderRadius: 12,
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    borderWidth: 2,
                    borderColor: "white",
                  }}
                >
                  <Text style={{ fontSize: 10, fontWeight: "bold", color: "#78350f" }}>
                    TOP
                  </Text>
                </View>
              )}

              {/* Avatar with colored background */}
              <View
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 32,
                  backgroundColor: colors.bg,
                  alignItems: "center",
                  justifyContent: "center",
                  alignSelf: "center",
                  marginBottom: 12,
                  borderWidth: 2,
                  borderColor: colors.border + "40",
                }}
              >
                <Text style={{ fontSize: 36 }}>{leader.avatar}</Text>
              </View>

              {/* Category label */}
              <View
                style={{
                  backgroundColor: colors.bg,
                  borderRadius: 6,
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  alignSelf: "center",
                  marginBottom: 8,
                }}
              >
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: "700",
                    color: colors.text,
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                    textAlign: "center",
                  }}
                >
                  {category}
                </Text>
              </View>

              {/* Name */}
              <Text
                style={{
                  fontWeight: "bold",
                  color: "#0f172a",
                  fontSize: 15,
                  marginBottom: 6,
                  textAlign: "center",
                }}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {leader.name}
              </Text>

              {/* Points with trophy icon */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: colors.bg,
                  borderRadius: 8,
                  paddingVertical: 6,
                  paddingHorizontal: 10,
                }}
              >
                <Text style={{ fontSize: 14, marginRight: 4 }}>🏆</Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "700",
                    color: colors.text,
                  }}
                >
                  {leader.points.toLocaleString()}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}