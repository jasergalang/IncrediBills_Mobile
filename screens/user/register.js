import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import baseURL from "../../assets/common/baseUrl";
import { LinearGradient } from "expo-linear-gradient";

export default function Register() {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const showImagePickerOptions = () => {
    Alert.alert("Select Profile Picture", "Choose an option", [
      { text: "Camera", onPress: takePhoto },
      { text: "Gallery", onPress: pickImage },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfilePic(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status === "granted") {
      let result = await ImagePicker.launchCameraAsync({
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setProfilePic(result.assets[0].uri);
      }
    }
  };

  const handleRegister = async () => {
    if (
      email === "" ||
      firstName === "" ||
      lastName === "" ||
      password === ""
    ) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please fill in the form correctly",
      });
      return;
    }

    if (password !== confirmPassword) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Passwords do not match",
      });
      return;
    }

    setIsLoading(true);

    const formData = new FormData();

    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("password", password);

    if (profilePic) {
      const filename = profilePic.split("/").pop();
      const match = /\.(\w+)$/.exec(filename ?? "");
      const type = match ? `profilePic/${match[1]}` : `profilePic`;

      formData.append("profilePic", {
        uri: profilePic,
        name: filename,
        type,
      });
    }

    try {
      const res = await fetch(`${baseURL}/api/user/register`, {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const data = await res.json();

      if (res.ok) {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: data.message || "Registration successful!",
        });
        setTimeout(() => {
          navigation.navigate("Login");
        }, 1500);
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: data.message || "Something went wrong.",
        });
      }
    } catch (error) {
      console.error(error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Network error or server not reachable.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    navigation.navigate("Signup");
  };

  const handleGoogleSignup = () => {
    Toast.show({
      type: "info",
      text1: "Info",
      text2: "Google signup coming soon!",
    });
  };

  const handleFacebookSignup = () => {
    Toast.show({
      type: "info",
      text1: "Info",
      text2: "Facebook signup coming soon!",
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <ScrollView className="flex-1">
        {/* Header with Back Button */}
        <View className="px-6 pt-4 pb-2">
          <TouchableOpacity onPress={handleBack} className="w-10">
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Main Content */}
        <View className="px-6 pt-8">
          {/* Logo/Brand Section */}
          <View className="mb-8 items-center">
            <LinearGradient
              colors={["#2563eb", "#4f46e5"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="w-12 h-12 rounded-xl items-center justify-center mb-3"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 4.65,
                elevation: 8,
              }}
            >
              <Text className="text-white font-bold text-2xl">₿</Text>
            </LinearGradient>

            <Text className="text-2xl font-bold text-blue-600 mb-4">
              IncrediBills
            </Text>

            <Text className="text-4xl font-bold text-gray-900 mb-2">
              Create Account
            </Text>
            <Text className="text-base text-gray-500">
              Join us to start managing your bills
            </Text>
          </View>

          {/* Profile Picture Upload */}
          <View className="items-center mb-6">
            <TouchableOpacity
              onPress={showImagePickerOptions}
              className="relative"
              disabled={isLoading}
            >
              <View className="w-24 h-24 rounded-full bg-gray-100 border-2 border-gray-200 items-center justify-center overflow-hidden">
                {profilePic ? (
                  <Image
                    source={{ uri: profilePic }}
                    className="w-full h-full"
                  />
                ) : (
                  <Ionicons name="person-outline" size={40} color="#9CA3AF" />
                )}
              </View>
              <View className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-blue-600 items-center justify-center border-2 border-white">
                <Ionicons name="camera" size={16} color="#fff" />
              </View>
            </TouchableOpacity>
            <Text className="text-sm text-gray-500 mt-2">
              Upload Profile Picture
            </Text>
          </View>

          {/* Name Row */}
          <View className="flex-row gap-3 mb-4">
            <View className="flex-1">
              <Text className="text-sm font-medium text-gray-700 mb-2">
                First Name
              </Text>
              <View className="bg-gray-50 rounded-xl px-4 py-3.5 border border-gray-200">
                <TextInput
                  className="text-base text-gray-900"
                  placeholder="John"
                  value={firstName}
                  onChangeText={setFirstName}
                  placeholderTextColor="#9CA3AF"
                  editable={!isLoading}
                />
              </View>
            </View>
            <View className="flex-1">
              <Text className="text-sm font-medium text-gray-700 mb-2">
                Last Name
              </Text>
              <View className="bg-gray-50 rounded-xl px-4 py-3.5 border border-gray-200">
                <TextInput
                  className="text-base text-gray-900"
                  placeholder="Doe"
                  value={lastName}
                  onChangeText={setLastName}
                  placeholderTextColor="#9CA3AF"
                  editable={!isLoading}
                />
              </View>
            </View>
          </View>

          {/* Email Input */}
          <View className="mb-4">
            <Text className="text-sm font-medium text-gray-700 mb-2">
              Email Address
            </Text>
            <View className="flex-row items-center bg-gray-50 rounded-xl px-4 py-3.5 border border-gray-200">
              <Ionicons name="mail-outline" size={20} color="#9CA3AF" />
              <TextInput
                className="flex-1 ml-3 text-base text-gray-900"
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#9CA3AF"
                editable={!isLoading}
              />
            </View>
          </View>

          {/* Password Input */}
          <View className="mb-4">
            <Text className="text-sm font-medium text-gray-700 mb-2">
              Password
            </Text>
            <View className="flex-row items-center bg-gray-50 rounded-xl px-4 py-3.5 border border-gray-200">
              <Ionicons name="lock-closed-outline" size={20} color="#9CA3AF" />
              <TextInput
                className="flex-1 ml-3 text-base text-gray-900"
                placeholder="Create a password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                placeholderTextColor="#9CA3AF"
                editable={!isLoading}
              />
              <TouchableOpacity
                onPress={togglePasswordVisibility}
                disabled={isLoading}
                className="ml-2"
              >
                <Ionicons
                  name={showPassword ? "eye-outline" : "eye-off-outline"}
                  size={20}
                  color="#9CA3AF"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Confirm Password Input */}
          <View className="mb-6">
            <Text className="text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </Text>
            <View className="flex-row items-center bg-gray-50 rounded-xl px-4 py-3.5 border border-gray-200">
              <Ionicons name="lock-closed-outline" size={20} color="#9CA3AF" />
              <TextInput
                className="flex-1 ml-3 text-base text-gray-900"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                placeholderTextColor="#9CA3AF"
                editable={!isLoading}
              />
              <TouchableOpacity
                onPress={toggleConfirmPasswordVisibility}
                disabled={isLoading}
                className="ml-2"
              >
                <Ionicons
                  name={showConfirmPassword ? "eye-outline" : "eye-off-outline"}
                  size={20}
                  color="#9CA3AF"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Sign Up Button */}
          <TouchableOpacity
            onPress={handleRegister}
            className={`rounded-xl py-4 items-center justify-center mb-6 ${
              isLoading ? "bg-blue-400" : "bg-blue-600"
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text className="text-white text-base font-semibold">
                Create Account
              </Text>
            )}
          </TouchableOpacity>

          {/* Divider */}
          <View className="flex-row items-center mb-6">
            <View className="flex-1 h-px bg-gray-200" />
            <Text className="mx-4 text-sm text-gray-500">Or sign up with</Text>
            <View className="flex-1 h-px bg-gray-200" />
          </View>

          {/* Social Signup Buttons */}
          <View className="flex-row justify-center gap-4 mb-8">
            <TouchableOpacity
              onPress={handleGoogleSignup}
              className="flex-1 flex-row items-center justify-center bg-white border border-gray-200 rounded-xl py-3 px-4"
              disabled={isLoading}
            >
              <Ionicons name="logo-google" size={20} color="#DB4437" />
              <Text className="ml-2 text-sm font-medium text-gray-700">
                Google
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleFacebookSignup}
              className="flex-1 flex-row items-center justify-center bg-white border border-gray-200 rounded-xl py-3 px-4"
              disabled={isLoading}
            >
              <Ionicons name="logo-facebook" size={20} color="#1877F2" />
              <Text className="ml-2 text-sm font-medium text-gray-700">
                Facebook
              </Text>
            </TouchableOpacity>
          </View>

          {/* Login Link */}
          <View className="flex-row justify-center items-center pb-8">
            <Text className="text-gray-600 text-sm">
              Already have an account?{" "}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Login")}
              disabled={isLoading}
            >
              <Text className="text-blue-600 font-semibold text-sm">
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
