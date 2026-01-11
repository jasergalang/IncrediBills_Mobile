import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';

export default function TypingIndicator() {
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animateDot = (dot, delay) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(dot, {
            toValue: -10,
            duration: 400,
            delay,
            useNativeDriver: true,
          }),
          Animated.timing(dot, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    animateDot(dot1, 0);
    animateDot(dot2, 200);
    animateDot(dot3, 400);
  }, []);

  return (
    <View className="flex-row justify-start">
      <View className="bg-slate-100 rounded-2xl px-4 py-3">
        <View className="flex-row gap-1">
          <Animated.View
            style={{ transform: [{ translateY: dot1 }] }}
            className="w-2 h-2 bg-slate-400 rounded-full"
          />
          <Animated.View
            style={{ transform: [{ translateY: dot2 }] }}
            className="w-2 h-2 bg-slate-400 rounded-full"
          />
          <Animated.View
            style={{ transform: [{ translateY: dot3 }] }}
            className="w-2 h-2 bg-slate-400 rounded-full"
          />
        </View>
      </View>
    </View>
  );
}