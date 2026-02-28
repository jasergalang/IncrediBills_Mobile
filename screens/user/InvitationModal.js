import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function InvitationModal({ isOpen, onClose, onSubmit, loading }) {
  const [hasCode, setHasCode] = useState(null);
  const [invitationCode, setInvitationCode] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (hasCode && !invitationCode.trim()) {
      setError("Please enter an invitation code");
      return;
    }
    onSubmit(hasCode ? invitationCode.trim() : null);
  };

  const handleReset = () => {
    setHasCode(null);
    setInvitationCode("");
    setError("");
  };

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        className="flex-1 justify-center items-center p-4"
      >
        <View className="bg-white rounded-2xl w-full max-w-md p-6 relative">

          {/* Close Button (X) */}
          <TouchableOpacity
            onPress={onClose}
            className="absolute top-4 right-4 w-8 h-8 items-center justify-center"
          >
            {/* X icon hardcoded */}
            <View style={{ width: 18, height: 18, position: "relative", justifyContent: "center", alignItems: "center" }}>
              <View style={{
                position: "absolute",
                width: 18,
                height: 2,
                backgroundColor: "#94a3b8",
                borderRadius: 1,
                transform: [{ rotate: "45deg" }],
              }} />
              <View style={{
                position: "absolute",
                width: 18,
                height: 2,
                backgroundColor: "#94a3b8",
                borderRadius: 1,
                transform: [{ rotate: "-45deg" }],
              }} />
            </View>
          </TouchableOpacity>

          {/* Header */}
          <View className="items-center mb-6">
            {/* People/Family Icon */}
            <LinearGradient
              colors={["#2563eb", "#4f46e5"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="w-16 h-16 rounded-full items-center justify-center mb-4"
            >
              {/* Hardcoded people icon using Views */}
              <View style={{ width: 36, height: 36, alignItems: "center", justifyContent: "center" }}>
                {/* Center person head */}
                <View style={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: "#fff",
                  position: "absolute",
                  top: 0,
                  left: 13,
                }} />
                {/* Center person body */}
                <View style={{
                  width: 14,
                  height: 9,
                  borderRadius: 7,
                  backgroundColor: "#fff",
                  position: "absolute",
                  top: 12,
                  left: 11,
                }} />
                {/* Left person head */}
                <View style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: "#fff",
                  position: "absolute",
                  top: 2,
                  left: 2,
                }} />
                {/* Left person body */}
                <View style={{
                  width: 12,
                  height: 8,
                  borderRadius: 6,
                  backgroundColor: "#fff",
                  position: "absolute",
                  top: 13,
                  left: 0,
                }} />
                {/* Right person head */}
                <View style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: "#fff",
                  position: "absolute",
                  top: 2,
                  right: 2,
                }} />
                {/* Right person body */}
                <View style={{
                  width: 12,
                  height: 8,
                  borderRadius: 6,
                  backgroundColor: "#fff",
                  position: "absolute",
                  top: 13,
                  right: 0,
                }} />
              </View>
            </LinearGradient>

            <Text className="text-2xl font-bold text-slate-900 mb-2">
              Family Setup
            </Text>
            <Text className="text-slate-600 text-center">
              Do you have a family invitation code?
            </Text>
          </View>

          {/* Error */}
          {!!error && (
            <View className="mb-4 bg-red-50 border border-red-200 rounded-xl p-3">
              <Text className="text-red-800 text-sm">{error}</Text>
            </View>
          )}

          {/* State: initial choice */}
          {hasCode === null && (
            <View className="gap-3">
              <TouchableOpacity
                onPress={() => setHasCode(true)}
                disabled={loading}
                className="rounded-xl overflow-hidden mb-3"
              >
                <LinearGradient
                  colors={["#2563eb", "#4f46e5"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  className="py-3.5 items-center justify-center rounded-xl"
                >
                  <Text className="text-white font-semibold text-base">
                    Yes, I have a code
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setHasCode(false)}
                disabled={loading}
                className="w-full border-2 border-slate-200 py-3.5 rounded-xl items-center justify-center"
              >
                <Text className="text-slate-700 font-semibold text-base">
                  No, I'm the first member
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* State: has code — enter it */}
          {hasCode === true && (
            <View>
              <Text className="text-sm font-semibold text-slate-700 mb-2">
                Enter Invitation Code
              </Text>
              <TextInput
                value={invitationCode}
                onChangeText={(text) => {
                  setInvitationCode(text.toUpperCase());
                  setError("");
                }}
                placeholder="e.g., 02A9GJ"
                maxLength={6}
                editable={!loading}
                autoCapitalize="characters"
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-center text-lg font-mono tracking-widest mb-4"
                style={{ letterSpacing: 6 }}
                placeholderTextColor="#94a3b8"
              />
              <View className="flex-row gap-3">
                <TouchableOpacity
                  onPress={handleReset}
                  disabled={loading}
                  className="flex-1 bg-slate-100 py-3 rounded-xl items-center justify-center"
                >
                  <Text className="text-slate-700 font-semibold">Back</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleSubmit}
                  disabled={loading}
                  className="flex-1 rounded-xl overflow-hidden"
                >
                  <LinearGradient
                    colors={["#2563eb", "#4f46e5"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    className="py-3 items-center justify-center rounded-xl"
                  >
                    <Text className="text-white font-semibold">
                      {loading ? "Joining..." : "Join Family"}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* State: no code — first member */}
          {hasCode === false && (
            <View>
              <View className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
                <Text className="text-blue-800 text-sm">
                  You'll be the first member of your family. An invitation code
                  will be generated for you to share with family members.
                </Text>
              </View>
              <View className="flex-row gap-3">
                <TouchableOpacity
                  onPress={handleReset}
                  disabled={loading}
                  className="flex-1 bg-slate-100 py-3 rounded-xl items-center justify-center"
                >
                  <Text className="text-slate-700 font-semibold">Back</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleSubmit}
                  disabled={loading}
                  className="flex-1 rounded-xl overflow-hidden"
                >
                  <LinearGradient
                    colors={["#2563eb", "#4f46e5"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    className="py-3 items-center justify-center rounded-xl"
                  >
                    <Text className="text-white font-semibold">
                      {loading ? "Creating..." : "Create Family"}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          )}

        </View>
      </View>
    </Modal>
  );
}