import React from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';

export default function FloatingButton({ onOpen }) {
  const pulseAnim = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <View className="absolute bottom-6 right-6 z-50">
      <TouchableOpacity onPress={onOpen} activeOpacity={0.8}>
        <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
          <View className="relative">
            <View className="w-16 h-16 bg-blue-600 rounded-full items-center justify-center"
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 8,
              }}
            >
              <Text className="text-3xl">🤖</Text>
            </View>
            <View className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full items-center justify-center">
              <Text className="text-white text-xs font-bold">1</Text>
            </View>
          </View>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
}