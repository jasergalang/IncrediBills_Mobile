// import React, { useState } from "react";

// import { SafeAreaView } from "react-native-safe-area-context";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StatusBar,
//   ActivityIndicator,
//   Image,
//   ScrollView,
//   Alert,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import Toast from "react-native-toast-message";
// import { useNavigation } from "@react-navigation/native";
// import axios from "axios";
// import baseURL from "../../assets/common/baseUrl";
// import { useAuth } from "../../context/auth";
// import { LinearGradient } from "expo-linear-gradient";

// import { useDispatch } from "react-redux";
// import { loginUser } from "../../redux/actions/user/loginActions";
// import { useSelector } from "react-redux";


// import {
// GoogleSignin,
// isErrorWithCode,
// isSuccessResponse,
// statusCodes,
// } from "@react-native-google-signin/google-signin";


// GoogleSignin.configure(
//   {
//     webClientId: "791683800661-e3btvtkfvhijua0o7no2mlqe1pjt6j54.apps.googleusercontent.com",

//   }
// );


// export default function Login() {
//   const navigation = useNavigation();
//   const { login, isAuthenticated } = useAuth();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const dispatch = useDispatch();
//   const { user: reduxUser, loading: reduxLoading, error: reduxError } = useSelector((state) => state.login);

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleLogin = async () => {
//     if (!email || !password) {
//       Toast.show({
//         type: "error",
//         text1: "Required",
//         text2: "Email and password are required",
//         position: "top",
//       });
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const response = await axios.post(`${baseURL}/api/user/login`, {
//         email,
//         password,
//       });

//       console.log("Login response:", response.data);

//       if (response.data.success && response.data.token && response.data.user) {
//         // Pass the full response to login()
//         const success = await login(response.data);

//         if (success) {
//           Toast.show({
//             type: "success",
//             text1: "Login Successful",
//             text2: response.data.message || "Welcome back!",
//             position: "top",
//           });
//           // Do NOT navigate manually. Let App.js re-render when isAuthenticated changes.
//         } else {
//           Toast.show({
//             type: "error",
//             text1: "Login Failed",
//             text2: "Failed to store credentials",
//             position: "top",
//           });
//         }
//       } else {
//         console.error("Invalid login response:", response.data);
//         Toast.show({
//           type: "error",
//           text1: "Login Failed",
//           text2: response.data.message || "Invalid credentials",
//           position: "top",
//         });
//       }
//     } catch (error) {
//       console.error("Login error:", error?.response?.data || error.message);
//       Toast.show({
//         type: "error",
//         text1: "Error",
//         text2: error?.response?.data?.message || "Something went wrong.",
//         position: "top",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleBack = () => {
//     navigation.navigate("Register");
//   };

//   const handleForgotPassword = () => {
//     navigation.navigate("ForgotPassword");
//   };

//   const handleGoogleLogin = () => {
//     dispatch(loginUser())
//       .unwrap()
//       .then(async (result) => {
//         if (result.isRegistered) {
//           // User exists in backend
//           // Call backend login with google email/name to get token
//           try {
//             const response = await axios.post(`${baseURL}/api/user/login`, {
//               email: result.email,
//               // or use a special "googleLogin" endpoint if you have one
//             });
//             if (response.data.success && response.data.token) {
//               await login(response.data);
//               Toast.show({
//                 type: "success",
//                 text1: "Welcome back!",
//                 position: "top",
//               });
//             }
//           } catch (err) {
//             Toast.show({
//               type: "error",
//               text1: "Login Failed",
//               text2: err?.response?.data?.message || err.message,
//             });
//           }
//         } else {
//           // New user, go to register with prefilled data
//           Toast.show({
//             type: "info",
//             text1: "Please complete registration",
//             position: "top",
//           });
//           navigation.navigate("Register", {
//             email: result.email,
//             name: result.name,
//             photo: result.photo,
//           });
//         }
//       })
//       .catch((err) => {
//         Toast.show({
//           type: "error",
//           text1: "Google Login Failed",
//           text2: err,
//           position: "top",
//         });
//       });
//   };

//   const handleFacebookLogin = () => {
//     Toast.show({
//       type: "info",
//       text1: "Info",
//       text2: "Facebook login coming soon!",
//     });
//   };

//   return (
//     <SafeAreaView className="flex-1 bg-white">
//       <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

//       <ScrollView className="flex-1">
//         {/* Header with Back Button */}
//         <View className="px-6 pt-4 pb-2">
//           <TouchableOpacity onPress={handleBack} className="w-10" disabled={isLoading}>
//             <Ionicons name="arrow-back" size={24} color="#000" />
//           </TouchableOpacity>
//         </View>

//         {/* Main Content */}
//         <View className="px-6 pt-8">
//           {/* Logo/Brand Section */}
//           <View className="mb-8 items-center">
//             <LinearGradient
//               colors={["#2563eb", "#4f46e5"]}
//               start={{ x: 0, y: 0 }}
//               end={{ x: 1, y: 1 }}
//               className="w-12 h-12 rounded-xl items-center justify-center mb-3"
//               style={{
//                 shadowColor: "#000",
//                 shadowOffset: { width: 0, height: 4 },
//                 shadowOpacity: 0.3,
//                 shadowRadius: 4.65,
//                 elevation: 8,
//               }}
//             >
//               <Text className="text-white font-bold text-2xl">₿</Text>
//             </LinearGradient>

//             <Text className="text-2xl font-bold text-blue-600 mb-4">
//               IncrediBills
//             </Text>

//             <Text className="text-3xl font-bold text-gray-900 mb-2">
//               Welcome Back
//             </Text>
//             <Text className="text-base text-gray-500">
//               Sign in to continue managing your bills
//             </Text>
//           </View>

//           {/* Email Input */}
//           <View className="mb-4">
//             <Text className="text-sm font-medium text-gray-700 mb-2">
//               Email Address
//             </Text>
//             <View className="flex-row items-center bg-gray-50 rounded-xl px-4 py-3.5 border border-gray-200">
//               <Ionicons name="mail-outline" size={20} color="#9CA3AF" />
//               <TextInput
//                 className="flex-1 ml-3 text-base text-gray-900"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChangeText={setEmail}
//                 keyboardType="email-address"
//                 autoCapitalize="none"
//                 placeholderTextColor="#9CA3AF"
//                 editable={!isLoading}
//               />
//             </View>
//           </View>

//           {/* Password Input */}
//           <View className="mb-2">
//             <Text className="text-sm font-medium text-gray-700 mb-2">
//               Password
//             </Text>
//             <View className="flex-row items-center bg-gray-50 rounded-xl px-4 py-3.5 border border-gray-200">
//               <Ionicons name="lock-closed-outline" size={20} color="#9CA3AF" />
//               <TextInput
//                 className="flex-1 ml-3 text-base text-gray-900"
//                 placeholder="Enter your password"
//                 value={password}
//                 onChangeText={setPassword}
//                 secureTextEntry={!showPassword}
//                 placeholderTextColor="#9CA3AF"
//                 editable={!isLoading}
//               />
//               <TouchableOpacity
//                 onPress={togglePasswordVisibility}
//                 disabled={isLoading}
//                 className="ml-2"
//               >
//                 <Ionicons
//                   name={showPassword ? "eye-outline" : "eye-off-outline"}
//                   size={20}
//                   color="#9CA3AF"
//                 />
//               </TouchableOpacity>
//             </View>
//           </View>

//           {/* Forgot Password */}
//           <TouchableOpacity
//             onPress={handleForgotPassword}
//             className="self-end mb-6"
//             disabled={isLoading}
//           >
//             <Text className="text-sm font-medium text-blue-600">
//               Forgot Password?
//             </Text>
//           </TouchableOpacity>

//           {/* Login Button */}
//           <TouchableOpacity
//             onPress={handleLogin}
//             className={`rounded-xl py-4 items-center justify-center mb-6 ${
//               isLoading ? "bg-blue-400" : "bg-blue-600"
//             }`}
//             disabled={isLoading}
//           >
//             {isLoading ? (
//               <ActivityIndicator color="#fff" size="small" />
//             ) : (
//               <Text className="text-white text-base font-semibold">
//                 Sign In
//               </Text>
//             )}
//           </TouchableOpacity>

//           {/* Divider */}
//           <View className="flex-row items-center mb-6">
//             <View className="flex-1 h-px bg-gray-200" />
//             <Text className="mx-4 text-sm text-gray-500">Or continue with</Text>
//             <View className="flex-1 h-px bg-gray-200" />
//           </View>

//           {/* Social Login Buttons */}
//           <View className="flex-row justify-center gap-4 mb-8">
//             <TouchableOpacity
//               onPress={handleGoogleLogin}
//               className="flex-1 flex-row items-center justify-center bg-white border border-gray-200 rounded-xl py-3 px-4"
//               disabled={isLoading}
//             >
//               <Ionicons name="logo-google" size={20} color="#DB4437" />
//               <Text className="ml-2 text-sm font-medium text-gray-700">
//                 Google
//               </Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               onPress={handleFacebookLogin}
//               className="flex-1 flex-row items-center justify-center bg-white border border-gray-200 rounded-xl py-3 px-4"
//               disabled={isLoading}
//             >
//               <Ionicons name="logo-facebook" size={20} color="#1877F2" />
//               <Text className="ml-2 text-sm font-medium text-gray-700">
//                 Facebook
//               </Text>
//             </TouchableOpacity>
//           </View>

//           {/* Sign Up Link */}
//           <View className="flex-row justify-center items-center pb-8">
//             <Text className="text-gray-600 text-sm">
//               Don't have an account?{" "}
//             </Text>
//             <TouchableOpacity onPress={handleBack} disabled={isLoading}>
//               <Text className="text-blue-600 font-semibold text-sm">
//                 Sign Up
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";
import { useAuth } from "../../context/auth";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/actions/user/loginActions";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import EmailVerificationModal from "./EmailVerificationModal";

GoogleSignin.configure({
  webClientId:
    "791683800661-e3btvtkfvhijua0o7no2mlqe1pjt6j54.apps.googleusercontent.com",
});

export default function Login() {
  const navigation = useNavigation();
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState("");
  const dispatch = useDispatch();

  // When isAuthenticated becomes true, navigate to main app
  useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate("MainNavigator");
    }
  }, [isAuthenticated]);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleLogin = async () => {
    if (!email || !password) {
      Toast.show({
        type: "error",
        text1: "Required",
        text2: "Email and password are required",
        position: "top",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(`${baseURL}/api/user/login`, {
        email,
        password,
      });

      if (response.data.success && response.data.token && response.data.user) {
        const success = await login(response.data);
        if (success) {
          Toast.show({
            type: "success",
            text1: "Login Successful",
            text2: response.data.message || "Welcome back!",
            position: "top",
          });
          // Navigation handled by the useEffect above watching isAuthenticated
        } else {
          Toast.show({
            type: "error",
            text1: "Login Failed",
            text2: "Failed to store credentials",
            position: "top",
          });
        }
      } else {
        Toast.show({
          type: "error",
          text1: "Login Failed",
          text2: response.data.message || "Invalid credentials",
          position: "top",
        });
      }
    } catch (error) {
      const errMessage = error?.response?.data?.message || "";

      // If backend says email not verified, open the verification modal
      if (
        errMessage.toLowerCase().includes("verify") ||
        errMessage.toLowerCase().includes("not verified")
      ) {
        setVerificationEmail(email);
        setShowVerificationModal(true);
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: errMessage || "Something went wrong.",
          position: "top",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerificationSuccess = () => {
    setShowVerificationModal(false);
    Toast.show({
      type: "success",
      text1: "Email Verified",
      text2: "You can now sign in.",
      position: "top",
    });
  };

  const handleCloseVerificationModal = () => {
    setShowVerificationModal(false);
  };

  const handleBack = () => navigation.navigate("Signup");

  const handleForgotPassword = () => navigation.navigate("ForgotPassword");

  const handleGoogleLogin = () => {
    dispatch(loginUser())
      .unwrap()
      .then(async (result) => {
        if (result.isRegistered) {
          try {
            const response = await axios.post(`${baseURL}/api/user/login`, {
              email: result.email,
            });
            if (response.data.success && response.data.token) {
              const success = await login(response.data);
              if (success) {
                Toast.show({
                  type: "success",
                  text1: "Welcome back!",
                  position: "top",
                });
                // Navigation handled by useEffect
              }
            }
          } catch (err) {
            Toast.show({
              type: "error",
              text1: "Login Failed",
              text2: err?.response?.data?.message || err.message,
            });
          }
        } else {
          Toast.show({
            type: "info",
            text1: "Please complete registration",
            position: "top",
          });
          navigation.navigate("Register", {
            email: result.email,
            name: result.name,
            photo: result.photo,
          });
        }
      })
      .catch((err) => {
        Toast.show({
          type: "error",
          text1: "Google Login Failed",
          text2: typeof err === "string" ? err : err?.message || "Unknown error",
          position: "top",
        });
      });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <ScrollView className="flex-1">
        {/* Header with Back Button */}
        <View className="px-6 pt-4 pb-2">
          <TouchableOpacity
            onPress={handleBack}
            disabled={isLoading}
            className="w-10"
          >
            {/* Back arrow hardcoded */}
            <View style={{ width: 24, height: 24, justifyContent: "center" }}>
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderLeftWidth: 2,
                  borderBottomWidth: 2,
                  borderColor: "#000",
                  transform: [{ rotate: "45deg" }],
                  marginLeft: 4,
                }}
              />
              <View
                style={{
                  position: "absolute",
                  width: 16,
                  height: 2,
                  backgroundColor: "#000",
                  borderRadius: 1,
                  left: 4,
                  top: 11,
                }}
              />
            </View>
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
              {/* Mail icon hardcoded */}
              <View
                style={{
                  width: 20,
                  height: 16,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: 20,
                    height: 14,
                    borderWidth: 1.5,
                    borderColor: "#9CA3AF",
                    borderRadius: 2,
                  }}
                />
                <View
                  style={{
                    position: "absolute",
                    width: 0,
                    height: 0,
                    borderLeftWidth: 10,
                    borderRightWidth: 10,
                    borderTopWidth: 8,
                    borderLeftColor: "transparent",
                    borderRightColor: "transparent",
                    borderTopColor: "#9CA3AF",
                    top: 0,
                  }}
                />
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
          <View className="mb-2">
            <Text className="text-sm font-medium text-gray-700 mb-2">
              Password
            </Text>
            <View className="flex-row items-center bg-gray-50 rounded-xl px-4 py-3.5 border border-gray-200">
              {/* Lock icon hardcoded */}
              <View style={{ alignItems: "center" }}>
                <View
                  style={{
                    width: 12,
                    height: 6,
                    borderRadius: 6,
                    borderWidth: 1.5,
                    borderColor: "#9CA3AF",
                    borderBottomWidth: 0,
                  }}
                />
                <View
                  style={{
                    width: 14,
                    height: 10,
                    borderRadius: 2,
                    borderWidth: 1.5,
                    borderColor: "#9CA3AF",
                  }}
                />
              </View>
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
                {/* Eye icon hardcoded */}
                <View
                  style={{
                    width: 20,
                    height: 14,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      width: 20,
                      height: 14,
                      borderRadius: 10,
                      borderWidth: 1.5,
                      borderColor: "#9CA3AF",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: 3,
                        backgroundColor: showPassword
                          ? "#9CA3AF"
                          : "transparent",
                        borderWidth: showPassword ? 0 : 1.5,
                        borderColor: "#9CA3AF",
                      }}
                    />
                  </View>
                  {!showPassword && (
                    <View
                      style={{
                        position: "absolute",
                        width: 20,
                        height: 1.5,
                        backgroundColor: "#9CA3AF",
                        transform: [{ rotate: "30deg" }],
                      }}
                    />
                  )}
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Forgot Password */}
          <View className="flex-row justify-end mt-3 mb-6">
            <TouchableOpacity
              onPress={handleForgotPassword}
              disabled={isLoading}
            >
              <Text className="text-sm font-semibold text-blue-600">
                Forgot password?
              </Text>
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <TouchableOpacity
            onPress={handleLogin}
            disabled={isLoading}
            className="rounded-xl overflow-hidden mb-6"
          >
            <LinearGradient
              colors={
                isLoading ? ["#93c5fd", "#a5b4fc"] : ["#2563eb", "#4f46e5"]
              }
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              className="py-4 items-center justify-center rounded-xl"
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text className="text-white text-base font-bold">Sign In</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>

          {/* Divider */}
          <View className="flex-row items-center mb-6">
            <View className="flex-1 h-px bg-gray-200" />
            <Text className="mx-4 text-sm text-gray-500">Or continue with</Text>
            <View className="flex-1 h-px bg-gray-200" />
          </View>

          {/* Google Login Button */}
          <View className="mb-8">
            <TouchableOpacity
              onPress={handleGoogleLogin}
              className="flex-row items-center justify-center bg-white border border-gray-200 rounded-xl py-3 px-4"
              disabled={isLoading}
            >
              {/* Google "G" hardcoded */}
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  backgroundColor: "#DB4437",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ color: "#fff", fontSize: 11, fontWeight: "bold" }}
                >
                  G
                </Text>
              </View>
              <Text className="ml-2 text-sm font-medium text-gray-700">
                Google
              </Text>
            </TouchableOpacity>
          </View>

          {/* Sign Up Link */}
          <View className="flex-row justify-center items-center pb-8">
            <Text className="text-gray-600 text-sm">
              Don't have an account?{" "}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Register")}
              disabled={isLoading}
            >
              <Text className="text-blue-600 font-semibold text-sm">
                Sign up for free
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Email Verification Modal */}
      <EmailVerificationModal
        isOpen={showVerificationModal}
        onClose={handleCloseVerificationModal}
        email={verificationEmail}
        onVerificationSuccess={handleVerificationSuccess}
      />
    </SafeAreaView>
  );
}