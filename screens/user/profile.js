import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar, ScrollView, Alert } from "react-native";
import ProfileHeader from "../../components/user/profile/ProfileHeader";
import ProfileAvatarCard from "../../components/user/profile/ProfileAvatar";
import PersonalInformation from "../../components/user/profile/PersonalInformation";
import SecuritySection from "../../components/user/profile/SecuritySection";
import AccountActions from "../../components/user/profile/AccountActions";
import * as ImagePicker from "expo-image-picker";
import { useAuth } from "../../context/auth";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from "../../redux/actions/userAction";
export default function Profile({ navigation }) {
  const { logout } = useAuth();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  const { token } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  const [firstName, setFirstName] = useState(userData.firstName);
  const [lastName, setLastName] = useState(userData.lastName);
  const [email, setEmail] = useState(userData.email);
  const [username, setUsername] = useState(userData.username);
  const [profilePic, setProfilePic] = useState(userData.profilePic);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  useEffect(() => {
    if (token) dispatch(fetchUser(token));
  }, [token]);

  useEffect(() => {
    setFirstName(userData.firstName);
    setLastName(userData.lastName);
    setEmail(userData.email);
    setUsername(userData.username);
    setProfilePic(userData.profilePic);
  }, [userData]);

  const name = `${firstName} ${lastName}`.trim();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setProfilePic(result.assets[0].uri);
    }
  };

  const handleSaveProfile = async () => {
    const updatedUser = await saveProfile({ firstName, lastName, email, username, profilePic });
    if (updatedUser) Alert.alert("Success", "Profile updated!");
    setIsEditing(false);
  };

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }
    if (newPassword.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters.");
      return;
    }

    Alert.alert("Success", "Password changed successfully!");
    setShowChangePassword(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => {
          logout();
          navigation.replace("Login");
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />

      <ProfileHeader navigation={navigation} isEditing={isEditing} setIsEditing={setIsEditing} />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <ProfileAvatarCard name={name} username={username} image={profilePic} pickImage={pickImage} isEditing={isEditing} />

        <PersonalInformation
          isEditing={isEditing}
          email={email}
          setEmail={setEmail}
          username={username}
          setUsername={setUsername}
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          onSave={handleSaveProfile}
        />

        <SecuritySection
          showChangePassword={showChangePassword}
          setShowChangePassword={setShowChangePassword}
          currentPassword={currentPassword}
          setCurrentPassword={setCurrentPassword}
          newPassword={newPassword}
          setNewPassword={setNewPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          onChangePassword={handleChangePassword}
        />

        <AccountActions onLogout={handleLogout} />
      </ScrollView>
    </SafeAreaView>
  );
}
