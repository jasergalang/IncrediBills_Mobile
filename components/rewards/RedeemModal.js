import { Modal, View, Text, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function RedeemModal({
    visible,
    selectedReward,
    userPoints,
    onClose,
    onConfirm,
}) {
    if (!selectedReward) return null;
    const remaining = userPoints.available - selectedReward.cost;

    return (
        <Modal transparent animationType="fade" visible={visible}>
            <View className="flex-1 bg-black/50 justify-center px-4">
                <View className="bg-white rounded-2xl overflow-hidden">
                    <LinearGradient
                        colors={["#2563eb", "#1e40af"]}
                        className="p-6"
                    >
                        <View className="flex-row justify-between items-center mb-4">
                            <Text className="text-white text-lg font-bold">
                                Confirm Redemption
                            </Text>
                            <Pressable onPress={onClose}>
                                <Text className="text-white text-xl">✕</Text>
                            </Pressable>
                        </View>

                        <View className="items-center">
                            <Text className="text-5xl">{selectedReward.icon}</Text>
                        </View>
                    </LinearGradient>

                    <View className="p-6">
                        <Text className="text-lg font-bold text-center mb-1">
                            {selectedReward.name}
                        </Text>
                        <Text className="text-slate-600 text-center mb-4">
                            {selectedReward.description}
                        </Text>

                        <View className="bg-slate-50 rounded-xl p-4 mb-4">
                            <Row label="Cost" value={`${selectedReward.cost} pts`} />
                            <Row
                                label="Balance"
                                value={`${userPoints.available} pts`}
                            />
                            <Row
                                label="After"
                                value={`${userPoints.available - selectedReward.cost} pts`}
                                highlight
                            />
                        </View>

                        <View className="flex-row gap-3">
                            <Pressable
                                onPress={onClose}
                                className="flex-1 bg-slate-100 py-3 rounded-xl"
                            >
                                <Text className="text-center font-semibold">Cancel</Text>
                            </Pressable>

                            <Pressable
                                onPress={onConfirm}
                                disabled={remaining < 0}
                                className={`flex-1 py-3 rounded-xl ${remaining < 0 ? "bg-slate-300" : "bg-indigo-600"
                                    }`}
                            >

                                <Text className="text-center text-white font-semibold">
                                    Confirm
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

function Row({ label, value, highlight }) {
    return (
        <View className="flex-row justify-between mb-2">
            <Text className="text-slate-600 text-sm">{label}</Text>
            <Text
                className={`font-semibold ${highlight ? "text-indigo-600" : "text-slate-900"
                    }`}
            >
                {value}
            </Text>
        </View>
    );
}
