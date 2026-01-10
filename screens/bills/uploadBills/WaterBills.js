import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, StatusBar, View, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import UploadHeader from "../../../components/bills/uploadBills/waterBills/WaterHeader";
import UploadSummaryCards from "../../../components/bills/uploadBills/waterBills/WaterSummaryCards";
import UploadBox from "../../../components/bills/uploadBills/waterBills/WaterBox";
import WaterInput from "../../../components/bills/uploadBills/waterBills/WaterInput";
import UploadActions from "../../../components/bills/uploadBills/waterBills/WaterActions";
import UploadRecent from "../../../components/bills/uploadBills/waterBills/WaterRecent";
import UploadTips from "../../../components/bills/uploadBills/waterBills/WaterTips";
import baseURL from "../../../assets/common/baseUrl";
import { useAuth } from "../../../context/auth";
import { useDispatch } from "react-redux";
import { fetchAnalytics } from "../../../redux/actions/analyticsAction";
import { fetchBills } from "../../../redux/actions/billAction";
export default function UploadBill({ navigation }) {
  const category = { name: "Water", icon: "💧", color: "blue" };
  const { token, getToken } = useAuth(); 
  const dispatch = useDispatch();

  const [waterBills, setWaterBills] = useState({ count: 0, bills: [] });

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
    fetchWaterBills();
  }, []);

  const fetchWaterBills = async () => {
    const userToken = token || (await getToken());
    try {
      const res = await fetch(`${baseURL}/api/water-bill/all`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      const data = await res.json();
      setWaterBills(data);
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

      const response = await fetch(`${baseURL}/api/water-bill/upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${userToken}` },
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        alert("Bill uploaded successfully!");
        // refresh
        fetchWaterBills();
        dispatch(fetchBills(token)); 
        dispatch(fetchAnalytics(userToken, "month"));
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
    setWaterBills((prev) => ({ count: prev.count - 1, bills: prev.bills.filter((bill) => bill._id !== id) }));
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
      <UploadHeader navigation={navigation} category={category} />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <UploadSummaryCards waterBills={waterBills} />
        <View className="mx-4">
          {/* show UploadBox only when OCR/upload mode is active */}
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
            isSubmitting={isSubmitting}
          />

          <UploadActions pickImage={pickImage} takePhoto={takePhoto} />
        </View>

        <UploadRecent waterBills={waterBills.bills} removeUpload={removeUpload} />
        <UploadTips category={category} />
      </ScrollView>
    </SafeAreaView>
  );
}
