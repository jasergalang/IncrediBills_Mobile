import React, { useState, useEffect } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, StatusBar, View, Platform, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import KitchenGasHeader from "../../../components/bills/uploadBills/kitchenBills/KitchenGasHeader";
import KitchenGasSummaryCards from "../../../components/bills/uploadBills/kitchenBills/KitchenGasSummaryCards";
import KitchenGasBox from "../../../components/bills/uploadBills/kitchenBills/KitchenGasBox";
import KitchenGasInput from "../../../components/bills/uploadBills/kitchenBills/KitchenGasInput";


import { useDispatch, useSelector } from "react-redux";
import {
    fetchKitchenGasBills,
    uploadKitchenGasBill,
    removeKitchenGasBillLocal,
    clearRecommendations
} from "../../../redux/slices/bills/kitchenGasSlice";
import { fetchAnalytics } from "../../../redux/slices/analytics/analyticsSlice";
import { fetchBills } from "../../../redux/slices/bills/billSlice";

export default function KitchenGasBills({ navigation }) {
    const category = { name: "Kitchen Gas", icon: "🔥", color: "orange" }
    const dispatch = useDispatch()

    const { bills, count, uploading, recommendations } = useSelector(
        (state) => state.kitchenGas
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
         const resultAction = await dispatch(uploadKitchenGasBill(formData));
   
         // ✅ Check if the action was rejected
         if (uploadKitchenGasBill.rejected.match(resultAction)) {
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
   
         Alert.alert("Success", "Electric bill uploaded successfully!");
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
            <KitchenGasHeader navigation={navigation} category={category} />
            <ScrollView contentInsetAdjustmentBehavior="automatic">
                <KitchenGasSummaryCards kitchenGasBills={{ bills, count }} />
                <KitchenGasBox
                    pickImage={pickImage}
                    category={category}
                    selectedImageUri={selectedImageUri}
                    onRemoveImage={removeSelectedImage}
                />
                <KitchenGasInput
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
                />
                <View className="px-4">
                    <TouchableOpacity
                        onPress={uploadBill}
                        className={`w-full py-3 rounded-xl items-center justify-center ${
                            uploading ? "bg-gray-300" : "bg-amber-500" 
                        }`}
                        disabled={uploading}
                    >
                        <Text className="text-white font-semibold text-lg">
                            {uploading ? "Uploading..." : "Submit Bill"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}