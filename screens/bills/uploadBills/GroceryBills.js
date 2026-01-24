import React, { useState, useEffect } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, StatusBar, View, Platform, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import GroceryHeader from "../../../components/bills/uploadBills/groceryBills/GroceryHeader";
import GrocerySummaryCards from "../../../components/bills/uploadBills/groceryBills/GrocerySummaryCards";
import GroceryBox from "../../../components/bills/uploadBills/groceryBills/GroceryBox";
import GroceryInput from "../../../components/bills/uploadBills/groceryBills/GroceryInput";
import GroceryActions from "../../../components/bills/uploadBills/groceryBills/GroceryActions";
import GroceryRecent from "../../../components/bills/uploadBills/groceryBills/GroceryRecent";
import GroceryTips from "../../../components/bills/uploadBills/groceryBills/GroceryTips";


import { useDispatch, useSelector } from "react-redux";
import {
  fetchGroceryBills,
  uploadGroceryBill,
  removeGroceryBillLocal,
  clearRecommendations
} from "../../../redux/slices/bills/grocerySlice";
import { fetchAnalytics } from "../../../redux/slices/analytics/analyticsSlice";
import { fetchBills } from "../../../redux/slices/bills/billSlice";

export default function GroceryBills({ navigation }) {
  const category = { name: "Groceries", icon: "🛒", color: "green" };
  const dispatch = useDispatch();

  const { bills, count, uploading, recommendations } = useSelector(
    (state) => state.grocery
  );

  const [selectedImageUri, setSelectedImageUri] = useState(null);
  const [store, setStore] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [feedback, setFeedback] = useState("");
  const [date, setDate] = useState("");
  const [cost, setCost] = useState("");
  const [items, setItems] = useState("");
  const [categoryType, setCategoryType] = useState("");
  const [useManualEntry, setUseManualEntry] = useState(false);

  useEffect(() => {
    dispatch(fetchGroceryBills());
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(clearRecommendations());
    };
  }, [dispatch]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });
    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setSelectedImageUri(uri);
    }
  };

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setSelectedImageUri(uri);
    }
  };

  const removeSelectedImage = () => {
    setSelectedImageUri(null);
  };

  const uploadBill = async () => {
    if (uploading) return;

    if (!useManualEntry && !selectedImageUri) {
      Alert.alert("Error", "Please select an image first.");
      return;
    }

    if (useManualEntry) {
      if (!store || !paymentStatus || !date || !cost || !items || !categoryType) {
        Alert.alert("Error", "Please fill in all required manual fields.");
        return;
      }
    } else if (!paymentStatus || !categoryType) {
      Alert.alert("Error", "Please select payment status and category.");
      return;
    }

    try {
      const formData = new FormData();

      if (!useManualEntry && selectedImageUri) {
        const filename = selectedImageUri.split("/").pop();
        const ext = filename.split(".").pop();
        const type = `image/${ext}`;

        formData.append("billImage", {
          uri:
            Platform.OS === "android"
              ? selectedImageUri
              : selectedImageUri.replace("file://", ""),
          name: filename,
          type,
        });

        formData.append("useOCR", "true");
      } else {
        formData.append("useOCR", "false");
        formData.append("date", date);
        formData.append("cost", cost);
        formData.append("quantity", items);
      }
      formData.append("store", store);
      formData.append("paymentStatus", paymentStatus);
      formData.append("category", categoryType);
      if (feedback) formData.append("feedback", feedback);

      const resultAction = await dispatch(uploadGroceryBill(formData));

      if (uploadGroceryBill.rejected.match(resultAction)) {
        throw new Error(resultAction.payload || "Upload failed");
      }

      // Refresh analytics after successful upload
      dispatch(fetchAnalytics());
      dispatch(fetchBills());

      // Reset form
      setSelectedImageUri(null);
      setStore("");
      setPaymentStatus("");
      setFeedback("");
      setDate("");
      setCost("");
      setItems("");
      setCategoryType("");
      setUseManualEntry(false);

      Alert.alert("Success", "Grocery bill uploaded successfully!");
    } catch (err) {
      console.error("Upload error:", err);
      Alert.alert(
        "Upload Failed",
        err?.message || err?.toString() || "An error occurred while uploading the bill."
      );
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
      <GroceryHeader navigation={navigation} category={category} />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <GrocerySummaryCards groceryBills={{ bills, count }} category={category} />
        <View className="mx-4">
          {!useManualEntry && (
            <GroceryBox
              pickImage={pickImage}
              category={category}
              selectedImageUri={selectedImageUri}
              onRemoveImage={removeSelectedImage}
            />
          )}

          <GroceryInput
            store={store}
            setStore={setStore}
            paymentStatus={paymentStatus}
            setPaymentStatus={setPaymentStatus}
            feedback={feedback}
            setFeedback={setFeedback}
            date={date}
            setDate={setDate}
            cost={cost}
            setCost={setCost}
            items={items}
            setItems={setItems}
            category={categoryType}
            setCategory={setCategoryType}
            useManualEntry={useManualEntry}
            setUseManualEntry={setUseManualEntry}
            onSubmit={uploadBill}
            hasImage={!!selectedImageUri}
            isSubmitting={uploading}
          />

          <GroceryActions pickImage={pickImage} takePhoto={takePhoto} />
        </View>

        <GroceryRecent
          groceryBills={bills}
          removeUpload={(id) => {
            dispatch(removeGroceryBillLocal(id));
          }}
        />
        <GroceryTips recommendations={recommendations} />
      </ScrollView>
    </SafeAreaView>
  );
}