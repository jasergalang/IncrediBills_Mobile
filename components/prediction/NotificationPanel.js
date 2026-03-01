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
import { utilities } from "../../constants/utilities"; // adjust path as needed

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

// Get utility config from utilities.js by category id
const getUtility = (category) => {
  // normalize key (kitchen_gas → kitchenGas)
  const normalized = category?.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
  return (
    utilities.find((u) => u.id === category || u.id === normalized) || {
      icon: "📊",
      backgroundColor: "#f1f5f9",
      borderColor: "#94a3b8",
      name: category,
    }
  );
};

export default function NotificationPanel({
  visible,
  onClose,
  authToken,
  onMarkAllRead,
}) {
  const [activeTab, setActiveTab] = useState("triggered");
  const [notifications, setNotifications] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (visible) {
      fetchNotifications();
      fetchAlerts();
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

  const fetchAlerts = async () => {
    if (!authToken) return;
    try {
      const { data } = await axios.get(`${API_URL}/api/alerts`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setAlerts(data.alerts || []);
    } catch (error) {
      console.error("❌ Error fetching alerts:", error);
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
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setUnreadCount(0);
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

  const handleDeleteNotification = async (notificationId) => {
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

  const handleDeleteAlert = async (alertId) => {
    if (!authToken) return;
    try {
      await axios.delete(`${API_URL}/api/alerts/${alertId}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setAlerts((prev) => prev.filter((a) => a._id !== alertId));
    } catch (error) {
      console.error("❌ Error deleting alert:", error);
    }
  };

  // ── Empty State ──────────────────────────────────────────────────────────
  const renderEmpty = (isTriggered) => (
    <View style={{ alignItems: "center", paddingVertical: 48, paddingHorizontal: 24 }}>
      <Text style={{ fontSize: 48, marginBottom: 12 }}>{isTriggered ? "🔕" : "🔔"}</Text>
      <Text style={{ fontSize: 15, fontWeight: "700", color: "#1e293b", marginBottom: 6 }}>
        {isTriggered ? "No triggered alerts yet" : "No active alerts"}
      </Text>
      <Text style={{ fontSize: 13, color: "#94a3b8", textAlign: "center", lineHeight: 20 }}>
        {isTriggered
          ? "Upload a bill that meets your alert criteria"
          : "Set alerts from the Predictions page"}
      </Text>
    </View>
  );

  // ── Triggered Notification Card ──────────────────────────────────────────
  const renderNotification = (item) => {
    const utility = getUtility(item.category);
    const isUnread = !item.isRead;
    const isAbove = item.alertType === "above";

    return (
      <TouchableOpacity
        key={item._id}
        onPress={() => !item.isRead && handleMarkOneRead(item._id)}
        activeOpacity={0.75}
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          paddingHorizontal: 16,
          paddingVertical: 14,
          backgroundColor: isUnread ? "#eff6ff" : "white",
          borderBottomWidth: 1,
          borderBottomColor: "#f1f5f9",
          borderLeftWidth: isUnread ? 4 : 0,
          borderLeftColor: "#3b82f6",
          gap: 12,
        }}
      >
        {/* Icon bubble using utility colors */}
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: 14,
            backgroundColor: utility.backgroundColor,
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Text style={{ fontSize: 22 }}>{utility.icon}</Text>
        </View>

        {/* Content */}
        <View style={{ flex: 1 }}>
          {/* Title row */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 3,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", gap: 6, flex: 1 }}>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: isUnread ? "700" : "600",
                  color: "#0f172a",
                  flexShrink: 1,
                }}
                numberOfLines={1}
              >
                {item.title || `${utility.name} Alert`}
              </Text>
              {isUnread && (
                <View
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: 4,
                    backgroundColor: "#3b82f6",
                    flexShrink: 0,
                  }}
                />
              )}
            </View>
            <Text style={{ fontSize: 10, color: "#94a3b8", marginLeft: 8, flexShrink: 0 }}>
              {timeAgo(item.createdAt)}
            </Text>
          </View>

          {/* Message */}
          <Text
            style={{ fontSize: 12, color: "#475569", lineHeight: 18, marginBottom: 8 }}
            numberOfLines={2}
          >
            {item.message || item.body || "Threshold alert triggered"}
          </Text>

          {/* Badge row */}
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 4,
                backgroundColor: isAbove ? "#fee2e2" : "#dcfce7",
                borderRadius: 20,
                paddingHorizontal: 8,
                paddingVertical: 3,
              }}
            >
              <Text style={{ fontSize: 10 }}>{isAbove ? "🚨" : "✅"}</Text>
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: "600",
                  color: isAbove ? "#dc2626" : "#16a34a",
                }}
              >
                {isAbove ? "Exceeded" : "Under Budget"}
              </Text>
            </View>
          </View>
        </View>

        {/* Delete */}
        <TouchableOpacity
          onPress={() => handleDeleteNotification(item._id)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          style={{
            width: 26,
            height: 26,
            borderRadius: 13,
            backgroundColor: "#f1f5f9",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            marginTop: 2,
          }}
        >
          <Text style={{ fontSize: 11, color: "#94a3b8", fontWeight: "700" }}>✕</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  // ── Alert Card ────────────────────────────────────────────────────────────
  const renderAlert = (alert) => {
    const utility = getUtility(alert.category);
    const isAbove = alert.alertType === "above";

    return (
      <View
        key={alert._id}
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          paddingHorizontal: 16,
          paddingVertical: 14,
          backgroundColor: "white",
          borderBottomWidth: 1,
          borderBottomColor: "#f1f5f9",
          gap: 12,
        }}
      >
        {/* Icon bubble using utility colors */}
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: 14,
            backgroundColor: utility.backgroundColor,
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Text style={{ fontSize: 22 }}>{utility.icon}</Text>
        </View>

        {/* Content */}
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <Text style={{ fontSize: 14, fontWeight: "700", color: "#0f172a" }}>
              {utility.name}
            </Text>
            <View
              style={{
                backgroundColor: isAbove ? "#fee2e2" : "#dcfce7",
                borderRadius: 20,
                paddingHorizontal: 8,
                paddingVertical: 2,
              }}
            >
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: "600",
                  color: isAbove ? "#dc2626" : "#16a34a",
                }}
              >
                {isAbove ? "Above" : "Below"}
              </Text>
            </View>
          </View>
          <Text style={{ fontSize: 13, color: "#475569" }}>
            Alert if {isAbove ? "exceeds" : "below"}{" "}
            <Text style={{ fontWeight: "700", color: "#0f172a" }}>
              ₱{alert.threshold?.toLocaleString()}
            </Text>
          </Text>
          {alert.predictionName ? (
            <Text style={{ fontSize: 11, color: "#94a3b8", marginTop: 4 }}>
              {alert.predictionName}
            </Text>
          ) : null}
        </View>

        {/* Delete */}
        <TouchableOpacity
          onPress={() => handleDeleteAlert(alert._id)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          style={{
            width: 26,
            height: 26,
            borderRadius: 13,
            backgroundColor: "#f1f5f9",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            marginTop: 2,
          }}
        >
          <Text style={{ fontSize: 11, color: "#94a3b8", fontWeight: "700" }}>✕</Text>
        </TouchableOpacity>
      </View>
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
            maxHeight: "85%",
            overflow: "hidden",
          }}
        >
          {/* ── Blue Gradient Header (mirrors web) ──────────────────────── */}
          <View
            style={{
              background: "linear-gradient(to right, #2563eb, #4f46e5)",
              backgroundColor: "#2563eb", // fallback for RN
              paddingHorizontal: 20,
              paddingTop: 22,
              paddingBottom: 18,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <Text style={{ fontSize: 19, fontWeight: "800", color: "white" }}>
                Notifications
              </Text>
              <TouchableOpacity
                onPress={onClose}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  backgroundColor: "rgba(255,255,255,0.2)",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontSize: 14, color: "white", fontWeight: "bold" }}>✕</Text>
              </TouchableOpacity>
            </View>
            <Text style={{ fontSize: 13, color: "#bfdbfe", marginTop: 4 }}>
              {unreadCount > 0 ? `${unreadCount} unread` : "All caught up!"}
            </Text>
          </View>

          {/* ── Tabs (mirrors web: Triggered / Set Alerts) ───────────────── */}
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#f8fafc",
              borderBottomWidth: 1,
              borderBottomColor: "#e2e8f0",
            }}
          >
            <TouchableOpacity
              onPress={() => setActiveTab("triggered")}
              style={{
                flex: 1,
                paddingVertical: 13,
                alignItems: "center",
                borderBottomWidth: 2,
                borderBottomColor: activeTab === "triggered" ? "#2563eb" : "transparent",
                backgroundColor: activeTab === "triggered" ? "white" : "transparent",
                flexDirection: "row",
                justifyContent: "center",
                gap: 6,
              }}
            >
              <Text style={{ fontSize: 13 }}>🔔</Text>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "600",
                  color: activeTab === "triggered" ? "#2563eb" : "#64748b",
                }}
              >
                Triggered
              </Text>
              {unreadCount > 0 && (
                <View
                  style={{
                    backgroundColor: "#ef4444",
                    borderRadius: 10,
                    paddingHorizontal: 6,
                    paddingVertical: 1,
                    minWidth: 20,
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: "white", fontSize: 10, fontWeight: "700" }}>
                    {unreadCount}
                  </Text>
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setActiveTab("alerts")}
              style={{
                flex: 1,
                paddingVertical: 13,
                alignItems: "center",
                borderBottomWidth: 2,
                borderBottomColor: activeTab === "alerts" ? "#2563eb" : "transparent",
                backgroundColor: activeTab === "alerts" ? "white" : "transparent",
                flexDirection: "row",
                justifyContent: "center",
                gap: 6,
              }}
            >
              <Text style={{ fontSize: 13 }}>⚙️</Text>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "600",
                  color: activeTab === "alerts" ? "#2563eb" : "#64748b",
                }}
              >
                Set Alerts
              </Text>
              {alerts.length > 0 && (
                <View
                  style={{
                    backgroundColor: "#94a3b8",
                    borderRadius: 10,
                    paddingHorizontal: 6,
                    paddingVertical: 1,
                    minWidth: 20,
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: "white", fontSize: 10, fontWeight: "700" }}>
                    {alerts.length}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* ── Mark All Read strip (only when triggered tab + unread) ──── */}
          {activeTab === "triggered" && unreadCount > 0 && !loading && (
            <View
              style={{
                paddingHorizontal: 16,
                paddingVertical: 8,
                backgroundColor: "#eff6ff",
                borderBottomWidth: 1,
                borderBottomColor: "#dbeafe",
                alignItems: "flex-end",
              }}
            >
              <TouchableOpacity onPress={handleMarkAllRead}>
                <Text style={{ fontSize: 12, fontWeight: "600", color: "#2563eb" }}>
                  Mark all as read
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* ── Body ────────────────────────────────────────────────────── */}
          {loading ? (
            <View style={{ paddingVertical: 56, alignItems: "center" }}>
              <ActivityIndicator color="#2563eb" size="large" />
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
                  tintColor="#2563eb"
                  colors={["#2563eb"]}
                />
              }
            >
              {activeTab === "triggered" ? (
                notifications.length === 0
                  ? renderEmpty(true)
                  : notifications.map((item) => renderNotification(item))
              ) : alerts.length === 0
                ? renderEmpty(false)
                : alerts.map((alert) => renderAlert(alert))}

              <View style={{ height: 32 }} />
            </ScrollView>
          )}

          {/* ── Footer ─────────────────────────────────────────────────── */}
          <View
            style={{
              borderTopWidth: 1,
              borderTopColor: "#e2e8f0",
              paddingVertical: 12,
              paddingHorizontal: 16,
              backgroundColor: "#f8fafc",
            }}
          >
            <Text style={{ fontSize: 11, color: "#94a3b8", textAlign: "center" }}>
              {activeTab === "triggered"
                ? "Notifications are triggered when you upload a bill"
                : "You'll be notified when bills meet alert criteria"}
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
}