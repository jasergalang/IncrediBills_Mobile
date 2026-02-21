import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

// ─── Read-only row ─────────────────────────────────────────────────────────────
export function ViewRow({ label, value, colored, headerColor, last }) {
    const display =
        value !== undefined && value !== null && value !== "" ? String(value) : "—";
    return (
        <View
            style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingVertical: 11,
                borderBottomWidth: last ? 0 : 1,
                borderBottomColor: "#E2E8F0",
            }}
        >
            <Text style={{ fontSize: 12, color: "#64748B", flex: 1 }}>{label}</Text>
            <Text
                style={{
                    fontSize: 13,
                    fontWeight: "700",
                    color: colored ? headerColor : "#1E293B",
                    flexShrink: 1,
                    textAlign: "right",
                    marginLeft: 8,
                }}
            >
                {display}
            </Text>
        </View>
    );
}

// ─── Status badge row (read-only) ──────────────────────────────────────────────
export function StatusViewRow({ label, value, last }) {
    const isPaid = value === "Success" || value === "Paid";
    return (
        <View
            style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingVertical: 11,
                borderBottomWidth: last ? 0 : 1,
                borderBottomColor: "#E2E8F0",
            }}
        >
            <Text style={{ fontSize: 12, color: "#64748B" }}>{label}</Text>
            <View
                style={{
                    backgroundColor: isPaid ? "#DCFCE7" : "#FEE2E2",
                    paddingHorizontal: 10,
                    paddingVertical: 3,
                    borderRadius: 20,
                }}
            >
                <Text style={{ fontSize: 11, fontWeight: "700", color: isPaid ? "#16A34A" : "#DC2626" }}>
                    {isPaid ? "✓ Paid" : "✗ Failed"}
                </Text>
            </View>
        </View>
    );
}

// ─── Editable text row ─────────────────────────────────────────────────────────
export function EditRow({ label, value, onChangeText, keyboardType = "default", placeholder, prefix, last }) {
    return (
        <View
            style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingVertical: 8,
                borderBottomWidth: last ? 0 : 1,
                borderBottomColor: "#E2E8F0",
            }}
        >
            <Text style={{ fontSize: 12, color: "#64748B", flex: 1 }}>{label}</Text>
            <View
                style={{
                    backgroundColor: "#EAEEF4",
                    borderRadius: 8,
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: 10,
                    flex: 1.2,
                }}
            >
                {prefix ? (
                    <Text style={{ color: "#64748B", fontSize: 13, marginRight: 3 }}>{prefix}</Text>
                ) : null}
                <TextInput
                    value={value}
                    onChangeText={onChangeText}
                    keyboardType={keyboardType}
                    placeholder={placeholder || ""}
                    placeholderTextColor="#94A3B8"
                    style={{ flex: 1, paddingVertical: 8, fontSize: 13, color: "#1E293B", textAlign: "right" }}
                />
            </View>
        </View>
    );
}

// ─── Status toggle (edit mode) ─────────────────────────────────────────────────
export function StatusToggleRow({ label, value, onChange, last }) {
    const isPaid = value === "Success" || value === "Paid";
    return (
        <View
            style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingVertical: 8,
                borderBottomWidth: last ? 0 : 1,
                borderBottomColor: "#E2E8F0",
            }}
        >
            <Text style={{ fontSize: 12, color: "#64748B", flex: 1 }}>{label}</Text>
            <View style={{ flexDirection: "row", gap: 8 }}>
                <TouchableOpacity
                    onPress={() => onChange("Success")}
                    style={{
                        paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8,
                        backgroundColor: isPaid ? "#DCFCE7" : "#EAEEF4",
                        borderWidth: 1.5, borderColor: isPaid ? "#86EFAC" : "transparent",
                    }}
                >
                    <Text style={{ fontSize: 12, fontWeight: "700", color: isPaid ? "#16A34A" : "#94A3B8" }}>
                        ✓ Paid
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => onChange("Failed")}
                    style={{
                        paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8,
                        backgroundColor: !isPaid ? "#FEE2E2" : "#EAEEF4",
                        borderWidth: 1.5, borderColor: !isPaid ? "#FCA5A5" : "transparent",
                    }}
                >
                    <Text style={{ fontSize: 12, fontWeight: "700", color: !isPaid ? "#DC2626" : "#94A3B8" }}>
                        ✗ Failed
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

// ─── Card container ────────────────────────────────────────────────────────────
export function Card({ emoji, title, showEditingBadge, children }) {
    return (
        <View
            style={{
                backgroundColor: "#F8FAFC",
                borderRadius: 13,
                padding: 14,
                borderWidth: 1,
                borderColor: "#E2E8F0",
                marginBottom: 12,
            }}
        >
            <View style={{ flexDirection: "row", alignItems: "center", gap: 7, marginBottom: 8 }}>
                <Text style={{ fontSize: 15 }}>{emoji}</Text>
                <Text style={{ fontWeight: "bold", fontSize: 14, color: "#1E293B" }}>{title}</Text>
                {showEditingBadge && (
                    <View
                        style={{
                            marginLeft: "auto", backgroundColor: "#EFF6FF",
                            paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6,
                        }}
                    >
                        <Text style={{ fontSize: 10, color: "#3B82F6", fontWeight: "700" }}>EDITING</Text>
                    </View>
                )}
            </View>
            {children}
        </View>
    );
}