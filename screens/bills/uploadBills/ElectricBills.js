import React, { useState, useEffect } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, StatusBar, View, Platform, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import ElectricHeader from "../../../components/bills/uploadBills/electricBills/ElectricHeader";
import ElectricSummaryCards from "../../../components/bills/uploadBills/electricBills/ElectricSummaryCards";
import ElectricBox from "../../../components/bills/uploadBills/electricBills/ElectricBox";
import ElectricInput from "../../../components/bills/uploadBills/electricBills/ElectricInput";
import ElectricActions from "../../../components/bills/uploadBills/electricBills/ElectricActions";
import ElectricRecent from "../../../components/bills/uploadBills/electricBills/ElectricRecent";
// import ElectricTips from "../../../components/bills/uploadBills/electricBills/ElectricTips";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchElectricBills,
  uploadElectricBill,
  removeElectricBillLocal,
  clearRecommendations
} from "../../../redux/slices/bills/electricSlice";
import { fetchAnalytics } from "../../../redux/slices/analytics/analyticsSlice";
import { fetchBills } from "../../../redux/slices/bills/billSlice";

export default function ElectricBills({ navigation }) {
  const category = { name: "Electricity", icon: "⚡", color: "amber" };
  const dispatch = useDispatch();

  const { bills, count, uploading } = useSelector(
    (state) => state.electric
  );

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
    dispatch(fetchElectricBills());
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

      // ✅ FIX: Use the action result directly
      const resultAction = await dispatch(uploadElectricBill(formData));

      // ✅ Check if the action was rejected
      if (uploadElectricBill.rejected.match(resultAction)) {
        throw new Error(resultAction.payload || "Upload failed");
      }

      // ✅ Refresh analytics after successful upload
      dispatch(fetchAnalytics());
      dispatch(fetchBills());

      // Reset form
      setSelectedImageUri(null);
      setBillingPeriod("");
      setProvider("");
      setPaymentStatus("");
      setFeedback("");
      setDate("");
      setCost("");
      setConsumption("");
      setUseManualEntry(false);

      const newBillId = resultAction.payload?.electricBill?._id;

      if (newBillId) {
        navigation.navigate("ElectricBillDetails", { id: newBillId });
      } else {
        Alert.alert("Success", "Electric bill uploaded successfully!");
      }
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
      <ElectricHeader navigation={navigation} category={category} />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* <ElectricSummaryCards electricBills={{ bills, count }} /> */}
        <View className="mx-4 my-4">
          {!useManualEntry && (
            <ElectricBox
              pickImage={pickImage}
              category={category}
              selectedImageUri={selectedImageUri}
              onRemoveImage={removeSelectedImage}
            />
          )}

          <ElectricInput
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

          {/* <ElectricActions pickImage={pickImage} takePhoto={takePhoto} /> */}
        </View>

        <ElectricRecent
          electricBills={bills}
          removeUpload={(id) => {
            dispatch(removeElectricBillLocal(id));
          }}
        />
        {/* <ElectricTips recommendations={recommendations} /> */}
      </ScrollView>
    </SafeAreaView>
  );
}