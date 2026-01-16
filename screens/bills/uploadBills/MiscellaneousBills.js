import React, { useState } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    View,
    StatusBar,
    ScrollView,
    RefreshControl,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import MiscellaneousActions from "../../../components/bills/uploadBills/miscellaneousBills/MiscellaneousActions";
import MiscellaneousBox from "../../../components/bills/uploadBills/miscellaneousBills/MiscellaneousBox";
import MiscellaneousSummaryCards from "../../../components/bills/uploadBills/miscellaneousBills/MiscellaneousSummaryCards";
import MiscellaneousTips from "../../../components/bills/uploadBills/miscellaneousBills/MiscellaneousTips";
import MiscellaneousHeader from "../../../components/bills/uploadBills/miscellaneousBills/MiscellaneousHeader"
import MiscellaneousRecent from "../../../components/bills/uploadBills/miscellaneousBills/MiscellaneousRecent" 
export default function MiscellaneousBills({ navigation, }) {
    const [refreshing, setRefreshing] = useState(false);
     const category = { name: "Miscellaneous", icon: "📦", color: "purple" };
    const [uploads, setUploads] = useState([
        {
            id: 1,
            name: "October Gas Receipt.jpg",
            size: "1.9 MB",
            date: "Oct 15, 2024",
            status: "uploaded",
        },
        {
            id: 2,
            name: "September Petron Bill.pdf",
            size: "1.5 MB",
            date: "Sep 20, 2024",
            status: "uploaded",
        },
    ]);
    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.IMAGE,
            allowsEditing: true,
            quality: 1,
        });
        if (!result.canceled) {
            console.log("Image selected:", result.assets[0].uri);
            // Add upload logic here
        }
    };

    const takePhoto = async () => {
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.IMAGE,
            allowsEditing: true,
            quality: 1,
        });
        if (!result.canceled) {
            console.log("Photo taken:", result.assets[0].uri);
            // Add upload logic here
        }
    };
    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 2000);
    };

    const removeUpload = (id) => {
        setUploads(uploads.filter((item) => item.id !== id));
    };

    return (
        <SafeAreaView className="flex-1 bg-slate-50">
            <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
            <MiscellaneousHeader navigation={navigation} category={category}/>
            <ScrollView
                className="flex-1"
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <MiscellaneousSummaryCards category={category}/>

                <View className="mx-4">
                    <MiscellaneousBox pickImage={pickImage} category={category}/>
                    <MiscellaneousActions pickImage={pickImage} takePhoto={takePhoto}/>
                </View>
                <MiscellaneousRecent uploads={uploads} removeUpload={removeUpload}/>
                <MiscellaneousTips category={category}/>
            </ScrollView>
        </SafeAreaView>
    );
}