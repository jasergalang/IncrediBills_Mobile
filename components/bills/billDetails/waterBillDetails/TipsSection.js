import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Audio } from "expo-av";
import fastAPI_Url from "../../../../assets/common/fastAPI_Url";

const TTS_API_URL = `${fastAPI_Url}/tts/generate`;

export default function TipsSection({ recommendations }) {
  const [speaking, setSpeaking] = useState(null);
  const [loading, setLoading] = useState(null);
  const soundRef = useRef(null);

  const stopCurrentAudio = async () => {
    if (soundRef.current) {
      try {
        await soundRef.current.stopAsync();
        await soundRef.current.unloadAsync();
      } catch (_) {}
      soundRef.current = null;
    }
    setSpeaking(null);
    setLoading(null);
  };

  const speakTip = async (tip, index) => {
    // Toggle off if already speaking this tip
    if (speaking === index) {
      await stopCurrentAudio();
      return;
    }

    // Stop any currently playing audio
    await stopCurrentAudio();

    setLoading(index);

    try {
      const text = `${tip.title}. ${tip.description}`;

      const response = await fetch(TTS_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text,
          lang: "tl", // Filipino
          slow: false,
        }),
      });

      if (!response.ok) {
        throw new Error("TTS API request failed");
      }

      // Get audio blob and convert to base64 URI for expo-av
      const blob = await response.blob();
      const reader = new FileReader();

      reader.onloadend = async () => {
        try {
          const base64Audio = reader.result; // data:audio/mpeg;base64,...

          await Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            playsInSilentModeIOS: true,
            shouldDuckAndroid: true,
            playThroughEarpieceAndroid: false,
          });

          const { sound } = await Audio.Sound.createAsync(
            { uri: base64Audio },
            { shouldPlay: true }
          );

          soundRef.current = sound;
          setSpeaking(index);
          setLoading(null);

          sound.setOnPlaybackStatusUpdate((status) => {
            if (status.didJustFinish) {
              setSpeaking(null);
              setLoading(null);
              sound.unloadAsync();
              soundRef.current = null;
            }
          });
        } catch (err) {
          console.error("Audio playback error:", err);
          setSpeaking(null);
          setLoading(null);
          Alert.alert("Error", "Failed to play audio. Please try again.");
        }
      };

      reader.onerror = () => {
        setLoading(null);
        Alert.alert("Error", "Failed to process audio. Please try again.");
      };

      reader.readAsDataURL(blob);
    } catch (error) {
      console.error("TTS Error:", error);
      setLoading(null);
      setSpeaking(null);
      Alert.alert("Error", "Failed to generate speech. Please try again.");
    }
  };

  const getImpactColor = (impact) => {
    switch (impact?.toLowerCase()) {
      case "high":
        return { bg: "bg-blue-100", text: "text-blue-700", border: "border-blue-300" };
      case "medium":
        return { bg: "bg-cyan-100", text: "text-cyan-700", border: "border-cyan-300" };
      case "low":
        return { bg: "bg-sky-100", text: "text-sky-700", border: "border-sky-300" };
      default:
        return { bg: "bg-gray-100", text: "text-gray-700", border: "border-gray-300" };
    }
  };

  const getImpactIcon = (impact) => {
    switch (impact?.toLowerCase()) {
      case "high": return "🚿";
      case "medium": return "💧";
      case "low": return "🚰";
      default: return "💧";
    }
  };

  const getTTSButtonStyle = (index) => {
    if (speaking === index) return { bg: "#ef4444", emoji: "⏹️" }; // red - stop
    if (loading === index) return { bg: "#94a3b8", emoji: "⏳" };   // gray - loading
    return { bg: "#e2e8f0", emoji: "🔈" };                          // default
  };

  if (!recommendations || recommendations.length === 0) {
    return (
      <View className="px-4 pb-6">
        <LinearGradient
          colors={["#ecfdf5", "#d1fae5"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="rounded-2xl p-5 border-2 border-green-200"
        >
          <View className="flex-row items-center gap-3 mb-3">
            <View className="w-12 h-12 bg-green-500 rounded-xl items-center justify-center">
              <Text style={{ fontSize: 22, color: "white" }}>💡</Text>
            </View>
            <Text className="text-base font-bold text-green-900">
              Water Saving Tips
            </Text>
          </View>
          <View className="space-y-2">
            {[
              "Fix leaking faucets and pipes to save up to 10% on water bills",
              "Use water-efficient appliances and fixtures",
              "Collect rainwater for watering plants and cleaning",
              "Take shorter showers and turn off taps when not in use",
            ].map((tip, i) => (
              <View key={i} className="flex-row items-start gap-2">
                <Text className="text-green-600 mt-0.5">•</Text>
                <Text className="text-sm text-green-800 flex-1">{tip}</Text>
              </View>
            ))}
          </View>
        </LinearGradient>
      </View>
    );
  }

  return (
    <View className="px-4 pb-6">
      {/* Header */}
      <View className="mb-3 flex-row items-center justify-between">
        <Text className="text-lg font-bold text-gray-900">
          💧 AI Water Recommendations
        </Text>
        <View className="bg-cyan-100 px-3 py-1 rounded-full">
          <Text className="text-xs font-semibold text-cyan-700">Powered by AI</Text>
        </View>
      </View>

      {/* Tip Cards */}
      {recommendations.map((tip, index) => {
        const colors = getImpactColor(tip.impact);
        const icon = getImpactIcon(tip.impact);
        const ttsBtn = getTTSButtonStyle(index);

        return (
          <View
            key={index}
            className={`bg-white rounded-2xl p-4 border-2 ${colors.border} shadow-sm mb-3`}
          >
            {/* Title Row */}
            <View className="flex-row items-start gap-3 mb-3">
              <View className={`w-10 h-10 ${colors.bg} rounded-xl items-center justify-center`}>
                <Text className="text-xl">{icon}</Text>
              </View>

              <View className="flex-1">
                <View className="flex-row items-start justify-between">
                  <Text className="text-sm font-bold text-gray-900 mb-1 flex-1 mr-2">
                    {tip.title}
                  </Text>

                  {/* TTS Button */}
                  <TouchableOpacity
                    onPress={() => speakTip(tip, index)}
                    disabled={loading === index}
                    style={{
                      backgroundColor: ttsBtn.bg,
                      borderRadius: 8,
                      padding: 8,
                      alignItems: "center",
                      justifyContent: "center",
                      minWidth: 36,
                      minHeight: 36,
                    }}
                    accessibilityLabel={speaking === index ? "Stop reading" : "Read aloud"}
                  >
                    <Text style={{ fontSize: 16 }}>{ttsBtn.emoji}</Text>
                  </TouchableOpacity>
                </View>

                <View className={`${colors.bg} px-2 py-1 rounded-md self-start`}>
                  <Text className={`text-xs font-semibold ${colors.text} capitalize`}>
                    {tip.impact} Impact
                  </Text>
                </View>
              </View>
            </View>

            {/* Description */}
            <Text className="text-xs text-gray-700 leading-5 mb-3">
              {tip.description}
            </Text>

            {/* Savings Estimate */}
            {tip.savingsEstimate > 0 && (
              <View className="flex-row items-center gap-2 bg-blue-50 px-3 py-2 rounded-lg border border-blue-200">
                <Text className="text-lg">🚰</Text>
                <View className="flex-1">
                  <Text className="text-xs text-blue-600 font-medium">
                    Estimated Monthly Water Savings
                  </Text>
                  <Text className="text-sm font-bold text-blue-700">
                    {tip.savingsEstimate.toLocaleString()} liters
                  </Text>
                </View>
              </View>
            )}
          </View>
        );
      })}

      {/* Footer Note */}
      <View className="mt-4 bg-cyan-50 rounded-xl p-4 border border-cyan-200">
        <View className="flex-row items-center gap-2 mb-2">
          <Text className="text-base">ℹ️</Text>
          <Text className="text-xs font-semibold text-blue-700">
            About these recommendations
          </Text>
        </View>
        <Text className="text-xs text-cyan-700 leading-4">
          These recommendations are based on your water consumption trends and
          billing data. Small changes can lead to big savings over time.
        </Text>
      </View>
    </View>
  );
}