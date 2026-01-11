import React from 'react'
import { View, Text } from 'react-native'
export default function RewardsHeader() {
    return (
        <View className="bg-white border-b border-slate-200 px-4 py-4">
            <Text className="text-2xl font-bold text-slate-900 mb-1">
                Rewards Store 🎁
            </Text>
            <Text className="text-sm text-slate-600">
                Redeem your hard-earned points for amazing rewards and discounts!
            </Text>
        </View>
    )
}
