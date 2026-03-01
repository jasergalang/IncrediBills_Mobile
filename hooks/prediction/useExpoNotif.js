// hooks/useExpoNotifications.js
// Mobile equivalent of web's useFirebaseNotifications hook
// Uses expo-notifications instead of Firebase JS SDK

import { useEffect, useRef, useState } from "react";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";
import { Platform } from "react-native";
import axios from "axios";

// Reads BASE_IP from app.json → extra.BASE_IP (same pattern your app already uses)
const BASE_IP = Constants.expoConfig?.extra?.BASE_IP || "localhost";
const API_URL = `http://${BASE_IP}:3000`;

// EAS project ID from app.json → extra.eas.projectId
const EAS_PROJECT_ID = Constants.expoConfig?.extra?.eas?.projectId;

// ─── Configure how notifications appear when app is in foreground ───────────
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export const useExpoNotifications = (authToken) => {
  const [expoPushToken, setExpoPushToken] = useState(null);
  const [permissionStatus, setPermissionStatus] = useState(null); // 'granted' | 'denied' | 'undetermined'
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const notificationListener = useRef();
  const responseListener = useRef();
  const hasInitialized = useRef(false);

  // ─── On mount: request permission + register token ───────────────────────
  useEffect(() => {
    if (hasInitialized.current || !authToken) return;
    hasInitialized.current = true;

    registerForPushNotificationsAsync();
    fetchUnreadCount();

    // Foreground notification listener (app is open)
    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("📨 Foreground notification received:", notification);
        // Bump badge count immediately when a notif arrives
        setUnreadCount((prev) => prev + 1);
      }
    );

    // Tap listener (user tapped the notification)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log("👆 Notification tapped:", response);
        // Optionally navigate to a screen here
      }
    );

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [authToken]);

  // ─── Request permission and get Expo push token ──────────────────────────
  const registerForPushNotificationsAsync = async () => {
    try {
      setLoading(true);

      // Push notifications only work on physical devices
      if (!Device.isDevice) {
        console.warn("⚠️ Push notifications require a physical device");
        setPermissionStatus("unavailable");
        return;
      }

      // Check existing permission
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      // Request if not yet granted
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      setPermissionStatus(finalStatus);
      console.log("🔔 Notification permission:", finalStatus);

      if (finalStatus !== "granted") {
        console.warn("⚠️ Notification permission denied");
        return;
      }

      // Android needs a notification channel
      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
          name: "Default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#f97316", // orange to match your theme
        });
      }

      // Get the Expo push token
      const tokenData = await Notifications.getExpoPushTokenAsync({
        projectId: EAS_PROJECT_ID,
      });

      const token = tokenData.data;
      console.log("📱 Expo Push Token:", token.substring(0, 40) + "...");
      setExpoPushToken(token);

      // Register token with your backend (same endpoint as web)
      if (authToken) {
        await axios.post(
          `${API_URL}/api/alerts/register-token`,
          { pushToken: token },
          { headers: { Authorization: `Bearer ${authToken}` } }
        );
        console.log("✅ Push token registered with backend");
      }
    } catch (error) {
      console.error("❌ Error registering for push notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  // ─── Fetch unread count from backend ─────────────────────────────────────
  const fetchUnreadCount = async () => {
    if (!authToken) return;
    try {
      const { data } = await axios.get(
        `${API_URL}/api/alerts/notifications/history`,
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      setUnreadCount(data.unreadCount || 0);

      // Sync the OS badge number
      await Notifications.setBadgeCountAsync(data.unreadCount || 0);
    } catch (error) {
      console.error("❌ Error fetching unread count:", error);
    }
  };

  // ─── Mark all as read + clear badge ──────────────────────────────────────
  const markAllRead = async () => {
    if (!authToken) return;
    try {
      await axios.patch(
        `${API_URL}/api/alerts/notifications/mark-all-read`,
        {},
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      setUnreadCount(0);
      await Notifications.setBadgeCountAsync(0);
    } catch (error) {
      console.error("❌ Error marking notifications read:", error);
    }
  };

  return {
    expoPushToken,
    permissionStatus,
    unreadCount,
    loading,
    fetchUnreadCount,
    markAllRead,
    registerForPushNotificationsAsync,
  };
};