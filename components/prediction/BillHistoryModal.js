import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  Pressable,
} from "react-native";
import { ViewRow, StatusViewRow } from "../bills/billCategories/BillModalCard";

const displayAmount = (val) => `₱${parseFloat(val ?? 0).toLocaleString()}`;

export default function BillHistoryModal({ bill, visible, onClose, predictedCost, selectedUtility }) {
  if (!bill) return null;

  const rawCost = bill.cost ?? bill.amount ?? 0;
  const rawStatus = bill.paymentStatus ?? bill.status ?? "Success";

  const headerStyle = selectedUtility
    ? {
        backgroundColor: selectedUtility.borderColor,
        borderColor: selectedUtility.borderColor,
        borderWidth: 1,
      }
    : { backgroundColor: "#EFF6FF", borderColor: "#BFDBFE", borderWidth: 1 };

  // For text that should match the utility accent
  const accentColor = selectedUtility?.borderColor || "#3B82F6";

  const diff = parseFloat(predictedCost ?? 0) - parseFloat(rawCost ?? 0);
  const diffText =
    diff === 0
      ? "On target"
      : `${diff > 0 ? "+" : ""}₱${Math.abs(diff).toLocaleString()} ${diff > 0 ? "over predicted" : "under predicted"}`;
  const diffColor = diff > 0 ? "#DC2626" : diff < 0 ? "#16A34A" : "#64748B";

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.55)",
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 24,
        }}
        onPress={onClose}
      >
        <Pressable
          onPress={() => {}}
          style={{ width: "100%" }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 18,
              overflow: "hidden",
              shadowColor: "#000",
              shadowOpacity: 0.25,
              shadowRadius: 20,
              elevation: 10,
              width: "100%",
            }}
          >
            {/* ── Header ── */}
            <View
              style={{
                ...headerStyle,
                paddingHorizontal: 20,
                paddingVertical: 18,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                <View
                  style={{
                    width: 44,
                    height: 44,
                    backgroundColor: "rgba(255,255,255,0.6)",
                    borderRadius: 12,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ fontSize: 22 }}>{bill.icon ?? "🧾"}</Text>
                </View>
                <View>
                  <Text style={{ color: "#1E293B", fontSize: 17, fontWeight: "bold" }}>
                    {bill.name} Bill
                  </Text>
                  <Text style={{ color: "#64748B", fontSize: 12, marginTop: 2 }}>
                    Bill details
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                onPress={onClose}
                style={{
                  width: 32,
                  height: 32,
                  backgroundColor: "rgba(255,255,255,0.6)",
                  borderRadius: 8,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: "#64748B", fontSize: 15, fontWeight: "bold" }}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* ── Body ── */}
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ padding: 16 }}
            >
              {/* Single card for all info */}
              <View
                style={{
                  backgroundColor: "#F8FAFC",
                  borderRadius: 13,
                  padding: 14,
                  borderWidth: 1,
                  borderColor: "#E2E8F0",
                }}
              >
                {/* Section label */}
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: "700",
                    color: "#94A3B8",
                    letterSpacing: 0.8,
                    marginBottom: 4,
                    textTransform: "uppercase",
                  }}
                >
                  Bill Information
                </Text>

                <ViewRow label="Provider" value={bill.provider ?? bill.store ?? "—"} headerColor={accentColor} />
                <ViewRow label="Bill Date" value={bill.date} headerColor={accentColor} />
                <ViewRow
                  label="Actual Cost"
                  value={displayAmount(rawCost)}
                  colored
                  headerColor={accentColor}
                />
                <ViewRow
                  label="Predicted Cost"
                  value={displayAmount(predictedCost ?? 0)}
                  headerColor={accentColor}
                />

                {/* Difference row — custom colored */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingVertical: 11,
                    borderBottomWidth: 1,
                    borderBottomColor: "#E2E8F0",
                  }}
                >
                  <Text style={{ fontSize: 12, color: "#64748B", flex: 1 }}>Difference</Text>
                  <Text style={{ fontSize: 13, fontWeight: "700", color: diffColor, textAlign: "right" }}>
                    {diffText}
                  </Text>
                </View>

                <StatusViewRow label="Payment Status" value={rawStatus} last />
              </View>
            </ScrollView>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}