import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from "react-native";

const headerColors = {
  electricity: "#F59E0B",
  water: "#3B82F6",
  fuel: "#10B981",
  grocery: "#8B5CF6",
  kitchenGas: "#EF4444",
  miscellaneous: "#6B7280",
};

export default function BillModal({ bill, visible, onClose, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [provider, setProvider] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("Success");
  const [date, setDate] = useState("");
  const [feedback, setFeedback] = useState("");

  React.useEffect(() => {
    if (bill && visible) {
      setProvider(bill.provider || "");
      setAmount(bill.amount?.toString() || "");
      setStatus(bill.status || "Success");
      setDate(bill.date || "");
      setFeedback("");
      setIsEditing(false);
    }
  }, [bill?.id, visible]);

  if (!bill) return null;

  const headerColor = headerColors[bill.type] || "#4F46E5";

  const handleSave = () => {
    onSave({ ...bill, provider, amount: parseFloat(amount) || 0, status, date, feedback });
    setIsEditing(false);
    onClose();
  };

  const handleCancel = () => {
    if (isEditing) {
      setProvider(bill.provider || "");
      setAmount(bill.amount?.toString() || "");
      setStatus(bill.status || "Success");
      setDate(bill.date || "");
      setFeedback("");
      setIsEditing(false);
    } else {
      onClose();
    }
  };

  const SummaryRow = ({ label, value, colored, statusVal, last }) => (
    <View style={{
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 10,
      borderBottomWidth: last ? 0 : 1,
      borderBottomColor: "#E2E8F0",
    }}>
      <Text style={{ fontSize: 12, color: "#64748B" }}>{label}</Text>
      {statusVal ? (
        <View style={{
          backgroundColor: statusVal === "Success" ? "#DCFCE7" : "#FEE2E2",
          paddingHorizontal: 10, paddingVertical: 3, borderRadius: 20,
        }}>
          <Text style={{ fontSize: 11, fontWeight: "700", color: statusVal === "Success" ? "#16A34A" : "#DC2626" }}>
            {statusVal === "Success" ? "✓ Paid" : "✗ Failed"}
          </Text>
        </View>
      ) : (
        <Text style={{ fontSize: 12, fontWeight: "700", color: colored ? headerColor : "#1E293B" }}>
          {value}
        </Text>
      )}
    </View>
  );

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
          <Pressable onPress={() => {}}>
            <View style={{
              backgroundColor: "#fff",
              borderRadius: 18,
              overflow: "hidden",
              shadowColor: "#000",
              shadowOpacity: 0.25,
              shadowRadius: 20,
              elevation: 10,
            }}>

              {/* Header */}
              <View style={{
                backgroundColor: headerColor,
                paddingHorizontal: 20,
                paddingVertical: 18,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 14 }}>
                  <View style={{
                    width: 46, height: 46,
                    backgroundColor: "rgba(255,255,255,0.22)",
                    borderRadius: 12,
                    alignItems: "center", justifyContent: "center",
                  }}>
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
                  style={{
                    width: 34, height: 34,
                    backgroundColor: "rgba(255,255,255,0.22)",
                    borderRadius: 9,
                    alignItems: "center", justifyContent: "center",
                  }}
                >
                  <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>✕</Text>
                </TouchableOpacity>
              </View>

              {/* Scrollable Body */}
              <ScrollView
                style={{ maxHeight: 500 }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ padding: 16, gap: 12 }}
                keyboardShouldPersistTaps="handled"
              >
                {/* Bill Summary Card */}
                <View style={{
                  backgroundColor: "#F8FAFC",
                  borderRadius: 13,
                  padding: 14,
                  borderWidth: 1,
                  borderColor: "#E2E8F0",
                }}>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 7, marginBottom: 6 }}>
                    <Text style={{ fontSize: 15 }}>📊</Text>
                    <Text style={{ fontWeight: "bold", fontSize: 14, color: "#1E293B" }}>Bill Summary</Text>
                    {isEditing && (
                      <View style={{
                        marginLeft: "auto",
                        backgroundColor: "#EFF6FF",
                        paddingHorizontal: 8, paddingVertical: 3,
                        borderRadius: 6,
                      }}>
                        <Text style={{ fontSize: 10, color: "#3B82F6", fontWeight: "700" }}>EDITING</Text>
                      </View>
                    )}
                  </View>

                  <SummaryRow label="Bill Type" value={`${bill.icon} ${bill.name} Bill`} />

                  {/* Provider */}
                  <View style={{ paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: "#E2E8F0" }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                      <Text style={{ fontSize: 12, color: "#64748B" }}>Provider</Text>
                      {isEditing ? (
                        <TextInput
                          value={provider}
                          onChangeText={setProvider}
                          style={{
                            backgroundColor: "#EAEEF4", borderRadius: 8,
                            paddingHorizontal: 10, paddingVertical: 6,
                            fontSize: 13, color: "#1E293B",
                            minWidth: 150, textAlign: "right",
                          }}
                          placeholder="Provider name"
                          placeholderTextColor="#94A3B8"
                        />
                      ) : (
                        <Text style={{ fontSize: 12, fontWeight: "700", color: "#1E293B" }}>{bill.provider}</Text>
                      )}
                    </View>
                  </View>

                  {/* Amount */}
                  <View style={{ paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: "#E2E8F0" }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                      <Text style={{ fontSize: 12, color: "#64748B" }}>Amount</Text>
                      {isEditing ? (
                        <View style={{
                          backgroundColor: "#EAEEF4", borderRadius: 8,
                          flexDirection: "row", alignItems: "center", paddingHorizontal: 10,
                        }}>
                          <Text style={{ color: "#64748B", fontSize: 13 }}>₱</Text>
                          <TextInput
                            value={amount}
                            onChangeText={setAmount}
                            keyboardType="numeric"
                            style={{
                              paddingVertical: 6, paddingLeft: 4,
                              fontSize: 13, color: "#1E293B",
                              minWidth: 110, textAlign: "right",
                            }}
                            placeholder="0.00"
                            placeholderTextColor="#94A3B8"
                          />
                        </View>
                      ) : (
                        <Text style={{ fontSize: 12, fontWeight: "700", color: headerColor }}>
                          ₱{parseFloat(bill.amount || 0).toLocaleString()}
                        </Text>
                      )}
                    </View>
                  </View>

                  {/* Status */}
                  <View style={{ paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: "#E2E8F0" }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                      <Text style={{ fontSize: 12, color: "#64748B" }}>Status</Text>
                      {isEditing ? (
                        <View style={{ flexDirection: "row", gap: 8 }}>
                          <TouchableOpacity
                            onPress={() => setStatus("Success")}
                            style={{
                              paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8,
                              backgroundColor: status === "Success" ? "#DCFCE7" : "#EAEEF4",
                              borderWidth: 1.5,
                              borderColor: status === "Success" ? "#86EFAC" : "transparent",
                            }}
                          >
                            <Text style={{ fontSize: 12, fontWeight: "700", color: status === "Success" ? "#16A34A" : "#94A3B8" }}>✓ Paid</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => setStatus("Failed")}
                            style={{
                              paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8,
                              backgroundColor: status === "Failed" ? "#FEE2E2" : "#EAEEF4",
                              borderWidth: 1.5,
                              borderColor: status === "Failed" ? "#FCA5A5" : "transparent",
                            }}
                          >
                            <Text style={{ fontSize: 12, fontWeight: "700", color: status === "Failed" ? "#DC2626" : "#94A3B8" }}>✗ Failed</Text>
                          </TouchableOpacity>
                        </View>
                      ) : (
                        <View style={{
                          backgroundColor: bill.status === "Success" ? "#DCFCE7" : "#FEE2E2",
                          paddingHorizontal: 10, paddingVertical: 3, borderRadius: 20,
                        }}>
                          <Text style={{ fontSize: 11, fontWeight: "700", color: bill.status === "Success" ? "#16A34A" : "#DC2626" }}>
                            {bill.status === "Success" ? "✓ Paid" : "✗ Failed"}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>

                  {/* Date */}
                  <View style={{ paddingVertical: 10 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                      <Text style={{ fontSize: 12, color: "#64748B" }}>Bill Date</Text>
                      {isEditing ? (
                        <TextInput
                          value={date}
                          onChangeText={setDate}
                          style={{
                            backgroundColor: "#EAEEF4", borderRadius: 8,
                            paddingHorizontal: 10, paddingVertical: 6,
                            fontSize: 13, color: "#1E293B",
                            minWidth: 150, textAlign: "right",
                          }}
                          placeholder="MM/DD/YYYY"
                          placeholderTextColor="#94A3B8"
                        />
                      ) : (
                        <Text style={{ fontSize: 12, fontWeight: "700", color: "#1E293B" }}>{bill.date}</Text>
                      )}
                    </View>
                  </View>
                </View>

                {/* Feedback Card — edit mode only */}
                {isEditing && (
                  <View style={{
                    backgroundColor: "#F8FAFC", borderRadius: 13,
                    padding: 14, borderWidth: 1, borderColor: "#E2E8F0",
                  }}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 7, marginBottom: 10 }}>
                      <Text style={{ fontSize: 15 }}>💬</Text>
                      <Text style={{ fontWeight: "bold", fontSize: 14, color: "#1E293B" }}>Feedback</Text>
                    </View>
                    <TextInput
                      value={feedback}
                      onChangeText={setFeedback}
                      multiline
                      numberOfLines={4}
                      textAlignVertical="top"
                      style={{
                        backgroundColor: "#EAEEF4", borderRadius: 9,
                        paddingHorizontal: 12, paddingVertical: 10,
                        fontSize: 13, color: "#1E293B", minHeight: 90,
                      }}
                      placeholder="Add any feedback or observations..."
                      placeholderTextColor="#94A3B8"
                    />
                  </View>
                )}
              </ScrollView>

              {/* Footer Buttons */}
              <View style={{
                flexDirection: "row", gap: 10, padding: 16,
                borderTopWidth: 1, borderTopColor: "#E2E8F0", backgroundColor: "#fff",
              }}>
                <TouchableOpacity
                  onPress={handleCancel}
                  style={{
                    flex: 1, paddingVertical: 14, borderRadius: 11,
                    alignItems: "center", backgroundColor: "#F1F5F9",
                    borderWidth: 1, borderColor: "#E2E8F0",
                  }}
                >
                  <Text style={{ fontWeight: "600", color: "#64748B", fontSize: 14 }}>Cancel</Text>
                </TouchableOpacity>

                {isEditing ? (
                  <TouchableOpacity
                    onPress={handleSave}
                    style={{ flex: 2, paddingVertical: 14, borderRadius: 11, alignItems: "center", backgroundColor: headerColor }}
                  >
                    <Text style={{ fontWeight: "700", color: "#fff", fontSize: 14 }}>💾  Save Changes</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => setIsEditing(true)}
                    style={{ flex: 2, paddingVertical: 14, borderRadius: 11, alignItems: "center", backgroundColor: headerColor }}
                  >
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