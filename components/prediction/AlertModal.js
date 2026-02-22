import React, { useState } from "react";
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    TextInput,
} from "react-native";

export default function AlertModal({ visible, onClose, selectedUtility, predictedAmount }) {
    const [threshold, setThreshold] = useState(
        predictedAmount ? (predictedAmount * 1.3).toFixed(2) : "0.00"
    );
    const [alertType, setAlertType] = useState("falls_below");
    const [emailEnabled, setEmailEnabled] = useState(true);
    const [pushEnabled, setPushEnabled] = useState(false);

    const percentage = predictedAmount
        ? Math.round(((parseFloat(threshold) - predictedAmount) / predictedAmount) * 100)
        : 30;

    const handleSetAlert = () => {
        onClose();
    };

    return (
        <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
            <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "flex-end" }}>
                <View style={{ backgroundColor: "white", borderTopLeftRadius: 28, borderTopRightRadius: 28, maxHeight: "90%", overflow: "hidden" }}>

                    {/* Header — stays fixed at top, never scrolls */}
                    <View style={{ backgroundColor: "#f97316", paddingHorizontal: 20, paddingTop: 20, paddingBottom: 20 }}>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                            <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                                <View style={{ backgroundColor: "#fb923c", borderRadius: 12, padding: 8 }}>
                                    <Text style={{ fontSize: 22 }}>🔔</Text>
                                </View>
                                <View>
                                    <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>Set Alert Threshold</Text>
                                    <Text style={{ color: "#fed7aa", fontSize: 12 }}>Get notified when predictions change</Text>
                                </View>
                            </View>
                            <TouchableOpacity
                                onPress={onClose}
                                style={{ backgroundColor: "rgba(255,255,255,0.25)", borderRadius: 20, width: 32, height: 32, alignItems: "center", justifyContent: "center" }}
                            >
                                <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>✕</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Scrollable body */}
                    <ScrollView
                        style={{ paddingHorizontal: 20 }}
                        contentContainerStyle={{ paddingTop: 16, paddingBottom: 32 }}
                        showsVerticalScrollIndicator={false}
                    >
                        {/* Monitoring Card */}
                        {selectedUtility && (
                            <View style={{ backgroundColor: "#fff7ed", borderColor: "#fed7aa", borderWidth: 1, borderRadius: 16, padding: 16, marginBottom: 16 }}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <View style={{ backgroundColor: "#ffedd5", borderRadius: 12, padding: 8, marginRight: 12 }}>
                                        <Text style={{ fontSize: 20 }}>{selectedUtility.icon || "🛒"}</Text>
                                    </View>
                                    <View style={{ flex: 1, marginRight: 12 }}>
                                        <Text style={{ fontSize: 11, color: "#94a3b8" }}>Monitoring</Text>
                                        <Text style={{ fontSize: 15, fontWeight: "bold", color: "#1e293b" }} numberOfLines={1} ellipsizeMode="tail">
                                            {selectedUtility.name}
                                        </Text>
                                    </View>
                                    <View style={{ alignItems: "flex-end" }}>
                                        <Text style={{ fontSize: 11, color: "#94a3b8" }}>Current Prediction</Text>
                                        <Text style={{ fontSize: 15, fontWeight: "bold", color: "#f97316" }}>
                                            ₱{predictedAmount ? predictedAmount.toFixed(2) : "---"}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        )}

                        {/* Alert Threshold */}
                        <Text style={{ fontSize: 13, fontWeight: "600", color: "#334155", marginBottom: 8 }}>
                            Alert Threshold (₱)
                        </Text>
                        <View style={{ borderWidth: 1, borderColor: "#e2e8f0", borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
                            <Text style={{ color: "#94a3b8", marginRight: 8, fontSize: 16 }}>₱</Text>
                            <TextInput
                                value={threshold}
                                onChangeText={setThreshold}
                                keyboardType="numeric"
                                style={{ flex: 1, color: "#1e293b", fontSize: 16, fontWeight: "600" }}
                            />
                        </View>

                        {/* Progress Bar */}
                        <View style={{ marginBottom: 16 }}>
                            <View style={{ height: 8, borderRadius: 99, backgroundColor: "#f1f5f9", overflow: "hidden" }}>
                                <View
                                    style={{
                                        height: "100%",
                                        borderRadius: 99,
                                        width: `${Math.min(Math.abs(percentage), 100)}%`,
                                        backgroundColor: percentage > 50 ? "#ef4444" : percentage > 20 ? "#f97316" : "#22c55e",
                                    }}
                                />
                            </View>
                            <Text style={{ fontSize: 11, color: "#94a3b8", textAlign: "right", marginTop: 4 }}>
                                {percentage}% from predicted
                            </Text>
                        </View>

                        {/* Alert When Prediction */}
                        <Text style={{ fontSize: 13, fontWeight: "600", color: "#334155", marginBottom: 8 }}>
                            Alert When Prediction
                        </Text>
                        <View style={{ flexDirection: "row", gap: 12, marginBottom: 16 }}>
                            <TouchableOpacity
                                onPress={() => setAlertType("exceeds")}
                                style={{
                                    flex: 1, alignItems: "center", paddingVertical: 16, borderRadius: 16,
                                    borderWidth: 2,
                                    borderColor: alertType === "exceeds" ? "#fb923c" : "#e2e8f0",
                                    backgroundColor: alertType === "exceeds" ? "#fff7ed" : "white",
                                }}
                            >
                                <Text style={{ fontSize: 24, marginBottom: 4 }}>📈</Text>
                                <Text style={{ fontWeight: "bold", color: "#1e293b", fontSize: 13 }}>Exceeds</Text>
                                <Text style={{ fontSize: 11, color: "#94a3b8" }}>Above threshold</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setAlertType("falls_below")}
                                style={{
                                    flex: 1, alignItems: "center", paddingVertical: 16, borderRadius: 16,
                                    borderWidth: 2,
                                    borderColor: alertType === "falls_below" ? "#fb923c" : "#e2e8f0",
                                    backgroundColor: alertType === "falls_below" ? "#fff7ed" : "white",
                                }}
                            >
                                <Text style={{ fontSize: 24, marginBottom: 4 }}>📉</Text>
                                <Text style={{ fontWeight: "bold", color: "#1e293b", fontSize: 13 }}>Falls Below</Text>
                                <Text style={{ fontSize: 11, color: "#94a3b8" }}>Under threshold</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Notification Methods */}
                        <Text style={{ fontSize: 13, fontWeight: "600", color: "#334155", marginBottom: 8 }}>
                            Notification Methods
                        </Text>

                        <TouchableOpacity
                            onPress={() => setEmailEnabled(!emailEnabled)}
                            style={{ flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: "#e2e8f0", borderRadius: 16, paddingHorizontal: 16, paddingVertical: 12, marginBottom: 8, backgroundColor: "white" }}
                        >
                            <View style={{
                                width: 22, height: 22, borderRadius: 6, marginRight: 12,
                                alignItems: "center", justifyContent: "center",
                                backgroundColor: emailEnabled ? "#f97316" : "transparent",
                                borderWidth: emailEnabled ? 0 : 2,
                                borderColor: "#cbd5e1",
                            }}>
                                {emailEnabled && <Text style={{ color: "white", fontSize: 13, fontWeight: "bold" }}>✓</Text>}
                            </View>
                            <Text style={{ fontSize: 18, marginRight: 10 }}>📧</Text>
                            <View>
                                <Text style={{ fontSize: 14, fontWeight: "600", color: "#1e293b" }}>Email</Text>
                                <Text style={{ fontSize: 11, color: "#94a3b8" }}>Send alerts to your email</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setPushEnabled(!pushEnabled)}
                            style={{ flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: "#e2e8f0", borderRadius: 16, paddingHorizontal: 16, paddingVertical: 12, marginBottom: 12, backgroundColor: "white" }}
                        >
                            <View style={{
                                width: 22, height: 22, borderRadius: 6, marginRight: 12,
                                alignItems: "center", justifyContent: "center",
                                backgroundColor: pushEnabled ? "#f97316" : "transparent",
                                borderWidth: pushEnabled ? 0 : 2,
                                borderColor: "#cbd5e1",
                            }}>
                                {pushEnabled && <Text style={{ color: "white", fontSize: 13, fontWeight: "bold" }}>✓</Text>}
                            </View>
                            <Text style={{ fontSize: 18, marginRight: 10 }}>🔔</Text>
                            <View>
                                <Text style={{ fontSize: 14, fontWeight: "600", color: "#1e293b" }}>Push Notification</Text>
                                <Text style={{ fontSize: 11, color: "#94a3b8" }}>In-app notifications</Text>
                            </View>
                        </TouchableOpacity>

                        {/* Status Banner */}
                        {(emailEnabled || pushEnabled) && (
                            <View style={{ backgroundColor: "#f0fdf4", borderColor: "#bbf7d0", borderWidth: 1, borderRadius: 16, paddingHorizontal: 16, paddingVertical: 12, marginBottom: 16, flexDirection: "row", alignItems: "center", gap: 10 }}>
                                <Text style={{ fontSize: 18 }}>✅</Text>
                                <View>
                                    <Text style={{ color: "#15803d", fontWeight: "600", fontSize: 13 }}>Notifications enabled</Text>
                                    <Text style={{ color: "#16a34a", fontSize: 11 }}>You'll be notified when you upload your next bill</Text>
                                </View>
                            </View>
                        )}

                        {/* Actions */}
                        <View style={{ flexDirection: "row", gap: 12 }}>
                            <TouchableOpacity
                                onPress={onClose}
                                style={{ flex: 1, borderWidth: 1, borderColor: "#e2e8f0", borderRadius: 16, paddingVertical: 14, alignItems: "center" }}
                            >
                                <Text style={{ color: "#475569", fontWeight: "600" }}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleSetAlert}
                                style={{ flex: 1, backgroundColor: "#f97316", borderRadius: 16, paddingVertical: 14, alignItems: "center", flexDirection: "row", justifyContent: "center", gap: 6 }}
                            >
                                <Text style={{ fontSize: 16 }}>🔔</Text>
                                <Text style={{ color: "white", fontWeight: "bold" }}>Set Alert</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
}