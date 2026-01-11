import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { X, Minimize2, Maximize2 } from 'lucide-react-native';

export default function ChatHeader({ title, onClose, onMaximize, isMaximized }) {
  return (
    <View className="bg-blue-600 p-4">
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center gap-3">
          <View className="relative">
            <View 
              className="bg-white/20 rounded-full items-center justify-center"
              style={{ width: isMaximized ? 64 : 48, height: isMaximized ? 64 : 48 }}
            >
              <Text className={isMaximized ? 'text-4xl' : 'text-2xl'}>🤖</Text>
            </View>
            <View className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
          </View>
          <View>
            <Text className="font-bold text-lg text-white">{title}</Text>
            <Text className="text-xs text-blue-100">Online • Always here to help</Text>
          </View>
        </View>

        <View className="flex-row gap-2">
          {onMaximize && (
            <TouchableOpacity
              onPress={onMaximize}
              className="w-8 h-8 bg-white/20 rounded-lg items-center justify-center"
            >
              {isMaximized ? <Minimize2 size={16} color="white" /> : <Maximize2 size={16} color="white" />}
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={onClose}
            className="w-8 h-8 bg-white/20 rounded-lg items-center justify-center"
          >
            <X size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <View className="flex-row gap-2">
        <View className="flex-1 bg-white/20 rounded-lg px-3 py-2">
          <Text className="font-bold text-white text-xs">24/7</Text>
          <Text className="text-blue-100 text-xs">Available</Text>
        </View>
        <View className="flex-1 bg-white/20 rounded-lg px-3 py-2">
          <Text className="font-bold text-white text-xs">Instant</Text>
          <Text className="text-blue-100 text-xs">Response</Text>
        </View>
        <View className="flex-1 bg-white/20 rounded-lg px-3 py-2">
          <Text className="font-bold text-white text-xs">Smart</Text>
          <Text className="text-blue-100 text-xs">AI Helper</Text>
        </View>
      </View>
    </View>
  );
}