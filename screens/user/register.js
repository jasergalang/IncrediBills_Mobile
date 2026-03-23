import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Alert,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import baseURL from "../../assets/common/baseUrl";
import { LinearGradient } from "expo-linear-gradient";
import TermsModal from "./TermsModal";
import InvitationModal from "./InvitationModal";

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
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [termsModalOpen, setTermsModalOpen] = useState(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [showInvitationModal, setShowInvitationModal] = useState(false);
  const [pendingFormData, setPendingFormData] = useState(null);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

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
    if (!result.canceled) setProfilePic(result.assets[0].uri);
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status === "granted") {
      let result = await ImagePicker.launchCameraAsync({
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) setProfilePic(result.assets[0].uri);
    }
  };

  const handleRegister = async () => {
    if (email === "" || firstName === "" || lastName === "" || password === "") {
      Toast.show({ type: "error", text1: "Error", text2: "Please fill in the form correctly" });
      return;
    }
    if (password !== confirmPassword) {
      Toast.show({ type: "error", text1: "Error", text2: "Passwords do not match" });
      return;
    }
    if (!agreeToTerms) {
      Toast.show({ type: "error", text1: "Error", text2: "Please agree to the Terms of Service and Privacy Policy" });
      return;
    }

    // Build formData and store it, then show invitation modal
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("password", password);

    if (profilePic) {
      const filename = profilePic.split("/").pop();
      const match = /\.(\w+)$/.exec(filename ?? "");
      const type = match ? `profilePic/${match[1]}` : `profilePic`;
      formData.append("profilePic", { uri: profilePic, name: filename, type });
    }

    setPendingFormData(formData);
    setShowInvitationModal(true);
  };

  const handleInvitationSubmit = async (invitationCode) => {
    setShowInvitationModal(false);
    setIsLoading(true);

    try {
      const formData = pendingFormData;
      if (invitationCode) {
        formData.append("invitationCode", invitationCode);
      }

      const res = await fetch(`${baseURL}/api/user/register`, {
        method: "POST",
        body: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      const data = await res.json();

      if (res.ok) {
        Toast.show({ type: "success", text1: "Success", text2: data.message || "Registration successful!" });
        setTimeout(() => navigation.navigate("Login"), 1500);
      } else {
        Toast.show({ type: "error", text1: "Error", text2: data.message || "Something went wrong." });
      }
    } catch (error) {
      console.error(error);
      Toast.show({ type: "error", text1: "Error", text2: "Network error or server not reachable." });
    } finally {
      setIsLoading(false);
      setPendingFormData(null);
    }
  };

  const handleBack = () => navigation.navigate("Signup");

  const handleGoogleSignup = () => {
    Toast.show({ type: "info", text1: "Info", text2: "Google signup coming soon!" });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <ScrollView className="flex-1">
        {/* Header with Back Button */}
        {/* <View className="px-6 pt-4 pb-2">
          <TouchableOpacity onPress={handleBack} className="w-10">
           
            <View style={{ width: 24, height: 24, justifyContent: "center" }}>
              <View style={{
                width: 10, height: 10,
                borderLeftWidth: 2, borderBottomWidth: 2,
                borderColor: "#000",
                transform: [{ rotate: "45deg" }],
                marginLeft: 4,
              }} />
              <View style={{
                position: "absolute",
                width: 16, height: 2,
                backgroundColor: "#000",
                borderRadius: 1,
                left: 4, top: 11,
              }} />
            </View>
          </TouchableOpacity>
        </View> */}

        {/* Main Content */}
        <View className="px-6 pt-8">
          {/* Logo/Brand Section */}
          <View className="mb-8 items-center">
            <Image
              source={{ uri: "https://res.cloudinary.com/dlqclovym/image/upload/v1774267747/633933584_1432435471751884_8439558636495820978_n-removebg-preview_vfabdb.png" }}
              style={{ width: 48, height: 48, marginBottom: 12 }}
              resizeMode="contain"
            />
            <Text className="text-2xl font-bold text-blue-600 mb-4">IncrediBills</Text>
            <Text className="text-4xl font-bold text-gray-900 mb-2">Create Account</Text>
            <Text className="text-base text-gray-500">Join us to start managing your bills</Text>
          </View>

          {/* Profile Picture Upload */}
          <View className="items-center mb-6">
            <TouchableOpacity onPress={showImagePickerOptions} className="relative" disabled={isLoading}>
              <View className="w-24 h-24 rounded-full bg-gray-100 border-2 border-gray-200 items-center justify-center overflow-hidden">
                {profilePic ? (
                  <Image source={{ uri: profilePic }} className="w-full h-full" />
                ) : (
                  /* Person icon hardcoded */
                  <View style={{ alignItems: "center" }}>
                    <View style={{ width: 24, height: 24, borderRadius: 12, backgroundColor: "#9CA3AF", marginBottom: 4 }} />
                    <View style={{ width: 40, height: 20, borderRadius: 20, backgroundColor: "#9CA3AF" }} />
                  </View>
                )}
              </View>
              {/* Camera badge */}
              <View className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-blue-600 items-center justify-center border-2 border-white">
                {/* Camera icon hardcoded */}
                <View style={{ width: 14, height: 11, borderRadius: 2, borderWidth: 1.5, borderColor: "#fff", justifyContent: "center", alignItems: "center" }}>
                  <View style={{ width: 5, height: 5, borderRadius: 2.5, borderWidth: 1.5, borderColor: "#fff" }} />
                </View>
              </View>
            </TouchableOpacity>
            <Text className="text-sm text-gray-500 mt-2">Upload Profile Picture</Text>
          </View>

          {/* Name Row */}
          <View className="flex-row gap-3 mb-4">
            <View className="flex-1">
              <Text className="text-sm font-medium text-gray-700 mb-2">First Name</Text>
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
              <Text className="text-sm font-medium text-gray-700 mb-2">Last Name</Text>
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
            <Text className="text-sm font-medium text-gray-700 mb-2">Email Address</Text>
            <View className="flex-row items-center bg-gray-50 rounded-xl px-4 py-3.5 border border-gray-200">
              {/* Mail icon hardcoded */}
              <View style={{ width: 20, height: 14, borderWidth: 1.5, borderColor: "#9CA3AF", borderRadius: 2, justifyContent: "center", alignItems: "center" }}>
                <View style={{ width: 0, height: 0, borderLeftWidth: 9, borderRightWidth: 9, borderTopWidth: 7, borderLeftColor: "transparent", borderRightColor: "transparent", borderTopColor: "#9CA3AF", position: "absolute", top: 0 }} />
              </View>
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
            <Text className="text-sm font-medium text-gray-700 mb-2">Password</Text>
            <View className="flex-row items-center bg-gray-50 rounded-xl px-4 py-3.5 border border-gray-200">
              {/* Lock icon hardcoded */}
              <View style={{ alignItems: "center" }}>
                <View style={{ width: 12, height: 6, borderRadius: 6, borderWidth: 1.5, borderColor: "#9CA3AF", borderBottomWidth: 0 }} />
                <View style={{ width: 14, height: 10, borderRadius: 2, borderWidth: 1.5, borderColor: "#9CA3AF" }} />
              </View>
              <TextInput
                className="flex-1 ml-3 text-base text-gray-900"
                placeholder="Create a password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                placeholderTextColor="#9CA3AF"
                editable={!isLoading}
              />
              <TouchableOpacity onPress={togglePasswordVisibility} disabled={isLoading} className="ml-2">
                {/* Eye icon hardcoded */}
                <View style={{ width: 20, height: 14, justifyContent: "center", alignItems: "center" }}>
                  <View style={{ width: 20, height: 14, borderRadius: 10, borderWidth: 1.5, borderColor: "#9CA3AF", justifyContent: "center", alignItems: "center" }}>
                    <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: showPassword ? "#9CA3AF" : "transparent", borderWidth: showPassword ? 0 : 1.5, borderColor: "#9CA3AF" }} />
                  </View>
                  {!showPassword && (
                    <View style={{ position: "absolute", width: 20, height: 1.5, backgroundColor: "#9CA3AF", transform: [{ rotate: "30deg" }] }} />
                  )}
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Confirm Password Input */}
          <View className="mb-6">
            <Text className="text-sm font-medium text-gray-700 mb-2">Confirm Password</Text>
            <View className="flex-row items-center bg-gray-50 rounded-xl px-4 py-3.5 border border-gray-200">
              {/* Lock icon hardcoded */}
              <View style={{ alignItems: "center" }}>
                <View style={{ width: 12, height: 6, borderRadius: 6, borderWidth: 1.5, borderColor: "#9CA3AF", borderBottomWidth: 0 }} />
                <View style={{ width: 14, height: 10, borderRadius: 2, borderWidth: 1.5, borderColor: "#9CA3AF" }} />
              </View>
              <TextInput
                className="flex-1 ml-3 text-base text-gray-900"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                placeholderTextColor="#9CA3AF"
                editable={!isLoading}
              />
              <TouchableOpacity onPress={toggleConfirmPasswordVisibility} disabled={isLoading} className="ml-2">
                <View style={{ width: 20, height: 14, justifyContent: "center", alignItems: "center" }}>
                  <View style={{ width: 20, height: 14, borderRadius: 10, borderWidth: 1.5, borderColor: "#9CA3AF", justifyContent: "center", alignItems: "center" }}>
                    <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: showConfirmPassword ? "#9CA3AF" : "transparent", borderWidth: showConfirmPassword ? 0 : 1.5, borderColor: "#9CA3AF" }} />
                  </View>
                  {!showConfirmPassword && (
                    <View style={{ position: "absolute", width: 20, height: 1.5, backgroundColor: "#9CA3AF", transform: [{ rotate: "30deg" }] }} />
                  )}
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Terms & Privacy Checkbox */}
          <TouchableOpacity
            onPress={() => setAgreeToTerms(!agreeToTerms)}
            disabled={isLoading}
            activeOpacity={0.7}
            className="flex-row items-start gap-3 mb-6"
          >
            <View
              className={`w-5 h-5 rounded border-2 items-center justify-center mt-0.5 flex-shrink-0 ${agreeToTerms ? "bg-blue-600 border-blue-600" : "border-slate-300 bg-white"
                }`}
            >
              {agreeToTerms && (
                /* Checkmark hardcoded */
                <View style={{ width: 10, height: 6, borderLeftWidth: 2, borderBottomWidth: 2, borderColor: "#fff", transform: [{ rotate: "-45deg" }], marginTop: -2 }} />
              )}
            </View>
            <Text className="text-sm text-slate-600 flex-1">
              I agree to the{" "}
              <Text className="text-blue-600 font-semibold" onPress={() => setTermsModalOpen(true)}>
                Terms of Service
              </Text>
              {" "}and{" "}
              <Text className="text-blue-600 font-semibold" onPress={() => setPrivacyModalOpen(true)}>
                Privacy Policy
              </Text>
            </Text>
          </TouchableOpacity>

          {/* Sign Up Button */}
          <TouchableOpacity
            onPress={handleRegister}
            className={`rounded-xl py-4 items-center justify-center mb-6 ${isLoading ? "bg-blue-400" : "bg-blue-600"}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text className="text-white text-base font-semibold">Create Account</Text>
            )}
          </TouchableOpacity>

          {/* Divider */}
          <View className="flex-row items-center mb-6">
            <View className="flex-1 h-px bg-gray-200" />
            <Text className="mx-4 text-sm text-gray-500">Or sign up with</Text>
            <View className="flex-1 h-px bg-gray-200" />
          </View>

          {/* Google Sign Up Button */}
          <View className="mb-8">
            <TouchableOpacity
              onPress={handleGoogleSignup}
              className="flex-row items-center justify-center bg-white border border-gray-200 rounded-xl py-3 px-4"
              disabled={isLoading}
            >
              {/* Google "G" hardcoded */}
              <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: "#DB4437", justifyContent: "center", alignItems: "center" }}>
                <Text style={{ color: "#fff", fontSize: 11, fontWeight: "bold" }}>G</Text>
              </View>
              <Text className="ml-2 text-sm font-medium text-gray-700">Google</Text>
            </TouchableOpacity>
          </View>

          {/* Login Link */}
          <View className="flex-row justify-center items-center pb-8">
            <Text className="text-gray-600 text-sm">Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")} disabled={isLoading}>
              <Text className="text-blue-600 font-semibold text-sm">Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Modals */}
      <TermsModal isOpen={termsModalOpen} onClose={() => setTermsModalOpen(false)} type="terms" />
      <TermsModal isOpen={privacyModalOpen} onClose={() => setPrivacyModalOpen(false)} type="privacy" />
      <InvitationModal
        isOpen={showInvitationModal}
        onClose={() => setShowInvitationModal(false)}
        onSubmit={handleInvitationSubmit}
        loading={isLoading}
      />
    </SafeAreaView>
  );
}