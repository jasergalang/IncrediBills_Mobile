// components/prediction/NotificationPanel.jsx
// Shows notification history when bell is tapped
// Mirrors the web notification dropdown/panel

import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import axios from "axios";
import Constants from "expo-constants";

const BASE_IP = Constants.expoConfig?.extra?.BASE_IP || "localhost";
const API_URL = `http://${BASE_IP}:3000`;

// Format relative time (e.g. "2 hours ago")
const timeAgo = (dateStr) => {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

// Category icon map
const CATEGORY_ICONS = {
  electricity: "⚡",
  water: "💧",
  kitchen_gas: "🔥",
  kitchenGas: "🔥",
  grocery: "🛒",
  fuel: "⛽",
  miscellaneous: "📦",
};

export default function NotificationPanel({
  visible,
  onClose,
  authToken,
  onMarkAllRead,        // callback to update badge in parent
}) {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (visible) {
      fetchNotifications();
    }
  }, [visible]);

  const fetchNotifications = async (isRefresh = false) => {
    if (!authToken) return;
    try {
      isRefresh ? setRefreshing(true) : setLoading(true);
      const { data } = await axios.get(
        `${API_URL}/api/alerts/notifications/history`,
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      setNotifications(data.notifications || []);
      setUnreadCount(data.unreadCount || 0);
    } catch (error) {
      console.error("❌ Error fetching notifications:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleMarkAllRead = async () => {
    if (!authToken) return;
    try {
      await axios.patch(
        `${API_URL}/api/alerts/notifications/mark-all-read`,
        {},
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      // Update local state
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setUnreadCount(0);
      // Update parent badge
      onMarkAllRead?.();
    } catch (error) {
      console.error("❌ Error marking all read:", error);
    }
  };

  const handleMarkOneRead = async (notificationId) => {
    if (!authToken) return;
    try {
      await axios.patch(
        `${API_URL}/api/alerts/notifications/${notificationId}/read`,
        {},
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      setNotifications((prev) =>
        prev.map((n) => (n._id === notificationId ? { ...n, isRead: true } : n))
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (error) {
      console.error("❌ Error marking read:", error);
    }
  };

  const handleDelete = async (notificationId) => {
    if (!authToken) return;
    try {
      await axios.delete(
        `${API_URL}/api/alerts/notifications/${notificationId}`,
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      setNotifications((prev) => prev.filter((n) => n._id !== notificationId));
    } catch (error) {
      console.error("❌ Error deleting notification:", error);
    }
  };

  const renderEmpty = () => (
    <View style={{ alignItems: "center", paddingVertical: 48, paddingHorizontal: 24 }}>
      <Text style={{ fontSize: 48, marginBottom: 12 }}>🔕</Text>
      <Text style={{ fontSize: 16, fontWeight: "700", color: "#1e293b", marginBottom: 6 }}>
        No notifications yet
      </Text>
      <Text style={{ fontSize: 13, color: "#94a3b8", textAlign: "center", lineHeight: 20 }}>
        Set an alert threshold and you'll be notified here when your bill is uploaded
      </Text>
    </View>
  );

  const renderNotification = (item) => {
    const icon = CATEGORY_ICONS[item.category] || "📊";
    const isUnread = !item.isRead;

    return (
      <TouchableOpacity
        key={item._id}
        onPress={() => handleMarkOneRead(item._id)}
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          paddingHorizontal: 16,
          paddingVertical: 14,
          backgroundColor: isUnread ? "#fff7ed" : "white",
          borderBottomWidth: 1,
          borderBottomColor: "#f1f5f9",
          gap: 12,
        }}
        activeOpacity={0.7}
      >
        {/* Icon bubble */}
        <View
          style={{
            width: 42,
            height: 42,
            borderRadius: 12,
            backgroundColor: isUnread ? "#ffedd5" : "#f1f5f9",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Text style={{ fontSize: 20 }}>{icon}</Text>
        </View>

        {/* Content */}
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 3 }}>
            <Text
              style={{
                fontSize: 13,
                fontWeight: isUnread ? "700" : "600",
                color: "#1e293b",
                flex: 1,
                marginRight: 8,
              }}
              numberOfLines={1}
            >
              {item.title || `${item.category} Alert`}
            </Text>
            <Text style={{ fontSize: 10, color: "#94a3b8", flexShrink: 0 }}>
              {timeAgo(item.createdAt)}
            </Text>
          </View>
          <Text
            style={{ fontSize: 12, color: "#64748b", lineHeight: 18 }}
            numberOfLines={2}
          >
            {item.message || item.body || "Threshold alert triggered"}
          </Text>
        </View>

        {/* Unread dot + delete */}
        <View style={{ alignItems: "center", gap: 8, flexShrink: 0 }}>
          {isUnread && (
            <View
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: "#f97316",
              }}
            />
          )}
          <TouchableOpacity
            onPress={() => handleDelete(item._id)}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Text style={{ fontSize: 14, color: "#cbd5e1" }}>✕</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "flex-end" }}>
        <View
          style={{
            backgroundColor: "white",
            borderTopLeftRadius: 28,
            borderTopRightRadius: 28,
            maxHeight: "80%",
            overflow: "hidden",
          }}
        >
          {/* ── Header ─────────────────────────────────────────────── */}
          <View
            style={{
              paddingHorizontal: 20,
              paddingTop: 20,
              paddingBottom: 16,
              borderBottomWidth: 1,
              borderBottomColor: "#f1f5f9",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
              <Text style={{ fontSize: 18, fontWeight: "800", color: "#1e293b" }}>
                Notifications
              </Text>
              {unreadCount > 0 && (
                <View
                  style={{
                    backgroundColor: "#ef4444",
                    borderRadius: 10,
                    paddingHorizontal: 7,
                    paddingVertical: 2,
                    minWidth: 20,
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: "white", fontSize: 11, fontWeight: "700" }}>
                    {unreadCount > 99 ? "99+" : unreadCount}
                  </Text>
                </View>
              )}
            </View>

            <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
              {unreadCount > 0 && (
                <TouchableOpacity onPress={handleMarkAllRead}>
                  <Text style={{ fontSize: 12, fontWeight: "600", color: "#f97316" }}>
                    Mark all read
                  </Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                onPress={onClose}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  backgroundColor: "#f1f5f9",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontSize: 14, color: "#64748b", fontWeight: "bold" }}>✕</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* ── Body ───────────────────────────────────────────────── */}
          {loading ? (
            <View style={{ paddingVertical: 48, alignItems: "center" }}>
              <ActivityIndicator color="#f97316" size="large" />
              <Text style={{ marginTop: 12, color: "#94a3b8", fontSize: 13 }}>
                Loading notifications...
              </Text>
            </View>
          ) : (
            <ScrollView
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={() => fetchNotifications(true)}
                  tintColor="#f97316"
                  colors={["#f97316"]}
                />
              }
            >
              {notifications.length === 0
                ? renderEmpty()
                : notifications.map((item) => renderNotification(item))}

              {/* Bottom padding */}
              <View style={{ height: 32 }} />
            </ScrollView>
          )}
        </View>
      </View>
    </Modal>
  );
}