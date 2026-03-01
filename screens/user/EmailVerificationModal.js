import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";

export default function EmailVerificationModal({
  isOpen,
  onClose,
  email,
  onVerificationSuccess,
}) {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [resending, setResending] = useState(false);

  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    if (value.length > 1) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (index, key) => {
    if (key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const verificationCode = code.join("");
    if (verificationCode.length !== 6) {
      setError("Please enter the complete 6-digit code");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await axios.post(`${baseURL}/api/user/verify-email`, {
        email,
        code: verificationCode,
      });
      setSuccess(true);
      setTimeout(() => {
        onVerificationSuccess();
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    setError("");

    try {
      await axios.post(`${baseURL}/api/user/resend-verification`, {
        email,
      });
      setTimeout(() => {
        setError("Code sent successfully!");
      }, 100);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to resend code");
    } finally {
      setResending(false);
    }
  };

  const handleClose = () => {
    if (!loading && !resending) {
      setCode(["", "", "", "", "", ""]);
      setError("");
      setSuccess(false);
      onClose();
    }
  };

  const isSuccessMessage = error.includes("successfully");

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <View
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        className="flex-1 justify-center items-center p-4"
      >
        <View className="bg-white rounded-2xl w-full max-w-md p-8 relative">

          {/* Close Button (X) */}
          <TouchableOpacity
            onPress={handleClose}
            disabled={loading || resending}
            className="absolute top-4 right-4 w-8 h-8 items-center justify-center"
          >
            <View style={{ width: 18, height: 18, justifyContent: "center", alignItems: "center" }}>
              <View style={{
                position: "absolute",
                width: 18, height: 2,
                backgroundColor: loading || resending ? "#cbd5e1" : "#94a3b8",
                borderRadius: 1,
                transform: [{ rotate: "45deg" }],
              }} />
              <View style={{
                position: "absolute",
                width: 18, height: 2,
                backgroundColor: loading || resending ? "#cbd5e1" : "#94a3b8",
                borderRadius: 1,
                transform: [{ rotate: "-45deg" }],
              }} />
            </View>
          </TouchableOpacity>

          {/* Header */}
          <View className="items-center mb-8">
            <LinearGradient
              colors={["#2563eb", "#4f46e5"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="w-20 h-20 rounded-full items-center justify-center mb-4"
            >
              {/* Envelope icon hardcoded */}
              <View style={{ width: 36, height: 26, justifyContent: "center", alignItems: "center" }}>
                <View style={{
                  width: 36, height: 26,
                  borderWidth: 2,
                  borderColor: "#fff",
                  borderRadius: 3,
                  justifyContent: "flex-start",
                  alignItems: "center",
                  overflow: "hidden",
                }}>
                  <View style={{
                    width: 0, height: 0,
                    borderLeftWidth: 18,
                    borderRightWidth: 18,
                    borderTopWidth: 14,
                    borderLeftColor: "transparent",
                    borderRightColor: "transparent",
                    borderTopColor: "#fff",
                  }} />
                </View>
              </View>
            </LinearGradient>

            <Text className="text-3xl font-bold text-slate-900 mb-2">
              Verify Your Email
            </Text>
            <Text className="text-slate-600 text-center">
              We sent a 6-digit code to{"\n"}
              <Text className="font-semibold text-blue-600">{email}</Text>
            </Text>
          </View>

          {/* Error / Success Message */}
          {!!error && (
            <View
              style={{
                marginBottom: 24,
                borderWidth: 1,
                borderRadius: 12,
                padding: 16,
                backgroundColor: isSuccessMessage ? "#f0fdf4" : "#fef2f2",
                borderColor: isSuccessMessage ? "#bbf7d0" : "#fecaca",
              }}
            >
              <Text style={{ fontSize: 14, color: isSuccessMessage ? "#166534" : "#991b1b" }}>
                {error}
              </Text>
            </View>
          )}

          {/* Success Message */}
          {success && (
            <View style={{
              marginBottom: 24,
              borderWidth: 1,
              borderRadius: 12,
              padding: 16,
              backgroundColor: "#f0fdf4",
              borderColor: "#bbf7d0",
            }}>
              <Text style={{ fontSize: 14, color: "#166534" }}>
                Email verified successfully! You can now log in...
              </Text>
            </View>
          )}

          {/* 6-Digit Code Inputs */}
          <View className="flex-row justify-center gap-2 mb-6">
            {code.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => (inputRefs.current[index] = ref)}
                value={digit}
                onChangeText={(value) => handleChange(index, value)}
                onKeyPress={({ nativeEvent }) => handleKeyPress(index, nativeEvent.key)}
                maxLength={1}
                keyboardType="number-pad"
                editable={!loading && !success}
                style={{
                  width: 44,
                  height: 56,
                  borderWidth: 2,
                  borderColor: digit ? "#2563eb" : "#e2e8f0",
                  borderRadius: 12,
                  textAlign: "center",
                  fontSize: 24,
                  fontWeight: "bold",
                  color: "#0f172a",
                  backgroundColor: loading || success ? "#f8fafc" : "#fff",
                }}
              />
            ))}
          </View>

          {/* Verify Button */}
          <TouchableOpacity
            onPress={handleVerify}
            disabled={loading || success}
            className="rounded-xl overflow-hidden mb-4"
          >
            <LinearGradient
              colors={loading || success ? ["#93c5fd", "#a5b4fc"] : ["#2563eb", "#4f46e5"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              className="py-3.5 items-center justify-center rounded-xl"
            >
              {loading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text className="text-white font-semibold text-base">
                  Verify Email
                </Text>
              )}
            </LinearGradient>
          </TouchableOpacity>

          {/* Resend Button */}
          <TouchableOpacity
            onPress={handleResend}
            disabled={resending || success}
            className="items-center py-2"
          >
            {resending ? (
              <ActivityIndicator color="#2563eb" size="small" />
            ) : (
              <Text style={{
                fontWeight: "600",
                fontSize: 16,
                color: resending || success ? "#93c5fd" : "#2563eb",
              }}>
                Resend Code
              </Text>
            )}
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
}