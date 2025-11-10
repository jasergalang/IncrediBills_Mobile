import React, { useState } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, StatusBar, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import UploadHeader from "../../../components/bills/uploadBills/waterBills/WaterHeader";
import UploadSummaryCards from "../../../components/bills/uploadBills/waterBills/WaterSummaryCards";
import UploadBox from "../../../components/bills/uploadBills/waterBills/WaterBox";
import UploadActions from "../../../components/bills/uploadBills/waterBills/WaterActions";
import UploadRecent from "../../../components/bills/uploadBills/waterBills/WaterRecent";
import UploadTips from "../../../components/bills/uploadBills/waterBills/WaterTips";

const recentUploads = [
  {
    id: 1,
    name: "October Water Bill.png",
    size: "2.5 MB",
    date: "Oct 15 at 10:30 AM",
    status: "uploaded",
  },
  {
    id: 2,
    name: "September Water Bill.pdf",
    size: "1.8 MB",
    date: "Sep 20 at 2:15 PM",
    status: "uploaded",
  },
  {
    id: 3,
    name: "August Water Bill.jpg",
    size: "3.2 MB",
    date: "Aug 10 at 9:45 AM",
    status: "uploaded",
  },
  {
    id: 4,
    name: "July Water Bill.png",
    size: "2.1 MB",
    date: "Jul 5 at 11:20 AM",
    status: "uploading",
  },
];

export default function UploadBill({ navigation }) {
  // Water category only
  const category = { name: "Water", icon: "💧", color: "blue" };
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
      <UploadHeader navigation={navigation} category={category} />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <UploadSummaryCards category={category} />
        <View className="mx-4">
          <UploadBox pickImage={pickImage} category={category} />
          <UploadActions pickImage={pickImage} takePhoto={takePhoto} />
        </View>
        <UploadRecent uploads={uploads} removeUpload={removeUpload} />
        <UploadTips category={category} />
      </ScrollView>
    </SafeAreaView>
  );
}
