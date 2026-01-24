// import React from "react";
// import { View, Text } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";

// export default function ElectricTips() {
//   return (
//     <View className="px-4 pb-6">
//       <LinearGradient
//         colors={["#fef3c7", "#fde68a"]}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 1 }}
//         className="rounded-2xl p-4 border-2 border-amber-200"
//       >
//         <View className="flex-row items-start gap-3">
//           <View className="w-10 h-10 bg-amber-500 rounded-xl items-center justify-center">
//             <Text className="text-2xl">💡</Text>
//           </View>
//           <View className="flex-1">
//             <Text className="text-sm font-bold text-amber-900 mb-2">
//               Pro Tips
//             </Text>
//             <Text className="text-xs text-amber-700 mb-1">
//               • Ensure the bill is clearly visible and readable
//             </Text>
//             <Text className="text-xs text-amber-700 mb-1">
//               • Use good lighting when taking photos
//             </Text>
//             <Text className="text-xs text-amber-700">
//               • Supported formats: PNG, JPG, PDF
//             </Text>
//           </View>
//         </View>
//       </LinearGradient>
//     </View>
//   );
// }
// components/bills/uploadBills/electricBills/ElectricTips.js

import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, Alert, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import fastAPI_Url from "../../../../assets/common/fastAPI_Url";

export default function ElectricTips({ recommendations }) {
  const [speaking, setSpeaking] = useState(null);
  const [loading, setLoading] = useState(null);
  const audioRef = useRef(null);

  const getImpactColor = (impact) => {
    switch (impact?.toLowerCase()) {
      case 'high':
        return { bg: 'bg-emerald-100', text: 'text-emerald-700', border: 'border-emerald-300' };
      case 'medium':
        return { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-300' };
      case 'low':
        return { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-300' };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-300' };
    }
  };

  const getImpactIcon = (impact) => {
    switch (impact?.toLowerCase()) {
      case 'high': return '🔥';
      case 'medium': return '⚡';
      case 'low': return '💡';
      default: return '💡';
    }
  };

  const speakTextWithAPI = async (text, index) => {
    // If already speaking this index, stop it
    if (speaking === index) {
      if (audioRef.current) {
        try {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        } catch (e) {
          console.log('Error stopping audio:', e);
        }
        audioRef.current = null;
      }
      setSpeaking(null);
      setLoading(null);
      return;
    }

    // Stop any other audio playing
    if (audioRef.current) {
      try {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      } catch (e) {
        console.log('Error stopping previous audio:', e);
      }
      audioRef.current = null;
    }

    setLoading(index);
    setSpeaking(null);

    try {
      console.log('🔊 Calling FastAPI TTS:', `${fastAPI_Url}/tts/generate`);
      console.log('📝 Text to speak:', text.substring(0, 50) + '...');
      
      const response = await fetch(`${fastAPI_Url}/tts/generate`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "audio/mpeg"
        },
        body: JSON.stringify({
          text: text,
          lang: "tl", // Filipino/Tagalog
          slow: false, // Fast speech
        }),
      });

      console.log('📡 TTS Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ TTS Error response:', errorText);
        throw new Error(`TTS API failed: ${response.status}`);
      }

      const blob = await response.blob();
      console.log('🎵 Audio blob size:', blob.size, 'bytes');
      
      // Create audio URL from blob
      const audioUrl = URL.createObjectURL(blob);
      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      audio.onplay = () => {
        console.log('✅ Audio playback started');
        setSpeaking(index);
        setLoading(null);
      };

      audio.onended = () => {
        console.log('🎵 Audio playback finished');
        setSpeaking(null);
        setLoading(null);
        if (audioRef.current) {
          URL.revokeObjectURL(audioUrl);
          audioRef.current = null;
        }
      };

      audio.onerror = (error) => {
        console.error('❌ Audio playback error:', error);
        setSpeaking(null);
        setLoading(null);
        if (audioRef.current) {
          URL.revokeObjectURL(audioUrl);
          audioRef.current = null;
        }
        Alert.alert("Error", "Failed to play audio. Please try again.");
      };

      await audio.play();

    } catch (error) {
      console.error("❌ TTS Error:", error);
      setLoading(null);
      setSpeaking(null);
      Alert.alert(
        "Connection Error", 
        `Cannot connect to TTS server at ${fastAPI_Url}.\n\nMake sure:\n1. FastAPI is running on port 8000\n2. Your phone is on the same WiFi\n3. IP address is correct\n\nError: ${error.message}`
      );
    }
  };

  // Show default tips if no recommendations
  if (!recommendations || recommendations.length === 0) {
    return (
      <View className="px-4 pb-6">
        <LinearGradient
          colors={["#fef3c7", "#fde68a"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="rounded-2xl p-4 border-2 border-amber-200"
        >
          <View className="flex-row items-start gap-3">
            <View className="w-10 h-10 bg-amber-500 rounded-xl items-center justify-center">
              <Text className="text-2xl">💡</Text>
            </View>
            <View className="flex-1">
              <Text className="text-sm font-bold text-amber-900 mb-2">
                Pro Tips
              </Text>
              <Text className="text-xs text-amber-700 mb-1">
                • Ensure the bill is clearly visible and readable
              </Text>
              <Text className="text-xs text-amber-700 mb-1">
                • Use good lighting when taking photos
              </Text>
              <Text className="text-xs text-amber-700">
                • Supported formats: PNG, JPG, PDF
              </Text>
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  }

  return (
    <View className="px-4 pb-6">
      <View className="mb-3 flex-row items-center justify-between">
        <Text className="text-lg font-bold text-gray-900">
          ⚡ AI Recommendations
        </Text>
        <View className="bg-amber-100 px-3 py-1 rounded-full">
          <Text className="text-xs font-semibold text-amber-700">
            Powered by AI
          </Text>
        </View>
      </View>

      {recommendations.map((tip, index) => {
        const colors = getImpactColor(tip.impact);
        const icon = getImpactIcon(tip.impact);
        const isSpeaking = speaking === index;
        const isLoading = loading === index;

        return (
          <View
            key={index}
            className={`bg-white rounded-2xl p-4 border-2 ${colors.border} shadow-sm mb-3`}
          >
            <View className="flex-row items-start gap-3 mb-3">
              <View className={`w-10 h-10 ${colors.bg} rounded-xl items-center justify-center`}>
                <Text className="text-xl">{icon}</Text>
              </View>
              <View className="flex-1">
                <View className="flex-row items-start justify-between mb-1">
                  <Text className="text-sm font-bold text-gray-900 flex-1 pr-2">
                    {tip.title}
                  </Text>
                  <TouchableOpacity
                    onPress={() => speakTextWithAPI(`${tip.title}. ${tip.description}`, index)}
                    disabled={isLoading}
                    className={`w-8 h-8 rounded-lg items-center justify-center ${
                      isSpeaking
                        ? 'bg-red-500'
                        : isLoading
                        ? 'bg-gray-300'
                        : 'bg-gray-100'
                    }`}
                    activeOpacity={0.7}
                  >
                    {isLoading ? (
                      <ActivityIndicator size="small" color="#666" />
                    ) : (
                      <Text className="text-base">
                        {isSpeaking ? '⏹️' : '🔈'}
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
                <View className={`${colors.bg} px-2 py-1 rounded-md self-start`}>
                  <Text className={`text-xs font-semibold ${colors.text} capitalize`}>
                    {tip.impact} Impact
                  </Text>
                </View>
              </View>
            </View>

            <Text className="text-xs text-gray-700 leading-5 mb-3">
              {tip.description}
            </Text>

            {tip.savingsEstimate > 0 && (
              <View className="flex-row items-center gap-2 bg-green-50 px-3 py-2 rounded-lg border border-green-200">
                <Text className="text-lg">💰</Text>
                <View className="flex-1">
                  <Text className="text-xs text-green-600 font-medium">
                    Potential Monthly Savings
                  </Text>
                  <Text className="text-sm font-bold text-green-700">
                    ₱{tip.savingsEstimate.toLocaleString()}
                  </Text>
                </View>
              </View>
            )}
          </View>
        );
      })}

      <View className="mt-4 bg-amber-50 rounded-xl p-4 border border-amber-200">
        <View className="flex-row items-center gap-2 mb-2">
          <Text className="text-base">ℹ️</Text>
          <Text className="text-xs font-semibold text-amber-900">
            About these recommendations
          </Text>
        </View>
        <Text className="text-xs text-amber-700 leading-4">
          These personalized tips are generated based on your electricity usage patterns, 
          billing history, and current consumption. Implement them gradually for best results.
        </Text>
      </View>
    </View>
  );
}