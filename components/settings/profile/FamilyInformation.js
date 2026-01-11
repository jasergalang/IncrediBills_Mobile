import React from 'react'
import { View, Text, TouchableOpacity, Alert } from 'react-native'
export default function FamilyInformation({ profile }) {
  const handleCopyCode = () => {
    if (profile?.family?.invitationCode) {
      Alert.alert("Copied", "Invitation code copied to clipboard!");
    }
  };

  return (
    <View className="bg-white rounded-2xl border border-slate-200 p-6">
      <Text className="text-lg font-bold text-slate-900 mb-6">
        Family Information
      </Text>

      <View className="space-y-5">
        {/* Family Name */}
        <View>
          <Text className="text-sm font-semibold text-slate-700 mb-2">
            Family Name 👨‍👩‍👧‍👦
          </Text>
          <View className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 flex-row items-center justify-between">
            <Text className="font-medium text-slate-700">
              {profile?.family?.name || "Not set"}
            </Text>
            <View className="px-3 py-1 bg-slate-200 rounded-lg">
              <Text className="text-xs text-slate-600 font-medium">Read-only</Text>
            </View>
          </View>
          <Text className="text-xs text-slate-500 mt-2">
            Family ID: {profile?.family?._id || "None"}
          </Text>
        </View>

        {/* Invitation Code */}
        <View>
          <Text className="text-sm font-semibold text-slate-700 mb-2">
            Invitation Code 🔑
          </Text>
          <View className="flex-row gap-3">
            <View className="flex-1 px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 justify-center">
              <Text className="font-mono font-semibold text-slate-700 text-base">
                {profile?.family?.invitationCode || "No code"}
              </Text>
            </View>
            <TouchableOpacity
              onPress={handleCopyCode}
              disabled={!profile?.family?.invitationCode}
              className={`px-5 py-3 rounded-xl items-center justify-center ${
                profile?.family?.invitationCode
                  ? "bg-blue-600"
                  : "bg-slate-200"
              }`}
            >
              <Text className="text-xl">{profile?.family?.invitationCode ? "📋" : "🔒"}</Text>
            </TouchableOpacity>
          </View>
          <Text className="text-xs text-slate-500 mt-2">
            Share this code with family members to invite them
          </Text>
        </View>
      </View>
    </View>
  );
}
