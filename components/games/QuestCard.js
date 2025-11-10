import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function QuestCard({ quest }) {
    return (
        <View
            className="rounded-2xl border-2 p-4 mb-4"
            style={{
                backgroundColor: quest.bgColor,
                borderColor: quest.color,
                opacity: quest.completed ? 0.75 : 1,
            }}
        >
            <View className="flex-row gap-3 mb-4">
                {/* Monster Icon */}
                <View
                    className="w-16 h-16 rounded-xl items-center justify-center"
                    style={{ backgroundColor: quest.color }}
                >
                    <Text className="text-4xl">{quest.monsterIcon}</Text>
                </View>

                {/* Quest Details */}
                <View className="flex-1">
                    <Text className="text-lg font-bold text-slate-900 mb-1">
                        {quest.title}
                    </Text>
                    <Text className="text-sm text-slate-600 mb-2">
                        {quest.description}
                    </Text>
                    <View className="flex-row flex-wrap gap-2">
                        <View className="bg-white/60 px-2 py-1 rounded-full">
                            <Text className="text-xs font-semibold text-slate-700">
                                vs {quest.monster}
                            </Text>
                        </View>
                        <View
                            className={`px-2 py-1 rounded-full ${
                                quest.difficulty === "Easy"
                                    ? "bg-green-100"
                                    : quest.difficulty === "Medium"
                                    ? "bg-amber-100"
                                    : "bg-red-100"
                            }`}
                        >
                            <Text
                                className={`text-xs font-semibold ${
                                    quest.difficulty === "Easy"
                                        ? "text-green-700"
                                        : quest.difficulty === "Medium"
                                        ? "text-amber-700"
                                        : "text-red-700"
                                }`}
                            >
                                {quest.difficulty}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>

            {/* Reward & Deadline */}
            <View className="flex-row justify-between items-center mb-3">
                <View>
                    <Text className="text-2xl font-bold" style={{ color: quest.color }}>
                        +{quest.reward} XP
                    </Text>
                </View>
                <Text
                    className={`text-xs font-semibold ${
                        quest.completed ? "text-green-600" : "text-slate-600"
                    }`}
                >
                    {quest.deadline}
                </Text>
            </View>

            {/* Progress Bar */}
            <View className="mb-3">
                <View className="flex-row justify-between mb-2">
                    <Text className="text-sm font-semibold text-slate-700">Progress</Text>
                    <Text className="text-sm font-bold" style={{ color: quest.color }}>
                        {quest.progress}%
                    </Text>
                </View>
                <View className="h-2 bg-white/60 rounded-full overflow-hidden">
                    <View
                        className="h-full rounded-full"
                        style={{ width: `${quest.progress}%`, backgroundColor: quest.color }}
                    />
                </View>
            </View>

            {/* Action Buttons */}
            {quest.completed ? (
                <TouchableOpacity className="bg-green-600 py-3 rounded-xl flex-row items-center justify-center gap-2">
                    <Ionicons name="checkmark-circle" size={20} color="white" />
                    <Text className="text-white font-bold">Claim Reward</Text>
                </TouchableOpacity>
            ) : (
                <View className="flex-row gap-2">
                    <TouchableOpacity
                        className="flex-1 py-3 rounded-xl"
                        style={{ backgroundColor: quest.color }}
                    >
                        <Text className="text-white font-bold text-center">Continue Quest</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="px-4 py-3 bg-white border-2 border-slate-200 rounded-xl">
                        <Text className="text-slate-700 font-semibold">Details</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}