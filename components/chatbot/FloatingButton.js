import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Animated, PanResponder, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const BUTTON_SIZE = 64;
const MARGIN = 6;

export default function FloatingButton({ onOpen }) {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const pan = useRef(new Animated.ValueXY({
    x: SCREEN_WIDTH - BUTTON_SIZE - MARGIN * 2,
    y: SCREEN_HEIGHT - BUTTON_SIZE - MARGIN * 2
  })).current;
  
  const [isDragging, setIsDragging] = useState(false);

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

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      
      onPanResponderGrant: () => {
        setIsDragging(true);
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
        pan.setValue({ x: 0, y: 0 });
      },
      
      onPanResponderMove: Animated.event(
        [null, { dx: pan.x, dy: pan.y }],
        { useNativeDriver: false }
      ),
      
      onPanResponderRelease: (_, gesture) => {
        pan.flattenOffset();
        
        // Check if it was a tap (minimal movement)
        const isClick = Math.abs(gesture.dx) < 5 && Math.abs(gesture.dy) < 5;
        
        if (isClick) {
          onOpen();
        }
        
        // Snap to edges with animation
        const finalX = pan.x._value;
        const finalY = pan.y._value;
        
        // Constrain to screen bounds
        const maxX = SCREEN_WIDTH - BUTTON_SIZE;
        const maxY = SCREEN_HEIGHT - BUTTON_SIZE;
        
        const constrainedX = Math.max(0, Math.min(finalX, maxX));
        const constrainedY = Math.max(0, Math.min(finalY, maxY));
        
        Animated.spring(pan, {
          toValue: { x: constrainedX, y: constrainedY },
          useNativeDriver: false,
          friction: 7,
          tension: 40,
        }).start(() => {
          setIsDragging(false);
        });
      },
    })
  ).current;

  return (
    <Animated.View
      style={{
        position: 'absolute',
        transform: [
          { translateX: pan.x },
          { translateY: pan.y },
        ],
        zIndex: 50,
      }}
      {...panResponder.panHandlers}
    >
      <Animated.View style={{ transform: [{ scale: isDragging ? 1.05 : pulseAnim }] }}>
        <View className="relative">
          <View 
            className="w-16 h-16 bg-blue-600 rounded-full items-center justify-center"
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
    </Animated.View>
  );
}