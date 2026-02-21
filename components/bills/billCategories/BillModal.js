import React, { useState } from "react";
import {
  View, Text, TouchableOpacity, ScrollView,
  Modal, TextInput, KeyboardAvoidingView, Platform, Pressable,
} from "react-native";

import { Card } from "./BillModalCard";
import { BillViewSummary } from "./BillViewSummary";
import { BillEditSummary } from "./BillEditSummary";

const headerColors = {
  electricity: "#F59E0B",
  water: "#3B82F6",
  fuel: "#10B981",
  grocery: "#8B5CF6",
  kitchenGas: "#EF4444",
  miscellaneous: "#6B7280",
};

const displayAmount = (val) => `₱${parseFloat(val ?? 0).toLocaleString()}`;

export default function BillModal({ bill, visible, onClose, onSave }) {
  const [isEditing, setIsEditing] = useState(false);

  // ── All editable fields ───────────────────────────────────────────────────────
  const [provider, setProvider] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("Success");
  const [date, setDate] = useState("");
  const [consumption, setConsumption] = useState("");
  const [billingPeriod, setBillingPeriod] = useState("");
  const [store, setStore] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [purchaseType, setPurchaseType] = useState("");
  const [stationLocation, setStationLocation] = useState("");
  const [liters, setLiters] = useState("");
  const [cylinders, setCylinders] = useState("");
  const [cylinderSize, setCylinderSize] = useState("");
  const [cycleDays, setCycleDays] = useState("");
  const [feedback, setFeedback] = useState("");

  const syncFromBill = (b) => {
    const cost = b.cost ?? b.amount ?? 0;
    const resolvedStatus = b.paymentStatus ?? b.status ?? "Success";
    setProvider(b.provider ?? "");
    setAmount(cost !== 0 ? String(cost) : "");
    setStatus(resolvedStatus);
    setDate(b.date ?? "");
    setConsumption(b.consumption != null ? String(b.consumption) : "");
    setBillingPeriod(b.billingPeriod ?? "");
    setStore(b.store ?? b.provider ?? "");
    setCategory(b.category ?? "");
    setQuantity(b.quantity != null ? String(b.quantity) : "");
    setPurchaseType(b.purchaseType ?? "");
    setStationLocation(b.stationLocation ?? "");
    setLiters(b.liters != null ? String(b.liters) : "");
    setCylinders(b.cylinders != null ? String(b.cylinders) : "");
    setCylinderSize(b.cylinderSize ?? "");
    setCycleDays(b.cycleDays != null ? String(b.cycleDays) : "");
    setFeedback("");
  };

  React.useEffect(() => {
    if (bill && visible) { syncFromBill(bill); setIsEditing(false); }
  }, [bill?._id, bill?.id, visible]);

  if (!bill) return null;

  const type = bill.type;
  const headerColor = headerColors[type] || "#4F46E5";
  const rawCost = bill.cost ?? bill.amount ?? 0;
  const rawStatus = bill.paymentStatus ?? bill.status ?? "Success";

  // Bundle for child components
  const editFields = { provider, amount, status, date, consumption, billingPeriod, store, category, quantity, purchaseType, stationLocation, liters, cylinders, cylinderSize, cycleDays, feedback };
  const editSetters = { setProvider, setAmount, setStatus, setDate, setConsumption, setBillingPeriod, setStore, setCategory, setQuantity, setPurchaseType, setStationLocation, setLiters, setCylinders, setCylinderSize, setCycleDays, setFeedback };

  const handleSave = () => {
    onSave({ ...bill, ...editFields });
    setIsEditing(false);
    onClose();
  };

  const handleCancel = () => {
    if (isEditing) { syncFromBill(bill); setIsEditing(false); }
    else onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable
        style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.55)", justifyContent: "center", alignItems: "center", padding: 16 }}
        onPress={onClose}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ width: "100%", maxHeight: "92%" }}
        >
          <Pressable onPress={() => { }}>
            <View style={{ backgroundColor: "#fff", borderRadius: 18, overflow: "hidden", shadowColor: "#000", shadowOpacity: 0.25, shadowRadius: 20, elevation: 10 }}>

              {/* ── Header ── */}
              <View style={{ backgroundColor: headerColor, paddingHorizontal: 20, paddingVertical: 18, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 14 }}>
                  <View style={{ width: 46, height: 46, backgroundColor: "rgba(255,255,255,0.22)", borderRadius: 12, alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ fontSize: 24 }}>{bill.icon}</Text>
                  </View>
                  <View>
                    <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
                      {isEditing ? `Edit ${bill.name} Bill` : `${bill.name} Bill`}
                    </Text>
                    <Text style={{ color: "rgba(255,255,255,0.78)", fontSize: 12, marginTop: 2 }}>
                      {isEditing ? "Update bill information" : "Bill details"}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={onClose}
                  style={{ width: 34, height: 34, backgroundColor: "rgba(255,255,255,0.22)", borderRadius: 9, alignItems: "center", justifyContent: "center" }}
                >
                  <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>✕</Text>
                </TouchableOpacity>
              </View>

              {/* ── Body ── */}
              <ScrollView
                style={{ maxHeight: 500 }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ padding: 16 }}
                keyboardShouldPersistTaps="handled"
              >
                {isEditing
                  ? <BillEditSummary type={type} fields={editFields} setters={editSetters} />
                  : <BillViewSummary type={type} bill={bill} headerColor={headerColor} displayAmount={displayAmount} rawCost={rawCost} rawStatus={rawStatus} />
                }

                {/* Feedback — edit mode only */}
                {isEditing && (
                  <Card emoji="💬" title="Feedback">
                    <TextInput
                      value={feedback}
                      onChangeText={setFeedback}
                      multiline
                      numberOfLines={4}
                      textAlignVertical="top"
                      placeholder="Add any feedback or observations..."
                      placeholderTextColor="#94A3B8"
                      style={{ backgroundColor: "#EAEEF4", borderRadius: 9, paddingHorizontal: 12, paddingVertical: 10, fontSize: 13, color: "#1E293B", minHeight: 90 }}
                    />
                  </Card>
                )}
              </ScrollView>

              {/* ── Footer ── */}
              <View style={{ flexDirection: "row", gap: 10, padding: 16, borderTopWidth: 1, borderTopColor: "#E2E8F0", backgroundColor: "#fff" }}>
                <TouchableOpacity
                  onPress={handleCancel}
                  style={{ flex: 1, paddingVertical: 14, borderRadius: 11, alignItems: "center", backgroundColor: "#F1F5F9", borderWidth: 1, borderColor: "#E2E8F0" }}
                >
                  <Text style={{ fontWeight: "600", color: "#64748B", fontSize: 14 }}>Cancel</Text>
                </TouchableOpacity>

                {isEditing ? (
                  <TouchableOpacity onPress={handleSave} style={{ flex: 2, paddingVertical: 14, borderRadius: 11, alignItems: "center", backgroundColor: headerColor }}>
                    <Text style={{ fontWeight: "700", color: "#fff", fontSize: 14 }}>💾  Save Changes</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={() => setIsEditing(true)} style={{ flex: 2, paddingVertical: 14, borderRadius: 11, alignItems: "center", backgroundColor: headerColor }}>
                    <Text style={{ fontWeight: "700", color: "#fff", fontSize: 14 }}>✏️  Edit Bill</Text>
                  </TouchableOpacity>
                )}
              </View>

            </View>
          </Pressable>
        </KeyboardAvoidingView>
      </Pressable>
    </Modal>
  );
}