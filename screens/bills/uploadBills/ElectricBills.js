import React, { useState, useEffect } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, StatusBar, View, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import ElectricHeader from "../../../components/bills/uploadBills/electricBills/ElectricHeader";
import ElectricSummaryCards from "../../../components/bills/uploadBills/electricBills/ElectricSummaryCards";
import ElectricBox from "../../../components/bills/uploadBills/electricBills/ElectricBox";
import ElectricInput from "../../../components/bills/uploadBills/electricBills/ElectricInput";
import ElectricActions from "../../../components/bills/uploadBills/electricBills/ElectricActions";
import ElectricRecent from "../../../components/bills/uploadBills/electricBills/ElectricRecent";
import ElectricTips from "../../../components/bills/uploadBills/electricBills/ElectricTips";
import baseURL from "../../../assets/common/baseUrl";
import { useAuth } from "../../../context/auth";
import { useBills } from "../../../hooks/useBills";
import { useAnalytics } from "../../../hooks/useAnalytics";

export default function ElectricBills({ navigation }) {
  const category = { name: "Electricity", icon: "⚡", color: "amber" };
  const { token, getToken } = useAuth();
  const { refresh } = useAnalytics();
  const { refreshBills } = useBills();

  const [electricBills, setElectricBills] = useState({ count: 0, bills: [] });

  // form and UI state
  const [selectedImageUri, setSelectedImageUri] = useState(null);
  const [billingPeriod, setBillingPeriod] = useState("");
  const [provider, setProvider] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [feedback, setFeedback] = useState("");
  const [date, setDate] = useState("");
  const [cost, setCost] = useState("");
  const [consumption, setConsumption] = useState("");
  const [useManualEntry, setUseManualEntry] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchElectricBills();
  }, []);

  const fetchElectricBills = async () => {
    const userToken = token || (await getToken());
    try {
      const res = await fetch(`${baseURL}/api/electric-bill/all`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      const data = await res.json();
      setElectricBills(data);
    } catch (err) {
      console.error("Error fetching bills:", err);
    }
  };

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
    // validation differs based on manual mode
    if (!useManualEntry && !selectedImageUri) {
      alert("Please select an image first.");
      return;
    }
    if (useManualEntry) {
      if (!billingPeriod || !provider || !paymentStatus || !date || !cost || !consumption) {
        alert("Please fill in all required manual fields.");
        return;
      }
    } else {
      if (!paymentStatus) {
        alert("Please select payment status.");
        return;
      }
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();

      if (!useManualEntry && selectedImageUri) {
        const filename = selectedImageUri.split("/").pop();
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : `image`;
        formData.append("billImage", {
          uri: Platform.OS === "android" ? selectedImageUri : selectedImageUri.replace("file://", ""),
          name: filename,
          type,
        });
        formData.append("useOCR", "true");
      } else {
        // manual entry - no image
        formData.append("useOCR", "false");
        formData.append("date", date);
        formData.append("cost", cost);
        formData.append("consumption", consumption);
      }

      formData.append("billingPeriod", billingPeriod);
      formData.append("provider", provider);
      formData.append("paymentStatus", paymentStatus);
      if (feedback) formData.append("feedback", feedback);

      const userToken = token || (await getToken());
      if (!userToken) {
        alert("You must be logged in to upload bills.");
        setIsSubmitting(false);
        return;
      }

      const response = await fetch(`${baseURL}/api/electric-bill/upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${userToken}` },
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        alert("Bill uploaded successfully!");
        
        // Trigger prediction if needed
        try {
          await fetch(`${baseURL}/api/electric-bill/predict`, {
            method: "POST",
            headers: { Authorization: `Bearer ${userToken}` },
          });
        } catch (err) {
          console.error("Prediction failed:", err);
        }

        // refresh
        fetchElectricBills();
        refreshBills();
        refresh();
        // reset form
        setSelectedImageUri(null);
        setBillingPeriod("");
        setProvider("");
        setPaymentStatus("");
        setFeedback("");
        setDate("");
        setCost("");
        setConsumption("");
        setUseManualEntry(false);
      } else {
        alert(`Upload failed: ${data.message || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("An error occurred during upload.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeUpload = (id) => {
    setElectricBills((prev) => ({ 
      count: prev.count - 1, 
      bills: prev.bills.filter((bill) => bill._id !== id) 
    }));
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
      <ElectricHeader navigation={navigation} category={category} />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <ElectricSummaryCards electricBills={electricBills} />
        <View className="mx-4">
          {/* show ElectricBox only when OCR/upload mode is active */}
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
            isSubmitting={isSubmitting}
          />

          <ElectricActions pickImage={pickImage} takePhoto={takePhoto} />
        </View>

        <ElectricRecent electricBills={electricBills.bills} removeUpload={removeUpload} />
        <ElectricTips category={category} />
      </ScrollView>
    </SafeAreaView>
  );
}