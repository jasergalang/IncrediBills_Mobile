import React from 'react'
import { View, Text } from 'react-native'

export default function PointsSummary({ userPoints }) {
    return (
        <View className="mb-6">
            {/* Row 1 */}
            <View className="flex-row gap-4 mb-4">
                {/* Available Points */}
                <View className="flex-1 bg-blue-600 rounded-2xl p-5 border border-blue-500 justify-between" style={{ minHeight: 140 }}>
                    <View className="flex-row items-center justify-between mb-3">
                        <Text className="text-3xl">⭐</Text>
                        <View className="px-3 py-1.5 rounded-full bg-blue-500">
                            <Text className="text-xs font-semibold text-white">
                                Available
                            </Text>
                        </View>
                    </View>

                    <View>
                        <Text className="text-3xl font-bold text-white mb-1">
                            {userPoints.available?.toLocaleString() || 0}
                        </Text>
                        <Text className="text-sm text-blue-100">
                            Points to spend
                        </Text>
                    </View>
                </View>

                {/* Lifetime Points */}
                <View className="flex-1 bg-white rounded-2xl p-5 border border-slate-200 justify-between" style={{ minHeight: 140 }}>
                    <View className="flex-row items-center justify-between mb-3">
                        <Text className="text-3xl">💎</Text>
                        <View className="px-3 py-1.5 rounded-full bg-slate-100">
                            <Text className="text-xs font-semibold text-slate-600">
                                Lifetime
                            </Text>
                        </View>
                    </View>

                    <View>
                        <Text className="text-3xl font-bold text-slate-900 mb-1">
                            {userPoints.lifetime?.toLocaleString() || 0}
                        </Text>
                        <Text className="text-sm text-slate-500">
                            Total Earned
                        </Text>
                    </View>
                </View>
            </View>

            {/* Row 2 */}
            <View className="flex-row gap-4">
                {/* Redeemed */}
                <View className="flex-1 bg-white rounded-2xl p-5 border border-slate-200 justify-between" style={{ minHeight: 140 }}>
                    <View className="flex-row items-center justify-between mb-3">
                        <Text className="text-3xl">🎯</Text>
                        <View className="px-3 py-1.5 rounded-full bg-slate-100">
                            <Text className="text-xs font-semibold text-slate-600">
                                Redeemed
                            </Text>
                        </View>
                    </View>

                    <View>
                        <Text className="text-3xl font-bold text-green-500 mb-1">
                            {userPoints.spent?.toLocaleString() || 0}
                        </Text>
                        <Text className="text-sm text-slate-500">
                            Points Spent
                        </Text>
                    </View>
                </View>

                {/* Accuracy */}
                <View className="flex-1 bg-white rounded-2xl p-5 border border-slate-200 justify-between" style={{ minHeight: 140 }}>
                    <View className="flex-row items-center justify-between mb-3">
                        <Text className="text-3xl">📊</Text>
                        <View className="px-3 py-1.5 rounded-full bg-slate-100">
                            <Text className="text-xs font-semibold text-slate-600">
                                Accuracy
                            </Text>
                        </View>
                    </View>

                    <View>
                        <Text className="text-3xl font-bold text-blue-600 mb-1">
                            {userPoints.accuracy || 0}%
                        </Text>
                        <Text className="text-sm text-slate-500">
                            Confidence
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    )
}