
import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import { useDispatch } from "react-redux";
export default function PersonalInformation({ profile, setProfile }) {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        setLoading(true);

        try {
            // Dispatch Redux action to update user profile
            // await dispatch(updateUserProfile({
            //     firstName: profile.firstName,
            //     lastName: profile.lastName,
            //     email: profile.email,
            //     phoneNumber: profile.phoneNumber,
            //     address: profile.address,
            // }));

            // Simulate API call for now
            setTimeout(() => {
                setLoading(false);
                Alert.alert("Success", "Your profile has been updated successfully.");
            }, 1000);
        } catch (error) {
            setLoading(false);
            Alert.alert("Error", "Failed to update profile. Please try again.");
        }
    };

    const handleCancel = () => {
        // Reset to original values from Redux store
        Alert.alert(
            "Cancel Changes",
            "Are you sure you want to discard your changes?",
            [
                { text: "No", style: "cancel" },
                {
                    text: "Yes", onPress: () => {
                        // Reset will happen via useEffect when user data is fetched again
                        Alert.alert("Info", "Changes discarded");
                    }
                },
            ]
        );
    };

    //     return (
    //         <View className="bg-white rounded-2xl border border-slate-200 p-6">
    //             <Text className="text-lg font-bold text-slate-900 mb-6">
    //                 Personal Information
    //             </Text>

    //             <View className="space-y-5">
    //                 {/* First Name */}
    //                 <View>
    //                     <Text className="text-sm font-semibold text-slate-700 mb-2">
    //                         First Name
    //                     </Text>
    //                     <TextInput
    //                         value={profile?.firstName || ""}
    //                         onChangeText={(text) =>
    //                             setProfile({ ...profile, firstName: text })
    //                         }
    //                         className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900"
    //                         placeholder="Enter your first name"
    //                         placeholderTextColor="#94a3b8"
    //                     />
    //                 </View>

    //                 {/* Last Name */}
    //                 <View>
    //                     <Text className="text-sm font-semibold text-slate-700 mb-2">
    //                         Last Name
    //                     </Text>
    //                     <TextInput
    //                         value={profile?.lastName || ""}
    //                         onChangeText={(text) =>
    //                             setProfile({ ...profile, lastName: text })
    //                         }
    //                         className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900"
    //                         placeholder="Enter your last name"
    //                         placeholderTextColor="#94a3b8"
    //                     />
    //                 </View>

    //                 {/* Email */}
    //                 <View>
    //                     <Text className="text-sm font-semibold text-slate-700 mb-2">
    //                         Email Address
    //                     </Text>
    //                     <TextInput
    //                         value={profile?.email || ""}
    //                         onChangeText={(text) =>
    //                             setProfile({ ...profile, email: text })
    //                         }
    //                         className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900"
    //                         placeholder="Enter your email"
    //                         placeholderTextColor="#94a3b8"
    //                         keyboardType="email-address"
    //                         autoCapitalize="none"
    //                     />
    //                 </View>

    //                 {/* Phone */}
    //                 <View>
    //                     <Text className="text-sm font-semibold text-slate-700 mb-2">
    //                         Phone Number
    //                     </Text>
    //                     <TextInput
    //                         value={profile?.phoneNumber || ""}
    //                         onChangeText={(text) =>
    //                             setProfile({ ...profile, phoneNumber: text })
    //                         }
    //                         className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900"
    //                         placeholder="Enter your phone number"
    //                         placeholderTextColor="#94a3b8"
    //                         keyboardType="phone-pad"
    //                     />
    //                 </View>

    //                 {/* Address */}
    //                 <View>
    //                     <Text className="text-sm font-semibold text-slate-700 mb-2">
    //                         Address
    //                     </Text>
    //                     <TextInput
    //                         value={profile?.address || ""}
    //                         onChangeText={(text) =>
    //                             setProfile({ ...profile, address: text })
    //                         }
    //                         className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900"
    //                         placeholder="Enter your address"
    //                         placeholderTextColor="#94a3b8"
    //                         multiline
    //                         numberOfLines={3}
    //                     />
    //                 </View>
    //             </View>

    //             {/* Action Buttons */}
    //             <View className="flex-row gap-3 mt-6">
    //                 <TouchableOpacity
    //                     onPress={handleSave}
    //                     disabled={loading}
    //                     className="flex-1 px-6 py-3 bg-blue-600 rounded-xl items-center"
    //                 >
    //                     <Text className="text-white font-semibold">
    //                         {loading ? "💾 Saving..." : "💾 Save Changes"}
    //                     </Text>
    //                 </TouchableOpacity>

    //                 <TouchableOpacity
    //                     disabled={loading}
    //                     className="px-6 py-3 bg-slate-100 rounded-xl items-center"
    //                 >
    //                     <Text className="text-slate-700 font-semibold">Cancel</Text>
    //                 </TouchableOpacity>
    //             </View>
    //         </View>
    //     );
    // }
    return (
        <View className="bg-white rounded-2xl border border-slate-200 p-6">
            <Text className="text-lg font-bold text-slate-900 mb-6">
                Personal Information
            </Text>

            <View className="space-y-5">
                {/* First Name */}
                <View>
                    <Text className="text-sm font-semibold text-slate-700 mb-2">
                        First Name
                    </Text>
                    <TextInput
                        value={profile?.firstName || ""}
                        onChangeText={(text) =>
                            setProfile({ ...profile, firstName: text })
                        }
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900"
                        placeholder="Enter your first name"
                        placeholderTextColor="#94a3b8"
                    />
                </View>

                {/* Last Name */}
                <View>
                    <Text className="text-sm font-semibold text-slate-700 mb-2">
                        Last Name
                    </Text>
                    <TextInput
                        value={profile?.lastName || ""}
                        onChangeText={(text) =>
                            setProfile({ ...profile, lastName: text })
                        }
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900"
                        placeholder="Enter your last name"
                        placeholderTextColor="#94a3b8"
                    />
                </View>

                {/* Email */}
                <View>
                    <Text className="text-sm font-semibold text-slate-700 mb-2">
                        Email Address
                    </Text>
                    <TextInput
                        value={profile?.email || ""}
                        onChangeText={(text) =>
                            setProfile({ ...profile, email: text })
                        }
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900"
                        placeholder="Enter your email"
                        placeholderTextColor="#94a3b8"
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>

                {/* Phone */}
                <View>
                    <Text className="text-sm font-semibold text-slate-700 mb-2">
                        Phone Number
                    </Text>
                    <TextInput
                        value={profile?.phoneNumber || ""}
                        onChangeText={(text) =>
                            setProfile({ ...profile, phoneNumber: text })
                        }
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900"
                        placeholder="Enter your phone number"
                        placeholderTextColor="#94a3b8"
                        keyboardType="phone-pad"
                    />
                </View>

                {/* Address */}
                <View>
                    <Text className="text-sm font-semibold text-slate-700 mb-2">
                        Address
                    </Text>
                    <TextInput
                        value={profile?.address || ""}
                        onChangeText={(text) =>
                            setProfile({ ...profile, address: text })
                        }
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900"
                        placeholder="Enter your address"
                        placeholderTextColor="#94a3b8"
                        multiline
                        numberOfLines={3}
                    />
                </View>
            </View>

            {/* Action Buttons */}
            <View className="flex-row gap-3 mt-6">
                <TouchableOpacity
                    onPress={handleSave}
                    disabled={loading}
                    className={`flex-1 px-6 py-3 rounded-xl items-center ${loading ? "bg-blue-400" : "bg-blue-600"
                        }`}
                >
                    <Text className="text-white font-semibold">
                        {loading ? "💾 Saving..." : "💾 Save Changes"}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={handleCancel}
                    disabled={loading}
                    className={`px-6 py-3 rounded-xl items-center ${loading ? "bg-slate-50" : "bg-slate-100"
                        }`}
                >
                    <Text className="text-slate-700 font-semibold">Cancel</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}