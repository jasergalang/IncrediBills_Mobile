import React, { useState } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, StatusBar, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import ElectricHeader from "../../../components/bills/uploadBills/electricBills/ElectricHeader";
import ElectricSummaryCards from "../../../components/bills/uploadBills/electricBills/ElectricSummaryCards";
import ElectricBox from "../../../components/bills/uploadBills/electricBills/ElectricBox";
import ElectricActions from "../../../components/bills/uploadBills/electricBills/ElectricActions";
import ElectricRecent from "../../../components/bills/uploadBills/electricBills/ElectricRecent";
import ElectricTips from "../../../components/bills/uploadBills/electricBills/ElectricTips";
import baseURL from "../../../assets/common/baseUrl";
import { useAuth } from "../../../context/auth";

const recentUploads = [
  {
    id: 1,
    name: "October Electric Bill.png",
    size: "2.1 MB",
    date: "Oct 12 at 9:30 AM",
    status: "uploaded",
  },
  {
    id: 2,
    name: "September Electric Bill.pdf",
    size: "1.5 MB",
    date: "Sep 18 at 1:10 PM",
    status: "uploaded",
  },
  {
    id: 3,
    name: "August Electric Bill.jpg",
    size: "2.8 MB",
    date: "Aug 8 at 8:45 AM",
    status: "uploaded",
  },
  {
    id: 4,
    name: "July Electric Bill.png",
    size: "2.0 MB",
    date: "Jul 3 at 10:20 AM",
    status: "uploading",
  },
];

export default function ElectricBills({ navigation }) {
  const category = { name: "Electricity", icon: "⚡", color: "amber" };
  const [uploads, setUploads] = useState(recentUploads);
  const { token, getToken } = useAuth();
  const uploadBill = async (uri) => {
    try {
      const formData = new FormData();
      const filename = uri.split("/").pop();
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : `image`;

      formData.append("billImage", {
        uri,
        name: filename,
        type,
      });
      
      const userToken = token || (await getToken());
      if (!userToken) {
        alert("You must be logged in to upload bills.");
        return;
      }

      const response = await fetch(`${baseURL}/api/electric-bill/upload`, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userToken}`,
        },
        body: formData,
      });

      const data = await response.json();
      console.log("Upload response:", data);

      if (response.ok) {
        alert("Bill uploaded successfully!");
      } else {
        alert(`Upload failed: ${data.message}`);
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("An error occurred during upload.");
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.IMAGE,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      const uri = result.assets[0].uri;
      console.log("Image selected:", uri);
      await uploadBill(uri);
    }
  };

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.IMAGE,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      const uri = result.assets[0].uri;
      console.log("Photo taken:", uri);
      await uploadBill(uri);
    }
  };

  const removeUpload = (id) => {
    setUploads(uploads.filter((item) => item.id !== id));
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
      <ElectricHeader navigation={navigation} category={category} />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <ElectricSummaryCards category={category} />
        <View className="mx-4">
          <ElectricBox pickImage={pickImage} category={category} />
          <ElectricActions pickImage={pickImage} takePhoto={takePhoto} />
        </View>
        <ElectricRecent uploads={uploads} removeUpload={removeUpload} />
        <ElectricTips category={category} />
      </ScrollView>
    </SafeAreaView>
  );
}
