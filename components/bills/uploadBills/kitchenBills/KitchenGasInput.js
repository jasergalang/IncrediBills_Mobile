// KitchenGasInput.js
import React from "react";
import { View, Text, TextInput, TouchableOpacity, Switch, Modal, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Calendar } from "react-native-calendars";

export default function KitchenGasInput({
  billingPeriod,
  setBillingPeriod,
  provider,
  setProvider,
  paymentStatus,
  setPaymentStatus,
  feedback,
  setFeedback,
  date,
  setDate,
  cost,
  setCost,
  consumption,
  setConsumption,
  useManualEntry,
  setUseManualEntry,
  onSubmit,
  hasImage,
  isSubmitting,
}) {
  const [showDropdown, setShowDropdown] = React.useState(false);
  const paymentStatuses = ["Paid", "Pending", "Unpaid"];
  const providers = ["Meralco", "Manila Electric Company", "Other"];
  const [showProviderDropdown, setShowProviderDropdown] = React.useState(false);

  // Helpers to parse/format billing range and dates
  const formatDisplay = (iso) => {
    if (!iso) return "";
    const d = new Date(iso);
    if (isNaN(d)) return "";
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }).replace(",", "");
  };

  const parseRange = (rangeStr) => {
    if (!rangeStr) return [null, null];
    const parts = rangeStr.split(" - ");
    if (parts.length !== 2) return [null, null];
    const a = new Date(parts[0]);
    const b = new Date(parts[1]);
    return [isNaN(a) ? null : a.toISOString().slice(0, 10), isNaN(b) ? null : b.toISOString().slice(0, 10)];
  };

  // Local state for modals and selected ISO dates (YYYY-MM-DD)
  const [showDateModal, setShowDateModal] = React.useState(false);
  const [showBillingStartModal, setShowBillingStartModal] = React.useState(false);
  const [showBillingEndModal, setShowBillingEndModal] = React.useState(false);

  const [localDate, setLocalDate] = React.useState(date || new Date().toISOString().slice(0, 10));
  const [billingStart, billingEnd] = parseRange(billingPeriod);
  const [localBillingStart, setLocalBillingStart] = React.useState(billingStart || new Date().toISOString().slice(0, 10));
  const [localBillingEnd, setLocalBillingEnd] = React.useState(billingEnd || new Date().toISOString().slice(0, 10));

  React.useEffect(() => {
    if (date) setLocalDate(date);
  }, [date]);

  React.useEffect(() => {
    const [s, e] = parseRange(billingPeriod);
    if (s) setLocalBillingStart(s);
    if (e) setLocalBillingEnd(e);
  }, [billingPeriod]);

  const onSelectDate = (day) => {
    setLocalDate(day.dateString);
    setDate(day.dateString);
    setShowDateModal(false);
  };

  const commitBillingRange = (startIso, endIso) => {
    setLocalBillingStart(startIso);
    setLocalBillingEnd(endIso);
    const formatted = `${formatDisplay(startIso)} - ${formatDisplay(endIso)}`;
    setBillingPeriod(formatted);
  };

  const onSelectBillingStart = (day) => {
    const startIso = day.dateString;
    const endIso = localBillingEnd && new Date(localBillingEnd) < new Date(startIso) ? startIso : localBillingEnd;
    commitBillingRange(startIso, endIso || startIso);
    setShowBillingStartModal(false);
  };

  const onSelectBillingEnd = (day) => {
    const endIso = day.dateString;
    const startIso = localBillingStart && new Date(localBillingStart) > new Date(endIso) ? endIso : localBillingStart;
    commitBillingRange(startIso || endIso, endIso);
    setShowBillingEndModal(false);
  };

  return (
    <View className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
      <Text className="text-lg font-semibold text-slate-800 mb-4">Bill Information</Text>

      {/* Manual / OCR Toggle */}
      <View className="mb-4 p-3 bg-amber-50 rounded-xl border border-amber-100">
        <View className="flex-row items-center justify-between">
          <View className="flex-1 mr-3">
            <Text className="text-sm font-semibold text-slate-800 mb-1">Manual Entry Mode</Text>
            <Text className="text-xs text-slate-600">
              {useManualEntry ? "Enter details manually (no image required)" : "Upload image and use OCR"}
            </Text>
          </View>
          <Switch
            value={useManualEntry}
            onValueChange={setUseManualEntry}
            trackColor={{ false: "#cbd5e1", true: "#f59e0b" }}
            thumbColor={useManualEntry ? "#ffffff" : "#f1f5f9"}
          />
        </View>
      </View>

      {useManualEntry ? (
        // Manual entry inputs
        <>
          <View className="mb-4">
            <Text className="text-sm font-medium text-slate-600 mb-2">
              Date <Text className="text-red-500">*</Text>
            </Text>

            <TouchableOpacity
              className="bg-slate-50 rounded-xl px-4 py-3 border border-slate-200"
              onPress={() => setShowDateModal(true)}
            >
              <Text className="text-slate-800">{formatDisplay(localDate)}</Text>
            </TouchableOpacity>

            <Modal visible={showDateModal} transparent animationType="slide">
              <View style={{ flex: 1, justifyContent: "center", backgroundColor: "rgba(0,0,0,0.4)" }}>
                <View style={{ margin: 20, backgroundColor: "white", borderRadius: 12, overflow: "hidden" }}>
                  <Calendar onDayPress={onSelectDate} markedDates={{ [localDate]: { selected: true } }} />
                  <Pressable onPress={() => setShowDateModal(false)} style={{ padding: 12, alignItems: "center" }}>
                    <Text style={{ color: "#f59e0b", fontWeight: "600" }}>Close</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
          </View>

          <View className="mb-4">
            <Text className="text-sm font-medium text-slate-600 mb-2">
              Cost <Text className="text-red-500">*</Text>
            </Text>
            <TextInput
              className="bg-slate-50 rounded-xl px-4 py-3 text-slate-800 border border-slate-200"
              placeholder="e.g., 2500.00"
              value={cost}
              onChangeText={setCost}
              keyboardType="decimal-pad"
            />
          </View>

          <View className="mb-4">
            <Text className="text-sm font-medium text-slate-600 mb-2">
              Consumption <Text className="text-red-500">*</Text>
            </Text>
            <TextInput
              className="bg-slate-50 rounded-xl px-4 py-3 text-slate-800 border border-slate-200"
              placeholder="e.g., 350 (kWh)"
              value={consumption}
              onChangeText={setConsumption}
              keyboardType="decimal-pad"
            />
          </View>

          <View className="mb-4">
            <Text className="text-sm font-medium text-slate-600 mb-2">
              Billing Period <Text className="text-red-500">*</Text>
            </Text>

            <View className="flex-row gap-2">
              <TouchableOpacity
                className="flex-1 bg-slate-50 rounded-xl px-4 py-3 border border-slate-200"
                onPress={() => setShowBillingStartModal(true)}
              >
                <Text className="text-slate-800">Start: {formatDisplay(localBillingStart)}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-1 bg-slate-50 rounded-xl px-4 py-3 border border-slate-200"
                onPress={() => setShowBillingEndModal(true)}
              >
                <Text className="text-slate-800">End: {formatDisplay(localBillingEnd)}</Text>
              </TouchableOpacity>
            </View>

            <Modal visible={showBillingStartModal} transparent animationType="slide">
              <View style={{ flex: 1, justifyContent: "center", backgroundColor: "rgba(0,0,0,0.4)" }}>
                <View style={{ margin: 20, backgroundColor: "white", borderRadius: 12, overflow: "hidden" }}>
                  <Calendar onDayPress={onSelectBillingStart} markedDates={{ [localBillingStart]: { selected: true } }} />
                  <Pressable onPress={() => setShowBillingStartModal(false)} style={{ padding: 12, alignItems: "center" }}>
                    <Text style={{ color: "#f59e0b", fontWeight: "600" }}>Close</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>

            <Modal visible={showBillingEndModal} transparent animationType="slide">
              <View style={{ flex: 1, justifyContent: "center", backgroundColor: "rgba(0,0,0,0.4)" }}>
                <View style={{ margin: 20, backgroundColor: "white", borderRadius: 12, overflow: "hidden" }}>
                  <Calendar onDayPress={onSelectBillingEnd} markedDates={{ [localBillingEnd]: { selected: true } }} />
                  <Pressable onPress={() => setShowBillingEndModal(false)} style={{ padding: 12, alignItems: "center" }}>
                    <Text style={{ color: "#f59e0b", fontWeight: "600" }}>Close</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
          </View>

          <View className="mb-4">
            <Text className="text-sm font-medium text-slate-600 mb-2">
              Provider <Text className="text-red-500">*</Text>
            </Text>

            <TouchableOpacity
              className="bg-slate-50 rounded-xl px-4 py-3 border border-slate-200 flex-row items-center justify-between"
              onPress={() => setShowProviderDropdown(!showProviderDropdown)}
            >
              <Text className={provider ? "text-slate-800" : "text-slate-400"}>
                {provider || "Select provider"}
              </Text>
              <Ionicons
                name={showProviderDropdown ? "chevron-up" : "chevron-down"}
                size={20}
                color="#64748b"
              />
            </TouchableOpacity>

            {showProviderDropdown && (
              <View className="bg-white border border-slate-200 rounded-xl mt-2 overflow-hidden shadow-lg">
                {providers.map((item) => (
                  <TouchableOpacity
                    key={item}
                    className="px-4 py-3 border-b border-slate-100 flex-row items-center justify-between"
                    onPress={() => {
                      setProvider(item);
                      setShowProviderDropdown(false);
                    }}
                  >
                    <Text className="text-slate-800">{item}</Text>
                    {provider === item && (
                      <Ionicons name="checkmark" size={20} color="#f59e0b" />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Payment Status */}
          <View className="mb-4">
            <Text className="text-sm font-medium text-slate-600 mb-2">
              Payment Status <Text className="text-red-500">*</Text>
            </Text>
            <TouchableOpacity
              className="bg-slate-50 rounded-xl px-4 py-3 border border-slate-200 flex-row items-center justify-between"
              onPress={() => setShowDropdown(!showDropdown)}
            >
              <Text className={paymentStatus ? "text-slate-800 capitalize" : "text-slate-400"}>
                {paymentStatus || "Select payment status"}
              </Text>
              <Ionicons name={showDropdown ? "chevron-up" : "chevron-down"} size={20} color="#64748b" />
            </TouchableOpacity>

            {showDropdown && (
              <View className="bg-white border border-slate-200 rounded-xl mt-2 overflow-hidden shadow-lg">
                {paymentStatuses.map((status) => (
                  <TouchableOpacity
                    key={status}
                    className="px-4 py-3 border-b border-slate-100 flex-row items-center justify-between"
                    onPress={() => {
                      setPaymentStatus(status);
                      setShowDropdown(false);
                    }}
                  >
                    <Text className="text-slate-800 capitalize">{status}</Text>
                    {paymentStatus === status && <Ionicons name="checkmark" size={20} color="#f59e0b" />}
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Feedback */}
          <View className="mb-4">
            <Text className="text-sm font-medium text-slate-600 mb-2">
              Feedback / Notes <Text className="text-slate-400">(optional)</Text>
            </Text>
            <TextInput
              className="bg-slate-50 rounded-xl px-4 py-3 text-slate-800 border border-slate-200"
              placeholder="Any notes about this bill..."
              value={feedback}
              onChangeText={setFeedback}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
        </>
      ) : (
        // OCR/upload mode: only payment status + feedback
        <>
          <View className="mb-4">
            <Text className="text-sm font-medium text-slate-600 mb-2">
              Payment Status <Text className="text-red-500">*</Text>
            </Text>
            <TouchableOpacity
              className="bg-slate-50 rounded-xl px-4 py-3 border border-slate-200 flex-row items-center justify-between"
              onPress={() => setShowDropdown(!showDropdown)}
            >
              <Text className={paymentStatus ? "text-slate-800 capitalize" : "text-slate-400"}>
                {paymentStatus || "Select payment status"}
              </Text>
              <Ionicons name={showDropdown ? "chevron-up" : "chevron-down"} size={20} color="#64748b" />
            </TouchableOpacity>

            {showDropdown && (
              <View className="bg-white border border-slate-200 rounded-xl mt-2 overflow-hidden shadow-lg">
                {paymentStatuses.map((status) => (
                  <TouchableOpacity
                    key={status}
                    className="px-4 py-3 border-b border-slate-100 flex-row items-center justify-between"
                    onPress={() => {
                      setPaymentStatus(status);
                      setShowDropdown(false);
                    }}
                  >
                    <Text className="text-slate-800 capitalize">{status}</Text>
                    {paymentStatus === status && <Ionicons name="checkmark" size={20} color="#f59e0b" />}
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          <View className="mb-4">
            <Text className="text-sm font-medium text-slate-600 mb-2">
              Feedback / Notes <Text className="text-slate-400">(optional)</Text>
            </Text>
            <TextInput
              className="bg-slate-50 rounded-xl px-4 py-3 text-slate-800 border border-slate-200"
              placeholder="Any notes about this bill..."
              value={feedback}
              onChangeText={setFeedback}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
        </>
      )}

      <TouchableOpacity
        className={`rounded-xl py-4 items-center ${
          (useManualEntry
            ? billingPeriod && provider && date && cost && consumption && paymentStatus && !isSubmitting
            : hasImage && paymentStatus && !isSubmitting)
            ? "bg-amber-500"
            : "bg-slate-300"
        }`}
        onPress={onSubmit}
        disabled={
          isSubmitting ||
          (useManualEntry
            ? !billingPeriod || !provider || !date || !cost || !consumption || !paymentStatus
            : !hasImage || !paymentStatus)
        }
      >
        <View className="flex-row items-center">
          {isSubmitting && <Ionicons name="hourglass-outline" size={20} color="white" style={{ marginRight: 8 }} />}
          <Text className="text-white font-semibold text-base">
            {isSubmitting ? "Submitting..." : "Submit Bill"}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}