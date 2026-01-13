import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useChatbot } from './hooks/useChatbotLogic';
import TypingIndicator from './TypingIndicator';
import QuickActions from './QuickActions';

export default function ChatContent({ isMaximized }) {
  const {
    messages,
    loading,
    error,
    input,
    setInput,
    scrollViewRef,
    handleSend,
    handleClear,
  } = useChatbot();

  const [showQuickActions, setShowQuickActions] = useState(true);

  const quickActions = [
    { icon: '📊', label: 'View Bills' },
    { icon: '💰', label: 'Pay Now' },
    { icon: '📈', label: 'Usage' },
    { icon: '❓', label: 'Help' },
  ];

  const handleQuickAction = (action) => {
    setInput(action.label);
    setTimeout(() => handleSend(), 100);
  };

  const handleCloseQuickActions = () => setShowQuickActions(false);

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
      
    >
      {/* Messages Area */}
      <ScrollView
        ref={scrollViewRef}
        className="flex-1 p-4"
        contentContainerStyle={{ gap: 16, paddingBottom: 30 }}
      >
        {messages.length === 0 ? (
          <View className="items-center py-8">
            <Text className="text-5xl mb-4">💬</Text>
            <Text className="text-sm text-slate-900">Start a conversation with IncrediBot!</Text>
            <Text className="text-xs text-slate-400 mt-2">Ask about your utility bills</Text>
          </View>
        ) : (
          messages.map((msg) => (
            <View
              key={msg.id}
              className={`flex-row ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <View
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  msg.sender === 'user'
                    ? 'bg-blue-600'
                    : msg.isError
                    ? 'bg-red-50 border border-red-200'
                    : 'bg-slate-100'
                }`}
              >
                <Text className={`text-sm ${msg.sender === 'user' ? 'text-white' : msg.isError ? 'text-red-700' : 'text-slate-800'}`}>
                  {msg.text}
                </Text>
                <Text className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-white/70' : 'text-slate-500'}`}>
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Text>
              </View>
            </View>
          ))
        )}
        {loading && <TypingIndicator />}
      </ScrollView>

      {/* Quick Actions */}
      {showQuickActions && (
        <QuickActions 
          quickActions={quickActions}
          onAction={handleQuickAction}
          isMaximized={isMaximized}
          onClose={handleCloseQuickActions}
        />
      )}

      {/* Input Area */}
      <View className="border-t border-slate-200 p-4 bg-white">
        <View className="flex-row gap-2">
          <TouchableOpacity
            onPress={handleClear}
            disabled={messages.length === 0 || loading}
            className={`px-3 py-2 rounded-xl ${(messages.length === 0 || loading) && 'opacity-50'}`}
          >
            <Text className="text-lg">🗑️</Text>
          </TouchableOpacity>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Ask about your bills..."
            placeholderTextColor="#94a3b8"
            editable={!loading}
            onSubmitEditing={handleSend} 
            returnKeyType="send"
            className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
          />
          <TouchableOpacity
            onPress={handleSend}
            disabled={!input.trim() || loading}
            className={`px-6 py-3 bg-blue-600 rounded-xl ${(!input.trim() || loading) && 'opacity-50'}`}
          >
            <Text className="text-white font-semibold">{loading ? '...' : 'Send'}</Text>
          </TouchableOpacity>
        </View>
        {error && <Text className="text-xs text-red-600 mt-2">⚠️ {error}</Text>}
        
      </View>
    </KeyboardAvoidingView>
  );
}