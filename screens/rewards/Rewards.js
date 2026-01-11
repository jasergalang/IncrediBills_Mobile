import React, { useState } from "react";
import { View, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import  {useNavigation} from '@react-navigation/native';
import RewardsHeader from "../../components/rewards/RewardsHeader";
import PointsSummary from "../../components/rewards/PointsSummary";
import Tabs from "../../components/rewards/Tabs";
import CategoryFilter from "../../components/rewards/CategoryFilter";
import FeaturedBanner from "../../components/rewards/FeaturedBanner";
import RewardGrid from "../../components/rewards/RewardGrid";
import VoucherList from "../../components/rewards/VoucherList";
import HistoryList from "../../components/rewards/HistoryList";
import RedeemModal from "../../components/rewards/RedeemModal";

export default function Rewards() {
    const [activeTab, setActiveTab] = useState("catalog");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedReward, setSelectedReward] = useState(null);
    const [redeemVisible, setRedeemVisible] = useState(false);
    const navigation = useNavigation();

    const userPoints = {
        available: 3500,
        lifetime: 1200,
        spent: 4000,
        accuracy: 92,
    };

    const activeVouchers = [
        {
            id: 1,
            code: "ECO-SAVE-2024",
            reward: "₱50 Electricity Discount",
            icon: "⚡",
            color: "amber",
            expiryDate: "Dec 15, 2024",
            status: "active",
            daysLeft: 18,
        },
        {
            id: 2,
            code: "WATER-100-NOV",
            reward: "₱100 Water Bill Discount",
            icon: "💧",
            color: "blue",
            expiryDate: "Nov 30, 2024",
            status: "active",
            daysLeft: 2,
        },
        {
            id: 3,
            code: "GCASH-200-2024",
            reward: "₱200 GCash Credit",
            icon: "💰",
            color: "emerald",
            expiryDate: "Jan 5, 2025",
            status: "active",
            daysLeft: 38,
        },
    ];

    const redemptionHistory = [
        {
            id: 1,
            reward: "₱100 E-Wallet Cash",
            icon: "💰",
            color: "emerald",
            pointsSpent: 500,
            redeemedDate: "Oct 25, 2024",
            status: "completed",
            voucherCode: "EWALLET-100-OCT25",
        },
        {
            id: 2,
            reward: "Premium Avatar Pack",
            icon: "👤",
            color: "purple",
            pointsSpent: 400,
            redeemedDate: "Oct 20, 2024",
            status: "completed",
            voucherCode: null,
        },
        {
            id: 3,
            reward: "₱50 Electricity Discount",
            icon: "⚡",
            color: "amber",
            pointsSpent: 300,
            redeemedDate: "Oct 15, 2024",
            status: "completed",
            voucherCode: "MERALCO-50-OCT15",
        },
        {
            id: 4,
            reward: "₱75 Water Bill Discount",
            icon: "💧",
            color: "blue",
            pointsSpent: 350,
            redeemedDate: "Oct 10, 2024",
            status: "pending",
            voucherCode: "WATER-75-OCT10",
        },
        {
            id: 5,
            reward: "Custom Profile Theme",
            icon: "🎨",
            color: "violet",
            pointsSpent: 450,
            redeemedDate: "Oct 5, 2024",
            status: "completed",
            voucherCode: null,
        },
    ];

    const rewards = [
        {
            id: 1,
            name: "₱100 E-Wallet Cash",
            description: "Add ₱100 to your GCash or PayMaya wallet",
            category: "vouchers",
            cost: 500,
            icon: "💰",
            color: "emerald",
            stock: 45,
            popularity: "High",
            expiryDays: 30,
            featured: true,
        },
        {
            id: 2,
            name: "₱50 Electricity Bill Discount",
            description: "Get ₱50 off your next Meralco bill payment",
            category: "discounts",
            cost: 300,
            icon: "⚡",
            color: "amber",
            stock: 120,
            popularity: "High",
            expiryDays: 60,
            featured: true,
        },
        {
            id: 3,
            name: "₱200 E-Wallet Cash",
            description: "Add ₱200 to your preferred e-wallet",
            category: "vouchers",
            cost: 900,
            icon: "💵",
            color: "emerald",
            stock: 30,
            popularity: "Medium",
            expiryDays: 30,
            featured: false,
        },
        {
            id: 4,
            name: "Premium Avatar Pack",
            description: "Unlock 10 exclusive premium avatars",
            category: "premium",
            cost: 400,
            icon: "👤",
            color: "purple",
            stock: "Unlimited",
            popularity: "Medium",
            expiryDays: null,
            featured: false,
        },
        {
            id: 5,
            name: "₱75 Water Bill Discount",
            description: "Save ₱75 on your Manila Water bill",
            category: "discounts",
            cost: 350,
            icon: "💧",
            color: "blue",
            stock: 85,
            popularity: "High",
            expiryDays: 60,
            featured: true,
        },
        {
            id: 6,
            name: "Exclusive Badge Collection",
            description: "Unlock 5 rare achievement badges",
            category: "premium",
            cost: 600,
            icon: "🎖️",
            color: "orange",
            stock: "Unlimited",
            popularity: "Low",
            expiryDays: null,
            featured: false,
        },
        {
            id: 7,
            name: "₱500 Grocery Voucher",
            description: "MetroMart or SM Supermarket voucher",
            category: "vouchers",
            cost: 2000,
            icon: "🛒",
            color: "pink",
            stock: 15,
            popularity: "High",
            expiryDays: 90,
            featured: true,
        },
        {
            id: 8,
            name: "Free Bill Payment",
            description: "One free utility bill payment (up to ₱1000)",
            category: "vouchers",
            cost: 800,
            icon: "💳",
            color: "indigo",
            stock: 50,
            popularity: "High",
            expiryDays: 45,
            featured: false,
        },
        {
            id: 9,
            name: "Custom Profile Theme",
            description: "Personalize your dashboard with premium themes",
            category: "premium",
            cost: 450,
            icon: "🎨",
            color: "violet",
            stock: "Unlimited",
            popularity: "Medium",
            expiryDays: null,
            featured: false,
        },
        {
            id: 10,
            name: "IncrediBills T-Shirt",
            description: "Official eco-warrior merchandise (Size: M/L/XL)",
            category: "physical",
            cost: 1200,
            icon: "👕",
            color: "slate",
            stock: 25,
            popularity: "Low",
            expiryDays: null,
            featured: false,
        },
        {
            id: 11,
            name: "₱100 Gas Discount",
            description: "Save ₱100 on your kitchen gas refill",
            category: "discounts",
            cost: 400,
            icon: "🔥",
            color: "orange",
            stock: 60,
            popularity: "Medium",
            expiryDays: 60,
            featured: false,
        },
        {
            id: 12,
            name: "VIP Support Access",
            description: "30 days of priority customer support",
            category: "premium",
            cost: 550,
            icon: "⭐",
            color: "amber",
            stock: "Unlimited",
            popularity: "Low",
            expiryDays: 30,
            featured: false,
        },
    ];


    const handleRedeemClick = (reward) => {
        setSelectedReward(reward);
        setRedeemVisible(true);
    };
    const handleConfirmRedeem = () => {
        if (!selectedReward) return;

        console.log("Redeemed:", selectedReward.name);

        // TODO:
        // - deduct points
        // - create voucher / history entry
        // - call backend API

        setRedeemVisible(false);
        setSelectedReward(null);
    };
    const filteredRewards = rewards.filter(
        (r) => selectedCategory === "all" || r.category === selectedCategory
    );

    return (
        <SafeAreaView className="flex-1 bg-slate-50">
            <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />

            <RewardsHeader navigation={navigation} />

            <FlatList
                data={[{ key: "content" }]}
                keyExtractor={(item) => item.key}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32 }}
                renderItem={() => (
                    <View>
                        {/* Catalog */}
                        {activeTab === "catalog" && (
                            <>
                                <FeaturedBanner />
                                <CategoryFilter
                                    selectedCategory={selectedCategory}
                                    setSelectedCategory={setSelectedCategory}
                                />
                                <RewardGrid
                                    rewards={filteredRewards}
                                    userPoints={userPoints}
                                    onRedeemClick={handleRedeemClick}
                                    scrollEnabled={false}
                                />
                            </>
                        )}

                        {/* Vouchers */}
                        {activeTab === "vouchers" && (
                            <VoucherList
                                activeVouchers={activeVouchers}
                                onBrowse={() => setActiveTab("catalog")}
                                scrollEnabled={false}
                            />
                        )}

                        {/* History */}
                        {activeTab === "history" && (
                            <HistoryList
                                redemptionHistory={redemptionHistory}
                                scrollEnabled={false}
                            />
                        )}
                    </View>
                )}
                ListHeaderComponent={
                    <View className="py-4">
                        <PointsSummary userPoints={userPoints} />
                        <Tabs
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                            vouchersCount={activeVouchers.length}
                        />
                    </View>
                }
            />

            <RedeemModal
                visible={redeemVisible}
                selectedReward={selectedReward}
                userPoints={userPoints}
                onClose={() => {
                    setRedeemVisible(false);
                    setSelectedReward(null);
                }}
                onConfirm={handleConfirmRedeem}
            />
        </SafeAreaView>
    );
}