import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    Alert,
    Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import baseURL from '../../assets/common/baseUrl';

export default function Register() {
    const navigation = useNavigation();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [profilePic, setProfilePic] = useState(null);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const showImagePickerOptions = () => {
        Alert.alert(
            "Select Profile Picture",
            "Choose an option",
            [
                { text: "Camera", onPress: takePhoto },
                { text: "Gallery", onPress: pickImage },
                { text: "Cancel", style: "cancel" }
            ]
        );
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setProfilePic(result.assets[0].uri);
        }
    };

    const takePhoto = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();

        if (status === "granted") {
            let result = await ImagePicker.launchCameraAsync({
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.canceled) {
                setProfilePic(result.assets[0].uri);
            }
        }
    };

    const handleRegister = async () => {
        if (email === "" || firstName === "" || lastName === "" || password === "") {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Please fill in the form correctly',
            });
            return;
        }

        if (password !== confirmPassword) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Passwords do not match',
            });
            return;
        }

        const formData = new FormData();

        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('email', email);
        formData.append('password', password);

        if (profilePic) {
            const filename = profilePic.split('/').pop();
            const match = /\.(\w+)$/.exec(filename ?? '');
            const type = match ? `profilePic/${match[1]}` : `profilePic`;

            formData.append('profilePic', {
                uri: profilePic,
                name: filename,
                type,
            });
        }

        try {
            const res = await fetch(`${baseURL}/api/user/register`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const data = await res.json();

            if (res.ok) {
                Toast.show({
                    type: 'success',
                    text1: 'Success',
                    text2: data.message || 'Registration successful!',
                });
                setTimeout(() => {
                    navigation.navigate('Login');
                }, 1500);

            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: data.message || 'Something went wrong.',
                });
            }
        } catch (error) {
            console.error(error);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Network error or server not reachable.',
            });
        }
    };

    const handleBack = () => {
        navigation.navigate('Signup');
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
            
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Create new account</Text>
            </View>

            <View style={styles.profileSection}>
                <TouchableOpacity onPress={showImagePickerOptions} style={styles.profileIconContainer}>
                    <View style={styles.profileIcon}>
                        {profilePic ? (
                            <Image source={{ uri: profilePic }} style={styles.profileImage} />
                        ) : (
                            <Ionicons name="person" size={40} color="#000" />
                        )}
                    </View>
                    <View style={styles.editIconContainer}>
                        <Ionicons name="pencil" size={12} color="#fff" />
                    </View>
                </TouchableOpacity>
            </View>

            {/* Form */}
            <View style={styles.formContainer}>
                <View style={styles.nameRow}>
                    <View style={styles.nameInputContainer}>
                        <TextInput
                            style={styles.nameInput}
                            placeholder="First Name"
                            value={firstName}
                            onChangeText={setFirstName}
                            placeholderTextColor="#666"
                        />
                    </View>
                    <View style={styles.nameInputContainer}>
                        <TextInput
                            style={styles.nameInput}
                            placeholder="Last name"
                            value={lastName}
                            onChangeText={setLastName}
                            placeholderTextColor="#666"
                        />
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        placeholderTextColor="#666"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.passwordInput}
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
                        placeholderTextColor="#666"
                    />
                    <TouchableOpacity
                        style={styles.eyeIcon}
                        onPress={togglePasswordVisibility}
                    >
                        <Ionicons
                            name={showPassword ? "eye" : "eye-off"}
                            size={20}
                            color="#666"
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.passwordInput}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry={!showConfirmPassword}
                        placeholderTextColor="#666"
                    />
                    <TouchableOpacity
                        style={styles.eyeIcon}
                        onPress={toggleConfirmPasswordVisibility}
                    >
                        <Ionicons
                            name={showConfirmPassword ? "eye" : "eye-off"}
                            size={20}
                            color="#666"
                        />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={handleRegister} style={styles.signUpButton} >
                    <Text style={styles.signUpButtonText}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#f5f5f5',
    },
    backButton: {
        marginRight: 15,
        padding: 5,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
    },
    profileSection: {
        alignItems: 'center',
        paddingVertical: 30,
    },
    profileIconContainer: {
        position: 'relative',
    },
    profileIcon: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    profileImage: {
        width: '100%',
        height: '100%',
        borderRadius: 40,
    },
    editIconContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    formContainer: {
        paddingHorizontal: 20,
        flex: 1,
    },
    nameRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    nameInputContainer: {
        flex: 1,
        marginHorizontal: 2,
    },
    nameInput: {
        backgroundColor: '#fff',
        borderRadius: 25,
        paddingHorizontal: 20,
        paddingVertical: 15,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    inputContainer: {
        marginBottom: 15,
        position: 'relative',
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 25,
        paddingHorizontal: 20,
        paddingVertical: 15,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    passwordInput: {
        backgroundColor: '#fff',
        borderRadius: 25,
        paddingHorizontal: 20,
        paddingVertical: 15,
        paddingRight: 50,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    eyeIcon: {
        position: 'absolute',
        right: 20,
        top: '50%',
        transform: [{ translateY: -10 }],
    },
    signUpButton: {
        backgroundColor: '#000',
        borderRadius: 25,
        paddingVertical: 15,
        alignItems: 'center',
        marginTop: 20,
    },
    signUpButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});