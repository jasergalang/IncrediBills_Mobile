import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, StatusBar, View, Platform, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import UploadHeader from "../../../components/bills/uploadBills/waterBills/WaterHeader";
import WaterSummaryCards from "../../../components/bills/uploadBills/waterBills/WaterSummaryCards";
import UploadBox from "../../../components/bills/uploadBills/waterBills/WaterBox";
import WaterInput from "../../../components/bills/uploadBills/waterBills/WaterInput";
import UploadActions from "../../../components/bills/uploadBills/waterBills/WaterActions";
import UploadRecent from "../../../components/bills/uploadBills/waterBills/WaterRecent";
import UploadTips from "../../../components/bills/uploadBills/waterBills/WaterTips";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchWaterBills,
  uploadWaterBill,
  removeWaterBillLocal,
  clearRecommendations
} from "../../../redux/slices/bills/waterSlice";
import { fetchAnalytics } from "../../../redux/slices/analytics/analyticsSlice";
import { fetchBills } from "../../../redux/slices/bills/billSlice";

export default function UploadBill({ navigation }) {
  const category = { name: "Water", icon: "💧", color: "blue" };
  const dispatch = useDispatch();

  const { bills, count, uploading, recommendations } = useSelector((state) => state.water);

  const [selectedImageUri, setSelectedImageUri] = useState(null);
  const [billingPeriod, setBillingPeriod] = useState("");
  const [provider, setProvider] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [feedback, setFeedback] = useState("");
  const [date, setDate] = useState("");
  const [cost, setCost] = useState("");
  const [consumption, setConsumption] = useState("");
  const [useManualEntry, setUseManualEntry] = useState(false);

  useEffect(() => {
    dispatch(fetchWaterBills());
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

    // Validation
    if (!useManualEntry && !selectedImageUri) {
      Alert.alert("Error", "Please select an image first.");
      return;
    }

    if (useManualEntry) {
      if (!billingPeriod || !provider || !paymentStatus || !date || !cost || !consumption) {
        Alert.alert("Error", "Please fill in all required manual fields.");
        return;
      }
    } else if (!paymentStatus) {
      Alert.alert("Error", "Please select payment status.");
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
        formData.append("consumption", consumption);
      }

      formData.append("billingPeriod", billingPeriod);
      formData.append("provider", provider);
      formData.append("paymentStatus", paymentStatus);
      if (feedback) formData.append("feedback", feedback);

      const resultAction = await dispatch(uploadWaterBill(formData));
      // console.log("FULL PAYLOAD:", JSON.stringify(resultAction.payload, null, 2))
      if (uploadWaterBill.rejected.match(resultAction)) {
        throw new Error(resultAction.payload || "Upload failed");
      }

      dispatch(fetchAnalytics());
      dispatch(fetchBills());

      setSelectedImageUri(null); setBillingPeriod(""); setProvider("");
      setPaymentStatus(""); setFeedback(""); setDate("");
      setCost(""); setConsumption(""); setUseManualEntry(false);

      const newBillId = resultAction.payload?.waterBill?._id;
      // console.log("NEW BILL ID:", newBillId);

      if (newBillId) {
        navigation.navigate("WaterBillDetails", { id: newBillId });
      } else {
        Alert.alert("Success", "Water bill uploaded successfully!");
      }
    } catch (err) {
      console.error("Upload error:", err);
      Alert.alert("Upload Failed", err?.message || "An error occurred.");
    }

  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
      <UploadHeader navigation={navigation} category={category} />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* <WaterSummaryCards waterBills={{ bills, count }} /> */}
        <View className="mx-4 my-4">
          {!useManualEntry && (
            <UploadBox
              pickImage={pickImage}
              category={category}
              selectedImageUri={selectedImageUri}
              onRemoveImage={removeSelectedImage}
            />
          )}

          <WaterInput
            billingPeriod={billingPeriod}
            setBillingPeriod={setBillingPeriod}
            provider={provider}
            setProvider={setProvider}
            paymentStatus={paymentStatus}
            setPaymentStatus={setPaymentStatus}
            feedback={feedback}
            setFeedback={setFeedback}
            date={date}
            setDate={setDate}
            cost={cost}
            setCost={setCost}
            consumption={consumption}
            setConsumption={setConsumption}
            useManualEntry={useManualEntry}
            setUseManualEntry={setUseManualEntry}
            onSubmit={uploadBill}
            hasImage={!!selectedImageUri}
            isSubmitting={uploading}
          />

          {/* <UploadActions pickImage={pickImage} takePhoto={takePhoto} /> */}
        </View>

        {/* ✅ Use Redux action for removal */}
        <UploadRecent
          waterBills={bills}
          removeUpload={(id) => {
            dispatch(removeWaterBillLocal(id));
          }}
        />
        <UploadTips recommendations={recommendations} />
      </ScrollView>
    </SafeAreaView>
  );
}