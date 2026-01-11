import React from 'react'
import { View, Text, TouchableOpacity} from 'react-native'   
export default function SecurityPassword({ onChangePassword }) {
  return (
    <View className="bg-white rounded-2xl border border-slate-200 p-6">
      <Text className="text-lg font-bold text-slate-900 mb-2">
        Password & Security
      </Text>
      <Text className="text-slate-600 mb-6 text-sm leading-5">
        Keep your account secure by using a strong password
      </Text>
      <TouchableOpacity
        onPress={onChangePassword}
        className="px-6 py-3 bg-amber-500 rounded-xl items-center"
      >
        <Text className="text-white font-semibold">
          🔑 Change Password
        </Text>
      </TouchableOpacity>
    </View>
  );
}
