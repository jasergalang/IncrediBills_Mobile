import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "react-native";
import {
  sendChatMessage,
  addUserMessage,
  clearMessages,
  clearSession,
} from "../../redux/slices/chatbot/chatbotSlice";

export function useChatbot() {
  const dispatch = useDispatch();
  const { messages, loading, error } = useSelector((state) => state.chatbot);
  const [input, setInput] = useState("");
  const scrollViewRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollViewRef.current && messages.length > 0) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");

    // Add user message immediately
    dispatch(addUserMessage(userMessage));

    // Send to backend
    await dispatch(sendChatMessage(userMessage));
  };

  const handleClear = async () => {
    Alert.alert(
      "Clear Chat",
      "Are you sure you want to clear all messages?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Clear",
          style: "destructive",
          onPress: async () => {
            await dispatch(clearSession());
          },
        },
      ],
      { cancelable: true }
    );
  };

  // Mobile doesn't need keyPress handler
  // But we keep it for compatibility
  const handleKeyPress = () => {
    // Not used in mobile, but kept for API compatibility
  };

  return {
    messages,
    loading,
    error,
    input,
    setInput,
    scrollViewRef, // Changed from messagesEndRef
    handleSend,
    handleClear,
    handleKeyPress,
  };
}