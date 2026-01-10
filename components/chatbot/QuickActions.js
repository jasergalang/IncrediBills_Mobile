import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function QuickActions({
  quickActions = [],
  onAction,
  isMaximized,
}) {
  return (
    <View className={`bg-gradient-to-r from-slate-50 to-blue-50 border-t border-slate-200 ${isMaximized ? 'p-6' : 'p-3'}`}>
      <Text className={`text-slate-600 font-semibold mb-2 px-1 ${isMaximized ? 'text-base mb-4' : 'text-xs'}`}>
        Quick Actions:
      </Text>
      <View className={`flex-row flex-wrap ${isMaximized ? 'gap-4' : 'gap-2'}`}>
        {quickActions.map((action, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => onAction(action)}
            className={`bg-gradient-to-r ${action.color} rounded-xl items-center justify-center flex-row gap-2 ${
              isMaximized 
                ? 'px-6 py-4 flex-1 basis-[23%]' 
                : 'px-3 py-2 flex-1 basis-[48%]'
            }`}
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