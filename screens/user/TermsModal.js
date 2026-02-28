import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function TermsModal({ isOpen, onClose, type = "terms" }) {
  const [accepted, setAccepted] = useState(false);

  const isTerms = type === "terms";

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
        <View className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden" style={{ maxHeight: "90%" }}>
          
          {/* Header */}
          <LinearGradient
            colors={["#2563eb", "#4f46e5"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="p-6"
          >
            <View className="flex-row items-center justify-between">
              <Text className="text-2xl font-bold text-white">
                {isTerms ? "Terms of Service" : "Privacy Policy"}
              </Text>
              <TouchableOpacity
                onPress={onClose}
                className="w-8 h-8 rounded-lg items-center justify-center"
                style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
              >
                <Ionicons name="close" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </LinearGradient>

          {/* Content */}
          <ScrollView className="p-6" style={{ flexGrow: 1 }}>
            <View className="space-y-6">
              {isTerms ? (
                <>
                  {/* Terms of Service Content */}
                  <View className="mb-5">
                    <Text className="text-lg font-bold text-gray-900 mb-3">
                      1. Acceptance of Terms
                    </Text>
                    <Text className="text-sm leading-relaxed text-slate-700">
                      By using IncrediBills, you agree to comply with these Terms of
                      Service. If you do not agree, please do not use our
                      application. IncrediBills reserves the right to modify these
                      terms at any time.
                    </Text>
                  </View>

                  <View className="mb-5">
                    <Text className="text-lg font-bold text-gray-900 mb-3">
                      2. User Accounts
                    </Text>
                    <Text className="text-sm leading-relaxed text-slate-700">
                      You are responsible for maintaining the confidentiality of
                      your account credentials and password. You agree to accept
                      responsibility for all activities that occur under your
                      account. You must notify IncrediBills immediately of any
                      unauthorized use of your account.
                    </Text>
                  </View>

                  <View className="mb-5">
                    <Text className="text-lg font-bold text-gray-900 mb-3">
                      3. Bill Tracking & Data
                    </Text>
                    <Text className="text-sm leading-relaxed text-slate-700">
                      IncrediBills helps you track utility bills including water,
                      electricity, groceries, transportation fuel, and miscellaneous
                      expenses. You are responsible for ensuring the accuracy of
                      bill information you enter. We use this data to provide
                      predictions and savings recommendations.
                    </Text>
                  </View>

                  <View className="mb-5">
                    <Text className="text-lg font-bold text-gray-900 mb-3">
                      4. AI Predictions & Recommendations
                    </Text>
                    <Text className="text-sm leading-relaxed text-slate-700">
                      Our AI-powered predictions are estimates based on your
                      historical data. These predictions are not guaranteed and
                      should not be considered as official billing information.
                      Always verify with your utility providers for accurate
                      charges.
                    </Text>
                  </View>

                  <View className="mb-5">
                    <Text className="text-lg font-bold text-gray-900 mb-3">
                      5. Gamification & Rewards
                    </Text>
                    <Text className="text-sm leading-relaxed text-slate-700">
                      IncrediBills offers gamification features including points,
                      levels, and rewards. These are for entertainment purposes and
                      may be subject to change. Rewards cannot be exchanged for
                      cash.
                    </Text>
                  </View>

                  <View className="mb-5">
                    <Text className="text-lg font-bold text-gray-900 mb-3">
                      6. Limitation of Liability
                    </Text>
                    <Text className="text-sm leading-relaxed text-slate-700">
                      IncrediBills is provided "as-is" without warranties. We are
                      not liable for any damages or losses arising from your use of
                      the application, including but not limited to incorrect bill
                      calculations or prediction errors.
                    </Text>
                  </View>

                  <View className="mb-5">
                    <Text className="text-lg font-bold text-gray-900 mb-3">
                      7. Contact Us
                    </Text>
                    <Text className="text-sm leading-relaxed text-slate-700">
                      For any questions regarding these terms, please contact us at
                      support@incredibills.com.
                    </Text>
                  </View>
                </>
              ) : (
                <>
                  {/* Privacy Policy Content */}
                  <View className="mb-5">
                    <Text className="text-lg font-bold text-gray-900 mb-3">
                      1. Information We Collect
                    </Text>
                    <Text className="text-sm leading-relaxed text-slate-700">
                      We collect information you provide directly, including:
                    </Text>
                    <View className="mt-2 space-y-1">
                      {[
                        "Full name, email address, and password",
                        "Bill information (costs, dates, categories)",
                        "Usage patterns and historical data",
                        "Profile preferences and settings",
                      ].map((item, i) => (
                        <View key={i} className="flex-row items-start mt-1">
                          <Text className="text-slate-700 text-sm mr-2">{"\u2022"}</Text>
                          <Text className="text-sm text-slate-700 flex-1">{item}</Text>
                        </View>
                      ))}
                    </View>
                  </View>

                  <View className="mb-5">
                    <Text className="text-lg font-bold text-gray-900 mb-3">
                      2. How We Use Your Information
                    </Text>
                    <Text className="text-sm leading-relaxed text-slate-700">
                      Your information is used to:
                    </Text>
                    <View className="mt-2 space-y-1">
                      {[
                        "Provide and improve IncrediBills services",
                        "Generate AI predictions and recommendations",
                        "Display gamification features and rewards",
                        "Send service updates and notifications",
                      ].map((item, i) => (
                        <View key={i} className="flex-row items-start mt-1">
                          <Text className="text-slate-700 text-sm mr-2">{"\u2022"}</Text>
                          <Text className="text-sm text-slate-700 flex-1">{item}</Text>
                        </View>
                      ))}
                    </View>
                  </View>

                  <View className="mb-5">
                    <Text className="text-lg font-bold text-gray-900 mb-3">
                      3. Data Security
                    </Text>
                    <Text className="text-sm leading-relaxed text-slate-700">
                      We implement industry-standard security measures to protect
                      your data. However, no method is 100% secure. You are
                      responsible for keeping your password confidential.
                    </Text>
                  </View>

                  <View className="mb-5">
                    <Text className="text-lg font-bold text-gray-900 mb-3">
                      4. Data Sharing
                    </Text>
                    <Text className="text-sm leading-relaxed text-slate-700">
                      We do not sell your personal data. We may share anonymized
                      data with analytics providers to improve our services. Family
                      members within your household may have access to shared bill
                      data.
                    </Text>
                  </View>

                  <View className="mb-5">
                    <Text className="text-lg font-bold text-gray-900 mb-3">
                      5. Cookies & Tracking
                    </Text>
                    <Text className="text-sm leading-relaxed text-slate-700">
                      IncrediBills uses cookies to enhance your experience. You can
                      control cookie preferences through your browser settings.
                    </Text>
                  </View>

                  <View className="mb-5">
                    <Text className="text-lg font-bold text-gray-900 mb-3">
                      6. Your Rights
                    </Text>
                    <Text className="text-sm leading-relaxed text-slate-700">
                      You have the right to access, update, or delete your personal
                      data. Contact us at support@incredibills.com to exercise these
                      rights.
                    </Text>
                  </View>

                  <View className="mb-5">
                    <Text className="text-lg font-bold text-gray-900 mb-3">
                      7. Changes to This Policy
                    </Text>
                    <Text className="text-sm leading-relaxed text-slate-700">
                      We may update this Privacy Policy periodically. Continued use
                      of IncrediBills indicates your acceptance of changes.
                    </Text>
                  </View>
                </>
              )}
            </View>
          </ScrollView>

          {/* Footer */}
          <View className="bg-slate-50 border-t border-slate-200 p-6">
            {/* Checkbox */}
            <TouchableOpacity
              onPress={() => setAccepted(!accepted)}
              className="flex-row items-center gap-3 mb-4"
              activeOpacity={0.7}
            >
              <View
                className={`w-5 h-5 rounded border-2 items-center justify-center ${
                  accepted ? "bg-blue-600 border-blue-600" : "border-slate-300 bg-white"
                }`}
              >
                {accepted && (
                  <Ionicons name="checkmark" size={12} color="#fff" />
                )}
              </View>
              <Text className="text-sm font-medium text-slate-700 flex-1">
                I have read and agree to the{" "}
                {isTerms ? "Terms of Service" : "Privacy Policy"}
              </Text>
            </TouchableOpacity>

            {/* Buttons */}
            <View className="flex-row gap-3">
              <TouchableOpacity
                onPress={onClose}
                className="flex-1 bg-slate-200 py-3 rounded-xl items-center justify-center"
              >
                <Text className="text-slate-700 font-semibold text-sm">Close</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={onClose}
                disabled={!accepted}
                className="flex-1 rounded-xl overflow-hidden"
              >
                <LinearGradient
                  colors={accepted ? ["#2563eb", "#4f46e5"] : ["#93c5fd", "#a5b4fc"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  className="py-3 items-center justify-center"
                >
                  <Text className="text-white font-semibold text-sm">I Agree</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>

        </View>
      </View>
    </Modal>
  );
}