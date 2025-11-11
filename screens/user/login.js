import React, { useState } from "react";


import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";
import { useAuth } from "../../context/auth";
import { LinearGradient } from "expo-linear-gradient";


 
  import
  {
    GoogleSignin,
    statusCodes,
  } from "@react-native-google-signin/google-signin";







export default function Login() {
  const navigation = useNavigation();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

 



  const handleLogin = async () => {
    try {
      const response = await axios.post(`${baseURL}/api/user/login`, {
        email,
        password,
      });

      console.log("Login response:", response.data);

      if (response.data.success) {
        await login(response.data);

        Toast.show({
          type: "success",
          text1: "Login Successful",
          text2: response.data.message || "Welcome back!",
          position: "top",
        });

        setTimeout(() => {
          if (response.data.user.role === "admin") {
            // navigation.navigate('mainNav');
          } else {
            navigation.navigate("MainNavigator");
          }
        }, 1500);
      } else {
        Toast.show({
          type: "error",
          text1: "Login Failed",
          text2: response.data.message || "Invalid credentials",
          position: "top",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Something went wrong.",
        position: "top",
      });
    }
  };

  const handleBack = () => {
    navigation.navigate("Register");
  };

  const handleForgotPassword = () => {
    navigation.navigate("ForgotPassword");
  };

  const handleGoogleLogin = () => {
    Toast.show({
      type: "info",
      text1: "Info",
      text2: "Google login coming soon!",
    });
  };

  const handleFacebookLogin = () => {
    Toast.show({
      type: "info",
      text1: "Info",
      text2: "Facebook login coming soon!",
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

            <Text className="text-3xl font-bold text-gray-900 mb-2">
              Welcome Back
            </Text>
            <Text className="text-base text-gray-500">
              Sign in to continue managing your bills
            </Text>
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
          <View className="mb-2">
            <Text className="text-sm font-medium text-gray-700 mb-2">
              Password
            </Text>
            <View className="flex-row items-center bg-gray-50 rounded-xl px-4 py-3.5 border border-gray-200">
              <Ionicons name="lock-closed-outline" size={20} color="#9CA3AF" />
              <TextInput
                className="flex-1 ml-3 text-base text-gray-900"
                placeholder="Enter your password"
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

          {/* Forgot Password */}
          <TouchableOpacity
            onPress={handleForgotPassword}
            className="self-end mb-6"
            disabled={isLoading}
          >
            <Text className="text-sm font-medium text-blue-600">
              Forgot Password?
            </Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity
            onPress={handleLogin}
            className={`rounded-xl py-4 items-center justify-center mb-6 ${
              isLoading ? "bg-blue-400" : "bg-blue-600"
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text className="text-white text-base font-semibold">
                Sign In
              </Text>
            )}
          </TouchableOpacity>

          {/* Divider */}
          <View className="flex-row items-center mb-6">
            <View className="flex-1 h-px bg-gray-200" />
            <Text className="mx-4 text-sm text-gray-500">Or continue with</Text>
            <View className="flex-1 h-px bg-gray-200" />
          </View>

          {/* Social Login Buttons */}
          <View className="flex-row justify-center gap-4 mb-8">
            <TouchableOpacity
              onPress={handleGoogleLogin}
              className="flex-1 flex-row items-center justify-center bg-white border border-gray-200 rounded-xl py-3 px-4"
              disabled={isLoading}
            >
              <Ionicons name="logo-google" size={20} color="#DB4437" />
              <Text className="ml-2 text-sm font-medium text-gray-700">
                Google
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleFacebookLogin}
              className="flex-1 flex-row items-center justify-center bg-white border border-gray-200 rounded-xl py-3 px-4"
              disabled={isLoading}
            >
              <Ionicons name="logo-facebook" size={20} color="#1877F2" />
              <Text className="ml-2 text-sm font-medium text-gray-700">
                Facebook
              </Text>
            </TouchableOpacity>
          </View>

          {/* Sign Up Link */}
          <View className="flex-row justify-center items-center pb-8">
            <Text className="text-gray-600 text-sm">
              Don't have an account?{" "}
            </Text>
            <TouchableOpacity onPress={handleBack} disabled={isLoading}>
              <Text className="text-blue-600 font-semibold text-sm">
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
