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

import MiscellaneousHeader from "../../../components/bills/uploadBills/miscellaneousBills/MiscellaneousHeader";
import MiscellaneousSummaryCards from "../../../components/bills/uploadBills/miscellaneousBills/MiscellaneousSummaryCards";
import MiscellaneousBox from "../../../components/bills/uploadBills/miscellaneousBills/MiscellaneousBox";
import MiscellaneousInput from "../../../components/bills/uploadBills/miscellaneousBills/MiscellaneousInput";
import MiscellaneousActions from "../../../components/bills/uploadBills/miscellaneousBills/MiscellaneousActions";
import MiscellaneousRecent from "../../../components/bills/uploadBills/miscellaneousBills/MiscellaneousRecent";
import MiscellaneousTips from "../../../components/bills/uploadBills/miscellaneousBills/MiscellaneousTips";

import { useDispatch, useSelector } from "react-redux";
import { fetchMiscellaneousBills, uploadMiscellaneousBill, removeMiscellaneousBillLocal, clearRecommendations, } from "../../../redux/slices/bills/miscellaneousSlice"
import { fetchAnalytics } from "../../../redux/slices/analytics/analyticsSlice";
import { fetchBills } from "../../../redux/slices/bills/billSlice";

export default function MiscellaneousBills({ navigation }) {
    const category = { name: "Miscellaneous", icon: "📦", color: "purple" };

    const dispatch = useDispatch();

    const { bills, count, uploading, recommendations } = useSelector(
        (state) => state.miscellaneous
    );
    const [refreshing, setRefreshing] = useState(false);


    // Image
    const [selectedImageUri, setSelectedImageUri] = useState(null);

    // Form fields
    const [purchaseType, setPurchaseType] = useState("");
    const [categoryType, setCategoryType] = useState("");
    const [paymentStatus, setPaymentStatus] = useState("");
    const [feedback, setFeedback] = useState("");
    const [date, setDate] = useState("");
    const [cost, setCost] = useState("");
    const [useManualEntry, setUseManualEntry] = useState(false);

    useEffect(() => {
        dispatch(fetchMiscellaneousBills());
    }, [dispatch]);

    useEffect(() => {
        return () => {
            dispatch(clearRecommendations());
        };
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

        if (!useManualEntry && !selectedImageUri) {
            Alert.alert("Error", "Please select an image first.");
            return;
        }

        if (
            !purchaseType ||
            !categoryType ||
            !paymentStatus ||
            (useManualEntry && (!date || !cost))
        ) {
            Alert.alert("Error", "Please fill in all required fields.");
            return;
        }

        try {

            const formData = new FormData();

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
            }

            formData.append("purchaseType", purchaseType);
            formData.append("category", categoryType);
            formData.append("paymentStatus", paymentStatus);
            if (feedback) formData.append("feedback", feedback);

            const resultAction = await dispatch(uploadMiscellaneousBill(formData));

            if (uploadMiscellaneousBill.rejected.match(resultAction)) {
                throw new Error(resultAction.payload || "Upload failed");
            }

            // Refresh analytics after successful upload
            dispatch(fetchAnalytics());
            dispatch(fetchBills());

            // Reset form
            setSelectedImageUri(null);
            setPurchaseType("");
            setCategoryType("");
            setPaymentStatus("");
            setFeedback("");
            setDate("");
            setCost("");
            setUseManualEntry(false);

            Alert.alert("Success", "Miscellaneous bill uploaded successfully!");
        } catch (err) {
            Alert.alert("Upload Failed", "Something went wrong.");
        } finally {
            setUploading(false);
        }
    };

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 2000);
    };

    return (
        <SafeAreaView className="flex-1 bg-slate-50">
            <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />

            <MiscellaneousHeader navigation={navigation} category={category} />

            <ScrollView
                className="flex-1"
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <MiscellaneousSummaryCards miscellaneousBills={{ bills, count }} category={category} />

                <View className="mx-4">
                    {!useManualEntry && (
                        <MiscellaneousBox
                            pickImage={pickImage}
                            category={category}
                            selectedImageUri={selectedImageUri}
                            onRemoveImage={removeSelectedImage}
                        />
                    )}

                    <MiscellaneousInput
                        purchaseType={purchaseType}
                        setPurchaseType={setPurchaseType}
                        category={categoryType}
                        setCategory={setCategoryType}
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

                    <MiscellaneousActions
                        pickImage={pickImage}
                        takePhoto={takePhoto}
                    />
                </View>

                <MiscellaneousRecent
                    miscellaneousBills={bills}
                    removeUpload={(id) => {
                        dispatch(removeMiscellaneousBillLocal(id));
                    }}
                />

                <MiscellaneousTips recommendations={recommendations} />
            </ScrollView>
        </SafeAreaView>
    );
}
