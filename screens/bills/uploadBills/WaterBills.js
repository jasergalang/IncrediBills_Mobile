import React, { useState, useEffect } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, StatusBar, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import UploadHeader from "../../../components/bills/uploadBills/waterBills/WaterHeader";
import UploadSummaryCards from "../../../components/bills/uploadBills/waterBills/WaterSummaryCards";
import UploadBox from "../../../components/bills/uploadBills/waterBills/WaterBox";
import UploadActions from "../../../components/bills/uploadBills/waterBills/WaterActions";
import UploadRecent from "../../../components/bills/uploadBills/waterBills/WaterRecent";
import UploadTips from "../../../components/bills/uploadBills/waterBills/WaterTips";
import baseURL from "../../../assets/common/baseUrl";
import { useAuth } from "../../../context/auth";

export default function UploadBill({ navigation }) {
  const category = { name: "Water", icon: "💧", color: "blue" };
  const [uploads, setUploads] = useState([]);
  const { token, getToken } = useAuth();
  const [waterBills, setWaterBills] = useState({ count: 0, bills: [] });

  useEffect(() => {
    fetchWaterBills();
  }, []);

  const fetchWaterBills = async () => {
    const userToken = token || (await getToken());
    try {
      const res = await fetch(`${baseURL}/api/water-bill/all`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      const data = await res.json();
      setWaterBills(data);
    } catch (err) {
      console.error("Error fetching bills:", err);
    }
  }
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

      const response = await fetch(`${baseURL}/api/water-bill/upload`, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userToken}`,
        },
        body: formData,
      });

      const data = await response.json();
      console.log("Upload response:", data);

      fetchWaterBills();

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
    setWaterBills((prev) => ({
      count: prev.count - 1,
      bills: prev.bills.filter((bill) => bill._id !== id),
    }));
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
        {/* <UploadRecent waterBills={waterBills} removeUpload={removeUpload}/> */}
        <UploadRecent waterBills={waterBills.bills} removeUpload={removeUpload} />
        <UploadTips category={category} />
      </ScrollView>
    </SafeAreaView>
  );
}
