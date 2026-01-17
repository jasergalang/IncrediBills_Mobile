import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  StatusBar,
  ScrollView,
  RefreshControl,
  Alert,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

import TransportHeader from "../../../components/bills/uploadBills/transportBills/TransportHeader";
import TransportSummaryCards from "../../../components/bills/uploadBills/transportBills/TransportSummaryCard";
import TransportBox from "../../../components/bills/uploadBills/transportBills/TransportBox";
import TransportInput from "../../../components/bills/uploadBills/transportBills/TransportInput";
import TransportActions from "../../../components/bills/uploadBills/transportBills/TransportActions";
import TransportRecent from "../../../components/bills/uploadBills/transportBills/TransportRecent";
import TransportTips from "../../../components/bills/uploadBills/transportBills/TransportTips";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchTransportBills,
  uploadTransportBill,
  removeTransportBillLocal,
} from "../../../redux/slices/bills/transportSlice";
import { fetchAnalytics } from "../../../redux/slices/analytics/analyticsSlice";
import { fetchBills } from "../../../redux/slices/bills/billSlice";

export default function TransportBills({ navigation }) {
  const category = { name: "Transport Fuel", icon: "⛽", color: "red" };

  const dispatch = useDispatch();

  const { bills, uploading, count } = useSelector((state) => state.transport);

  const [refreshing, setRefreshing] = useState(false);
  const [selectedImageUri, setSelectedImageUri] = useState(null);

  const [stationLocation, setStationLocation] = useState("");
  const [provider, setProvider] = useState("");
  const [liters, setLiters] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [feedback, setFeedback] = useState("");
  const [date, setDate] = useState("");
  const [cost, setCost] = useState("");
  const [useManualEntry, setUseManualEntry] = useState(false);

  useEffect(() => {
    dispatch(fetchTransportBills());
  }, [dispatch]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.IMAGE,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImageUri(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.IMAGE,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImageUri(result.assets[0].uri);
    }
  };

  const removeSelectedImage = () => {
    setSelectedImageUri(null);
  };

  const uploadBill = async () => {
    if (uploading) return;

    // OCR mode validation
    if (!useManualEntry && !selectedImageUri) {
      Alert.alert("Error", "Please select an image first.");
      return;
    }

    // Manual validation
    if (
      !stationLocation ||
      !paymentStatus ||
      (useManualEntry &&
        (!provider || !liters || !date || !cost))
    ) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }

    try {
      const formData = new FormData();

      /* ---------- IMAGE / OCR ---------- */
      if (!useManualEntry && selectedImageUri) {
        const filename = selectedImageUri.split("/").pop();
        const ext = filename.split(".").pop();

        formData.append("billImage", {
          uri:
            Platform.OS === "android"
              ? selectedImageUri
              : selectedImageUri.replace("file://", ""),
          name: filename,
          type: `image/${ext}`,
        });

        formData.append("useOCR", "true");
      } else {
        formData.append("useOCR", "false");
        formData.append("date", date);
        formData.append("cost", cost);
        formData.append("provider", provider);
        formData.append("liters", liters);
      }

      /* ---------- COMMON ---------- */
      formData.append("stationLocation", stationLocation);
      formData.append("paymentStatus", paymentStatus);
      if (feedback) formData.append("feedback", feedback);

      const resultAction = await dispatch(uploadTransportBill(formData));

      if (uploadTransportBill.rejected.match(resultAction)) {
        throw new Error(resultAction.payload || "Upload failed");
      }

      // Refresh analytics + bills
      dispatch(fetchAnalytics());
      dispatch(fetchBills());

      /* ---------- RESET ---------- */
      setSelectedImageUri(null);
      setStationLocation("");
      setProvider("");
      setLiters("");
      setPaymentStatus("");
      setFeedback("");
      setDate("");
      setCost("");
      setUseManualEntry(false);

      Alert.alert("Success", "Transport bill uploaded successfully!");
    } catch (err) {
      Alert.alert("Upload Failed", "Something went wrong.");
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />

      <TransportHeader navigation={navigation} category={category} />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <TransportSummaryCards transportBills={{ bills, count }} category={category}/>

        <View className="mx-4">
          {!useManualEntry && (
            <TransportBox
              pickImage={pickImage}
              category={category}
              selectedImageUri={selectedImageUri}
              onRemoveImage={removeSelectedImage}
            />
          )}

          <TransportInput
            stationLocation={stationLocation}
            setStationLocation={setStationLocation}
            provider={provider}
            setProvider={setProvider}
            liters={liters}
            setLiters={setLiters}
            paymentStatus={paymentStatus}
            setPaymentStatus={setPaymentStatus}
            feedback={feedback}
            setFeedback={setFeedback}
            date={date}
            setDate={setDate}
            cost={cost}
            setCost={setCost}
            useManualEntry={useManualEntry}
            setUseManualEntry={setUseManualEntry}
            onSubmit={uploadBill}
            hasImage={!!selectedImageUri}
            isSubmitting={uploading}
          />

          <TransportActions pickImage={pickImage} takePhoto={takePhoto} />
        </View>

        <TransportRecent
          transportBills={bills}
          removeUpload={(id) =>
            dispatch(removeTransportBillLocal(id))
          }
        />

        <TransportTips category={category} />
      </ScrollView>
    </SafeAreaView>
  );
}
