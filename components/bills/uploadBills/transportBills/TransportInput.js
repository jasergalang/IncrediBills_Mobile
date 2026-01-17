import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
  Modal,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Calendar } from "react-native-calendars";

export default function TransportInput({
  stationLocation,
  setStationLocation,
  provider,
  setProvider,
  liters,
  setLiters,
  paymentStatus,
  setPaymentStatus,
  feedback,
  setFeedback,
  date,
  setDate,
  cost,
  setCost,
  useManualEntry,
  setUseManualEntry,
  onSubmit,
  hasImage,
  isSubmitting,
}) {
  const [showPaymentDropdown, setShowPaymentDropdown] = React.useState(false);
  const [showProviderDropdown, setShowProviderDropdown] = React.useState(false);
  const [showDateModal, setShowDateModal] = React.useState(false);

  const paymentStatuses = ["Paid", "Pending", "Unpaid"];
  const providers = ["Shell", "Petron", "Gaz", "Others"];

  const [localDate, setLocalDate] = React.useState(
    date || new Date().toISOString().slice(0, 10)
  );

  const formatDisplay = (iso) => {
    if (!iso) return "";
    const d = new Date(iso);
    if (isNaN(d)) return "";
    return d
      .toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
      .replace(",", "");
  };

  React.useEffect(() => {
    if (date) setLocalDate(date);
  }, [date]);

  const onSelectDate = (day) => {
    setLocalDate(day.dateString);
    setDate(day.dateString);
    setShowDateModal(false);
  };

  return (
    <View className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
      <Text className="text-lg font-semibold text-slate-800 mb-4">
        Bill Information
      </Text>

      {/* Manual / OCR Toggle */}
      <View className="mb-4 p-3 bg-red-50 rounded-xl border border-red-100">
        <View className="flex-row items-center justify-between">
          <View className="flex-1 mr-3">
            <Text className="text-sm font-semibold text-slate-800 mb-1">
              Manual Entry Mode
            </Text>
            <Text className="text-xs text-slate-600">
              {useManualEntry
                ? "Enter details manually (no image required)"
                : "Upload image and use OCR"}
            </Text>
          </View>
          <Switch
            value={useManualEntry}
            onValueChange={setUseManualEntry}
            trackColor={{ false: "#cbd5e1", true: "#ef4444" }}
            thumbColor={useManualEntry ? "#ffffff" : "#f1f5f9"}
          />
        </View>
      </View>

      {useManualEntry ? (
        <>
          {/* Date */}
          <View className="mb-4">
            <Text className="text-sm font-medium text-slate-600 mb-2">
              Date <Text className="text-red-500">*</Text>
            </Text>

            <TouchableOpacity
              className="bg-slate-50 rounded-xl px-4 py-3 border border-slate-200"
              onPress={() => setShowDateModal(true)}
            >
              <Text className="text-slate-800">
                {formatDisplay(localDate)}
              </Text>
            </TouchableOpacity>

            <Modal visible={showDateModal} transparent animationType="slide">
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  backgroundColor: "rgba(0,0,0,0.4)",
                }}
              >
                <View
                  style={{
                    margin: 20,
                    backgroundColor: "white",
                    borderRadius: 12,
                    overflow: "hidden",
                  }}
                >
                  <Calendar
                    onDayPress={onSelectDate}
                    markedDates={{
                      [localDate]: { selected: true },
                    }}
                  />
                  <Pressable
                    onPress={() => setShowDateModal(false)}
                    style={{ padding: 12, alignItems: "center" }}
                  >
                    <Text style={{ color: "#ef4444", fontWeight: "600" }}>
                      Close
                    </Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
          </View>

          {/* Provider */}
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
                      <Ionicons
                        name="checkmark"
                        size={20}
                        color="#ef4444"
                      />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>



          {/* Liters */}
          <View className="mb-4">
            <Text className="text-sm font-medium text-slate-600 mb-2">
              Liters <Text className="text-red-500">*</Text>
            </Text>
            <TextInput
              className="bg-slate-50 rounded-xl px-4 py-3 text-slate-800 border border-slate-200"
              placeholder="e.g., 25.5"
              value={liters}
              onChangeText={setLiters}
              keyboardType="decimal-pad"
            />
          </View>

          {/* Cost */}
          <View className="mb-4">
            <Text className="text-sm font-medium text-slate-600 mb-2">
              Fuel Cost <Text className="text-red-500">*</Text>
            </Text>
            <TextInput
              className="bg-slate-50 rounded-xl px-4 py-3 text-slate-800 border border-slate-200"
              placeholder="e.g., 1200.00"
              value={cost}
              onChangeText={setCost}
              keyboardType="decimal-pad"
            />
          </View>
        </>
      ) : null}

      {/* Station */}
      <View className="mb-4">
        <Text className="text-sm font-medium text-slate-600 mb-2">
          Station Location <Text className="text-red-500">*</Text>
        </Text>
        <TextInput
          className="bg-slate-50 rounded-xl px-4 py-3 text-slate-800 border border-slate-200"
          placeholder="e.g., Shell EDSA Guadalupe"
          value={stationLocation}
          onChangeText={setStationLocation}
        />
      </View>
      
      {/* Payment Status */}
      <View className="mb-4">


        <Text className="text-sm font-medium text-slate-600 mb-2">
          Payment Status <Text className="text-red-500">*</Text>
        </Text>

        <TouchableOpacity
          className="bg-slate-50 rounded-xl px-4 py-3 border border-slate-200 flex-row items-center justify-between"
          onPress={() => setShowPaymentDropdown(!showPaymentDropdown)}
        >
          <Text className={paymentStatus ? "text-slate-800" : "text-slate-400"}>
            {paymentStatus || "Select payment status"}
          </Text>
          <Ionicons
            name={showPaymentDropdown ? "chevron-up" : "chevron-down"}
            size={20}
            color="#64748b"
          />
        </TouchableOpacity>

        {showPaymentDropdown && (
          <View className="bg-white border border-slate-200 rounded-xl mt-2 overflow-hidden shadow-lg">
            {paymentStatuses.map((status) => (
              <TouchableOpacity
                key={status}
                className="px-4 py-3 border-b border-slate-100 flex-row items-center justify-between"
                onPress={() => {
                  setPaymentStatus(status);
                  setShowPaymentDropdown(false);
                }}
              >
                <Text className="text-slate-800">{status}</Text>
                {paymentStatus === status && (
                  <Ionicons name="checkmark" size={20} color="#ef4444" />
                )}
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
          placeholder="Any notes about this fuel purchase..."
          value={feedback}
          onChangeText={setFeedback}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
      </View>

      {/* Submit */}
      <TouchableOpacity
        className={`rounded-xl py-4 items-center ${useManualEntry
          ? provider &&
            stationLocation &&
            liters &&
            date &&
            cost &&
            paymentStatus &&
            !isSubmitting
            ? "bg-red-500"
            : "bg-slate-300"
          : hasImage &&
            stationLocation &&
            paymentStatus &&
            !isSubmitting
            ? "bg-red-500"
            : "bg-slate-300"
          }`}
        onPress={onSubmit}
        disabled={
          isSubmitting ||
          (useManualEntry
            ? !provider ||
            !stationLocation ||
            !liters ||
            !date ||
            !cost ||
            !paymentStatus
            : !hasImage || !stationLocation || !paymentStatus)
        }
      >
        <Text className="text-white font-semibold text-base">
          {isSubmitting ? "Submitting..." : "Submit Bill"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
