import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function QuickActions({ quickActions = [], onAction, isMaximized }) {
  return (
    <View className={`bg-white border-t border-slate-200 ${isMaximized ? 'p-6' : 'p-3'}`}>
      <Text className={`text-slate-700 font-semibold mb-2 px-1 ${isMaximized ? 'text-base mb-4' : 'text-xs'}`}>
        Quick Actions:
      </Text>
      <View className={`flex-row flex-wrap ${isMaximized ? 'gap-4' : 'gap-2'}`}>
        {quickActions.map((action, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => onAction(action)}
            className="bg-blue-600 rounded-xl items-center justify-center flex-row gap-2"
            style={{
              paddingHorizontal: isMaximized ? 24 : 12,
              paddingVertical: isMaximized ? 16 : 10,
              flex: 1,
              flexBasis: isMaximized ? '23%' : '48%',
            }}
            activeOpacity={0.8}
          >
            <Text className={isMaximized ? 'text-2xl' : 'text-base'}>
              {action.icon}
            </Text>
            <Text className={`text-white font-semibold ${isMaximized ? 'text-base' : 'text-xs'}`}>
              {action.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
