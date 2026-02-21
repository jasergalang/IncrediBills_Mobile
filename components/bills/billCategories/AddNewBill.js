import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  Animated,
  Dimensions,
  StatusBar,
} from "react-native";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const BILL_TYPES = [
  {
    id: "water",
    name: "Water Bill",
    subtitle: "Manila Water, Maynilad",
    icon: "💧",
    cardBg: "#E0F2FE",
    iconBg: "#0EA5E9",
    textColor: "#0369A1",
    borderColor: "rgba(14,165,233,0.15)",
    arrowBorder: "rgba(14,165,233,0.3)",
    route: "WaterBills",
  },
  {
    id: "electricity",
    name: "Electricity Bill",
    subtitle: "Meralco, local providers",
    icon: "⚡",
    cardBg: "#FEF9C3",
    iconBg: "#F59E0B",
    textColor: "#B45309",
    borderColor: "rgba(245,158,11,0.15)",
    arrowBorder: "rgba(245,158,11,0.3)",
    route: "ElectricBills",
  },
  {
    id: "kitchenGas",
    name: "Kitchen Gas (LPG)",
    subtitle: "Ultragaz, Puregaz, Solane",
    icon: "🔥",
    cardBg: "#FFF7ED",
    iconBg: "#F97316",
    textColor: "#C2410C",
    borderColor: "rgba(249,115,22,0.15)",
    arrowBorder: "rgba(249,115,22,0.3)",
    route: "KitchenGasBills",
  },
  {
    id: "fuel",
    name: "Transport Fuel",
    subtitle: "Gas stations, fuel expenses",
    icon: "⛽",
    cardBg: "#FFF1F2",
    iconBg: "#EF4444",
    textColor: "#B91C1C",
    borderColor: "rgba(239,68,68,0.15)",
    arrowBorder: "rgba(239,68,68,0.3)",
    route: "TransportBills",
  },
  {
    id: "grocery",
    name: "Groceries",
    subtitle: "Supermarket, daily essentials",
    icon: "🛒",
    cardBg: "#F0FDF4",
    iconBg: "#22C55E",
    textColor: "#15803D",
    borderColor: "rgba(34,197,94,0.15)",
    arrowBorder: "rgba(34,197,94,0.3)",
    route: "GroceryBills",
  },
  {
    id: "miscellaneous",
    name: "Miscellaneous",
    subtitle: "Other expenses, services",
    icon: "📦",
    cardBg: "#F5F3FF",
    iconBg: "#8B5CF6",
    textColor: "#6D28D9",
    borderColor: "rgba(139,92,246,0.15)",
    arrowBorder: "rgba(139,92,246,0.3)",
    route: "MiscellaneousBills",
  },
];

export default function AddNewBill({ visible, onClose, navigation }) {
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const itemAnims = useRef(BILL_TYPES.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    if (visible) {
      itemAnims.forEach((anim) => anim.setValue(0));

      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 0,
          damping: 20,
          stiffness: 200,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start(() => {
        Animated.stagger(
          60,
          itemAnims.map((anim) =>
            Animated.spring(anim, {
              toValue: 1,
              damping: 18,
              stiffness: 250,
              useNativeDriver: true,
            })
          )
        ).start();
      });
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: SCREEN_HEIGHT,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const handleSelect = (bill) => {
    onClose();
    setTimeout(() => {
      navigation.navigate(bill.route, { category: bill });
    }, 200);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <StatusBar backgroundColor="rgba(0,0,0,0.5)" barStyle="light-content" />

      {/* Backdrop */}
      <Animated.View
        className="absolute inset-0 bg-black/50"
        style={{ opacity: fadeAnim }}
      >
        <TouchableOpacity className="flex-1" onPress={onClose} activeOpacity={1} />
      </Animated.View>

      {/* Modal Sheet */}
      <Animated.View
        className="absolute bottom-0 left-0 right-0 bg-slate-50 rounded-t-3xl overflow-hidden"
        style={{
          transform: [{ translateY: slideAnim }],
          maxHeight: SCREEN_HEIGHT * 0.88,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.15,
          shadowRadius: 20,
          elevation: 20,
        }}
      >
        {/* ── Header ── */}
        <View
          className="px-5 pt-5 pb-6 overflow-hidden"
          style={{ backgroundColor: "#6366F1" }}
        >
          {/* Decorative blobs — inline style needed for non-Tailwind values */}
          <View
            className="absolute rounded-full"
            style={{
              bottom: -30,
              left: -40,
              width: 200,
              height: 80,
              backgroundColor: "rgba(255,255,255,0.08)",
            }}
          />
          <View
            className="absolute rounded-full"
            style={{
              bottom: -20,
              right: -20,
              width: 160,
              height: 100,
              backgroundColor: "rgba(255,255,255,0.06)",
            }}
          />

          <View className="flex-row items-center gap-3">
            {/* Receipt icon */}
            <View
              className="rounded-2xl items-center justify-center"
              style={{
                width: 52,
                height: 52,
                backgroundColor: "rgba(255,255,255,0.2)",
              }}
            >
              <Text style={{ fontSize: 24 }}>🧾</Text>
            </View>

            {/* Titles */}
            <View className="flex-1">
              <Text className="text-white text-xl font-extrabold tracking-tight">
                Add New Bill
              </Text>
              <Text className="text-white/75 text-sm mt-0.5">
                Select a bill type to continue
              </Text>
            </View>

            {/* Close */}
            <TouchableOpacity
              onPress={onClose}
              className="w-9 h-9 rounded-full items-center justify-center"
              style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
            >
              <Text className="text-white text-sm font-bold">✕</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ── Bill List ── */}
        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingTop: 16,
            paddingBottom: 8,
            gap: 10,
          }}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {BILL_TYPES.map((bill, index) => (
            <Animated.View
              key={bill.id}
              style={{
                opacity: itemAnims[index],
                transform: [
                  {
                    translateY: itemAnims[index].interpolate({
                      inputRange: [0, 1],
                      outputRange: [20, 0],
                    }),
                  },
                ],
                marginBottom: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => handleSelect(bill)}
                activeOpacity={0.75}
                className="flex-row items-center rounded-2xl px-3.5 py-3.5"
                style={{
                  backgroundColor: bill.cardBg,
                  borderWidth: 1,
                  borderColor: bill.borderColor,
                  gap: 14,
                }}
              >
                {/* Icon bubble */}
                <View
                  className="rounded-xl items-center justify-center"
                  style={{
                    width: 52,
                    height: 52,
                    backgroundColor: bill.iconBg,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.12,
                    shadowRadius: 4,
                    elevation: 3,
                  }}
                >
                  <Text style={{ fontSize: 22 }}>{bill.icon}</Text>
                </View>

                {/* Name + subtitle */}
                <View className="flex-1">
                  <Text
                    className="text-sm font-bold tracking-tight"
                    style={{ color: bill.textColor }}
                  >
                    {bill.name}
                  </Text>
                  <Text className="text-xs text-slate-500 mt-0.5">
                    {bill.subtitle}
                  </Text>
                </View>

                {/* Arrow button */}
                <View
                  className="w-8 h-8 rounded-lg items-center justify-center"
                  style={{
                    borderWidth: 1.5,
                    borderColor: bill.arrowBorder,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "700",
                      color: bill.textColor,
                      lineHeight: 22,
                    }}
                  >
                    ›
                  </Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </ScrollView>

        {/* ── Footer ── */}
        <View className="py-3.5 px-5 items-center border-t border-slate-200 bg-slate-50">
          <Text className="text-xs text-slate-400 text-center">
            ⓘ Select a category to upload or enter bill details
          </Text>
        </View>
      </Animated.View>
    </Modal>
  );
}