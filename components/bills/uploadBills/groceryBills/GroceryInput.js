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

export default function GroceryInput({
  store,
  setStore,
  paymentStatus,
  setPaymentStatus,
  feedback,
  setFeedback,
  date,
  setDate,
  cost,
  setCost,
  items,
  setItems,
  category,
  setCategory,
  useManualEntry,
  setUseManualEntry,
  onSubmit,
  hasImage,
  isSubmitting,
}) {
  const [showPaymentDropdown, setShowPaymentDropdown] = React.useState(false);
  const [showStoreDropdown, setShowStoreDropdown] = React.useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = React.useState(false);
  const [showDateModal, setShowDateModal] = React.useState(false);

  const paymentStatuses = ["Paid", "Pending", "Unpaid"];
  const stores = ["SM Supermarket", "Puregold", "Robinson's", "Savemore", "Other"];
  const categories = [
    "Food & Beverages",
    "Household Items",
    "Personal Care",
    "Mixed Items",
  ];

  const [localDate, setLocalDate] = React.useState(date || new Date().toISOString().slice(0, 10));

  const formatDisplay = (iso) => {
    if (!iso) return "";
    const d = new Date(iso);
    if (isNaN(d)) return "";
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }).replace(",", "");
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
      <View className="mb-4 p-3 bg-green-50 rounded-xl border border-green-100">
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
            trackColor={{ false: "#cbd5e1", true: "#22c55e" }}
            thumbColor={useManualEntry ? "#ffffff" : "#f1f5f9"}
          />
        </View>
      </View>

      {/* MANUAL ENTRY */}
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
                    <Text style={{ color: "#22c55e", fontWeight: "600" }}>
                      Close
                    </Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
          </View>

          {/* Cost */}
          <View className="mb-4">
            <Text className="text-sm font-medium text-slate-600 mb-2">
              Total Cost <Text className="text-red-500">*</Text>
            </Text>
            <TextInput
              className="bg-slate-50 rounded-xl px-4 py-3 text-slate-800 border border-slate-200"
              placeholder="e.g., 1500.00"
              value={cost}
              onChangeText={setCost}
              keyboardType="decimal-pad"
            />
          </View>

          {/* Items */}
          <View className="mb-4">
            <Text className="text-sm font-medium text-slate-600 mb-2">
              Number of Items <Text className="text-red-500">*</Text>
            </Text>
            <TextInput
              className="bg-slate-50 rounded-xl px-4 py-3 text-slate-800 border border-slate-200"
              placeholder="e.g., 15"
              value={items}
              onChangeText={setItems}
              keyboardType="number-pad"
            />
          </View>

          {/* Store */}
          <View className="mb-4">
            <Text className="text-sm font-medium text-slate-600 mb-2">
              Store <Text className="text-red-500">*</Text>
            </Text>

            <TouchableOpacity
              className="bg-slate-50 rounded-xl px-4 py-3 border border-slate-200 flex-row items-center justify-between"
              onPress={() => setShowStoreDropdown(!showStoreDropdown)}
            >
              <Text className={store ? "text-slate-800" : "text-slate-400"}>
                {store || "Select store"}
              </Text>
              <Ionicons
                name={showStoreDropdown ? "chevron-up" : "chevron-down"}
                size={20}
                color="#64748b"
              />
            </TouchableOpacity>

            {showStoreDropdown && (
              <View className="bg-white border border-slate-200 rounded-xl mt-2 overflow-hidden shadow-lg">
                {stores.map((item) => (
                  <TouchableOpacity
                    key={item}
                    className="px-4 py-3 border-b border-slate-100 flex-row items-center justify-between"
                    onPress={() => {
                      setStore(item);
                      setShowStoreDropdown(false);
                    }}
                  >
                    <Text className="text-slate-800">{item}</Text>
                    {store === item && (
                      <Ionicons
                        name="checkmark"
                        size={20}
                        color="#22c55e"
                      />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Category */}
          <View className="mb-4">
            <Text className="text-sm font-medium text-slate-600 mb-2">
              Category <Text className="text-red-500">*</Text>
            </Text>

            <TouchableOpacity
              className="bg-slate-50 rounded-xl px-4 py-3 border border-slate-200 flex-row items-center justify-between"
              onPress={() => setShowCategoryDropdown(!showCategoryDropdown)}
            >
              <Text className={category ? "text-slate-800" : "text-slate-400"}>
                {category || "Select category"}
              </Text>
              <Ionicons
                name={showCategoryDropdown ? "chevron-up" : "chevron-down"}
                size={20}
                color="#64748b"
              />
            </TouchableOpacity>

            {showCategoryDropdown && (
              <View className="bg-white border border-slate-200 rounded-xl mt-2 overflow-hidden shadow-lg">
                {categories.map((item) => (
                  <TouchableOpacity
                    key={item}
                    className="px-4 py-3 border-b border-slate-100 flex-row items-center justify-between"
                    onPress={() => {
                      setCategory(item);
                      setShowCategoryDropdown(false);
                    }}
                  >
                    <Text className="text-slate-800">{item}</Text>
                    {category === item && (
                      <Ionicons
                        name="checkmark"
                        size={20}
                        color="#22c55e"
                      />
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
              onPress={() => setShowPaymentDropdown(!showPaymentDropdown)}
            >
              <Text
                className={
                  paymentStatus ? "text-slate-800" : "text-slate-400"
                }
              >
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
                      <Ionicons
                        name="checkmark"
                        size={20}
                        color="#22c55e"
                      />
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
              placeholder="Any notes about this purchase..."
              value={feedback}
              onChangeText={setFeedback}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
        </>
      ) : (
        /* OCR / IMAGE UPLOAD */
        <>
          {/* Category */}
          <View className="mb-4">
            <Text className="text-sm font-medium text-slate-600 mb-2">
              Category <Text className="text-red-500">*</Text>
            </Text>

            <TouchableOpacity
              className="bg-slate-50 rounded-xl px-4 py-3 border border-slate-200 flex-row items-center justify-between"
              onPress={() => setShowCategoryDropdown(!showCategoryDropdown)}
            >
              <Text className={category ? "text-slate-800" : "text-slate-400"}>
                {category || "Select category"}
              </Text>
              <Ionicons
                name={showCategoryDropdown ? "chevron-up" : "chevron-down"}
                size={20}
                color="#64748b"
              />
            </TouchableOpacity>

            {showCategoryDropdown && (
              <View className="bg-white border border-slate-200 rounded-xl mt-2 overflow-hidden shadow-lg">
                {categories.map((item) => (
                  <TouchableOpacity
                    key={item}
                    className="px-4 py-3 border-b border-slate-100 flex-row items-center justify-between"
                    onPress={() => {
                      setCategory(item);
                      setShowCategoryDropdown(false);
                    }}
                  >
                    <Text className="text-slate-800">{item}</Text>
                    {category === item && (
                      <Ionicons
                        name="checkmark"
                        size={20}
                        color="#22c55e"
                      />
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
              onPress={() => setShowPaymentDropdown(!showPaymentDropdown)}
            >
              <Text
                className={
                  paymentStatus ? "text-slate-800" : "text-slate-400"
                }
              >
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
                      <Ionicons
                        name="checkmark"
                        size={20}
                        color="#22c55e"
                      />
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
              placeholder="Any notes about this purchase..."
              value={feedback}
              onChangeText={setFeedback}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
        </>
      )}

      {/* Submit Button */}
      <TouchableOpacity
        className={`rounded-xl py-4 items-center ${useManualEntry
          ? store &&
            date &&
            cost &&
            items &&
            category &&
            paymentStatus &&
            !isSubmitting
            ? "bg-green-500"
            : "bg-slate-300"
          : hasImage &&
            category &&
            paymentStatus &&
            !isSubmitting
            ? "bg-green-500"
            : "bg-slate-300"
          }`}
        onPress={onSubmit}
        disabled={
          isSubmitting ||
          (useManualEntry
            ? !store ||
            !date ||
            !cost ||
            !items ||
            !category ||
            !paymentStatus
            : !hasImage || !category || !paymentStatus)
        }
      >
        <View className="flex-row items-center">
          {isSubmitting && (
            <Ionicons
              name="hourglass-outline"
              size={20}
              color="white"
              style={{ marginRight: 8 }}
            />
          )}
          <Text className="text-white font-semibold text-base">
            {isSubmitting ? "Submitting..." : "Submit Bill"}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
