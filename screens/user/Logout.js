import React from 'react'
import { View, Text, Alert, TouchableOpacity } from 'react-native'
import { useAuth } from '../../context/auth';
import { useNavigation } from '@react-navigation/native';
export default function Logout() {
    const { token, user, logout } = useAuth();
    const navigation = useNavigation();

    const handleLogout = () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'Logout',
                    onPress: () => {
                        logout();
                        navigation.navigate('Signup');
                    }
                }
            ]
        );
    };
    // 
    return (
        <View>
            <Text>User Profile Screen</Text>
            <TouchableOpacity
                // style={styles.logoutButton}
                onPress={handleLogout}
            >
                <Text>LOGOUT</Text>
            </TouchableOpacity>
        </View>
    )
}
