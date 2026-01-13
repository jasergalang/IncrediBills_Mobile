import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as chatbotAPI from "../../../api/ChatbotAPI";

export const sendChatMessage = createAsyncThunk(
  "chatbot/sendMessage",
  async (message, { rejectWithValue }) => {
    try {
      const response = await chatbotAPI.sendMessage(message);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to send message"
      );
    }
  }
);

export const clearSession = createAsyncThunk(
  "chatbot/clearSession",
  async (_, { rejectWithValue }) => {
    try {
      const response = await chatbotAPI.clearChatSession();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to clear session"
      );
    }
  }
);

export const checkHealth = createAsyncThunk(
  "chatbot/checkHealth",
  async (_, { rejectWithValue }) => {
    try {
      const response = await chatbotAPI.checkChatbotHealth();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Health check failed"
      );
    }
  }
);

const initialState = {
  messages: [],
  loading: false,
  error: null,
  messageCount: 0,
  isHealthy: null,
};

const chatbotSlice = createSlice({
  name: "chatbot",
  initialState,
  reducers: {
    addUserMessage: (state, action) => {
      state.messages.push({
        id: Date.now(),
        text: action.payload,
        sender: "user",
        timestamp: new Date().toISOString(),
      });
    },
    clearMessages: (state) => {
      state.messages = [];
      state.messageCount = 0;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Send Message
      .addCase(sendChatMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendChatMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.messages.push({
          id: Date.now(),
          text: action.payload.bot,
          sender: "bot",
          timestamp: new Date().toISOString(),
        });
        state.messageCount =
          action.payload.messageCount ?? state.messageCount;
      })
      .addCase(sendChatMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.messages.push({
          id: Date.now(),
          text:
            action.payload ||
            "Sorry, something went wrong. Please try again.",
          sender: "bot",
          timestamp: new Date().toISOString(),
          isError: true,
        });
      })

      // Clear Session
      .addCase(clearSession.pending, (state) => {
        state.loading = true;
      })
      .addCase(clearSession.fulfilled, (state) => {
        state.loading = false;
        state.messages = [];
        state.messageCount = 0;
        state.error = null;
      })
      .addCase(clearSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Health Check
      .addCase(checkHealth.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkHealth.fulfilled, (state, action) => {
        state.loading = false;
        state.isHealthy = action.payload.status === "ok";
      })
      .addCase(checkHealth.rejected, (state) => {
        state.loading = false;
        state.isHealthy = false;
      });
  },
});


export const { addUserMessage, clearMessages, clearError } =
  chatbotSlice.actions;

export default chatbotSlice.reducer;