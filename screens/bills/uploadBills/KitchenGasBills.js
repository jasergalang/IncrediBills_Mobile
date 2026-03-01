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

import KitchenGasHeader from "../../../components/bills/uploadBills/kitchenBills/KitchenGasHeader";
import KitchenGasBox from "../../../components/bills/uploadBills/kitchenBills/KitchenGasBox";
import KitchenGasInput from "../../../components/bills/uploadBills/kitchenBills/KitchenGasInput";
import KitchenGasRecent from "../../../components/bills/uploadBills/kitchenBills/KitchenGasRecent";
// import KitchenGasTips from "../../../components/bills/uploadBills/kitchenBills/KitchenGasTips";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchKitchenGasBills,
  uploadKitchenGasBill,
  removeKitchenGasBillLocal,
  clearRecommendations,
} from "../../../redux/slices/bills/kitchenGasSlice";
import { fetchAnalytics } from "../../../redux/slices/analytics/analyticsSlice";
import { fetchBills } from "../../../redux/slices/bills/billSlice";

export default function KitchenGasBills({ navigation }) {
  const category = { name: "Kitchen Gas", icon: "🔥", color: "orange" };

  const dispatch = useDispatch();

  const { bills, uploading, count } = useSelector(
    (state) => state.kitchenGas
  );

  const [refreshing, setRefreshing] = useState(false);
  const [selectedImageUri, setSelectedImageUri] = useState(null);

  const [date, setDate] = useState("");
  const [cost, setCost] = useState("");
  const [cylinders, setCylinders] = useState("");
  const [cylinderSize, setCylinderSize] = useState("");
  const [cycleDays, setCycleDays] = useState("");
  const [provider, setProvider] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [feedback, setFeedback] = useState("");
  const [useManualEntry, setUseManualEntry] = useState(false);

  useEffect(() => {
    dispatch(fetchKitchenGasBills());
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
      setSelectedImageUri(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
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
    if (useManualEntry) {
      if (!date || !cost || !cylinders || !cylinderSize || !cycleDays || !provider || !paymentStatus) {
        Alert.alert("Error", "Please fill in all required fields.");
        return;
      }
    } else if (!provider || !paymentStatus) {
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
        formData.append("cylinders", cylinders);
        formData.append("cylinderSize", cylinderSize);
        formData.append("cycleDays", cycleDays);
      }

      /* ---------- COMMON ---------- */
      formData.append("provider", provider);
      formData.append("paymentStatus", paymentStatus);
      if (feedback) formData.append("feedback", feedback);

      const resultAction = await dispatch(uploadKitchenGasBill(formData));

      if (uploadKitchenGasBill.rejected.match(resultAction)) {
        throw new Error(resultAction.payload || "Upload failed");
      }

      // Refresh analytics + bills
      dispatch(fetchAnalytics());
      dispatch(fetchBills());

      /* ---------- RESET ---------- */
      setSelectedImageUri(null);
      setDate("");
      setCost("");
      setCylinders("");
      setCylinderSize("");
      setCycleDays("");
      setProvider("");
      setPaymentStatus("");
      setFeedback("");
      setUseManualEntry(false);

      const newBillId = resultAction.payload?.kitchenGasBill?._id;

      if (newBillId) {
        navigation.navigate("KitchenGasBillDetails", { id: newBillId });
      } else {
        Alert.alert("Success", "Kitchen Gas bill uploaded successfully!");
      }
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

      <KitchenGasHeader navigation={navigation} category={category} />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View className="mx-4 my-4">
          {!useManualEntry && (
            <KitchenGasBox
              pickImage={pickImage}
              category={category}
              selectedImageUri={selectedImageUri}
              onRemoveImage={removeSelectedImage}
            />
          )}

          <KitchenGasInput
            date={date}
            setDate={setDate}
            cost={cost}
            setCost={setCost}
            cylinders={cylinders}
            setCylinders={setCylinders}
            cylinderSize={cylinderSize}
            setCylinderSize={setCylinderSize}
            cycleDays={cycleDays}
            setCycleDays={setCycleDays}
            provider={provider}
            setProvider={setProvider}
            paymentStatus={paymentStatus}
            setPaymentStatus={setPaymentStatus}
            feedback={feedback}
            setFeedback={setFeedback}
            useManualEntry={useManualEntry}
            setUseManualEntry={setUseManualEntry}
            onSubmit={uploadBill}
            hasImage={!!selectedImageUri}
            isSubmitting={uploading}
          />
        </View>

        <KitchenGasRecent
          kitchenGasBills={bills}
          removeUpload={(id) => dispatch(removeKitchenGasBillLocal(id))}
        />

        {/* <KitchenGasTips recommendations={recommendations} /> */}
      </ScrollView>
    </SafeAreaView>
  );
}