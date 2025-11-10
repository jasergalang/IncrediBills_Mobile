import React, { useState } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, StatusBar, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import GroceryHeader from "../../../components/bills/uploadBills/groceryBills/GroceryHeader.js";
import GrocerySummaryCards from "../../../components/bills/uploadBills/groceryBills/GrocerySummaryCards.js";
import GroceryBox from "../../../components/bills/uploadBills/groceryBills/GroceryBox.js";
import GroceryActions from "../../../components/bills/uploadBills/groceryBills/GroceryActions.js";
import GroceryRecent from "../../../components/bills/uploadBills/groceryBills/GroceryRecent.js";
import GroceryTips from "../../../components/bills/uploadBills/groceryBills/GroceryTips.js";

const recentUploads = [
    {
        id: 1,
        name: "October Grocery Receipt.png",
        size: "2.3 MB",
        date: "Oct 15 at 10:30 AM",
        status: "uploaded",
    },
    {
        id: 2,
        name: "September SM Receipt.pdf",
        size: "1.9 MB",
        date: "Sep 20 at 2:15 PM",
        status: "uploaded",
    },
    {
        id: 3,
        name: "August Supermarket Bill.jpg",
        size: "3.1 MB",
        date: "Aug 10 at 9:45 AM",
        status: "uploaded",
    },
    {
        id: 4,
        name: "July Grocery Bill.png",
        size: "2.2 MB",
        date: "Jul 5 at 11:20 AM",
        status: "uploading",
    },
];

export default function GroceryBills({ navigation }) {
    const category = { name: "Groceries", icon: "🛒", color: "green" };
    const [uploads, setUploads] = useState(recentUploads);

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

    const removeUpload = (id) => {
        setUploads(uploads.filter((item) => item.id !== id));
    };

    return (
        <SafeAreaView className="flex-1 bg-slate-50">
            <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
            <GroceryHeader navigation={navigation} category={category} />
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                <GrocerySummaryCards category={category} />
                <View className="mx-4">
                    <GroceryBox pickImage={pickImage} category={category} />
                    <GroceryActions pickImage={pickImage} takePhoto={takePhoto} />
                </View>
                <GroceryRecent uploads={uploads} removeUpload={removeUpload} />
                <GroceryTips category={category} />
            </ScrollView>
        </SafeAreaView>
    );
}