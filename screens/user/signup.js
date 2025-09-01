import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    SafeAreaView,
    Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Signup() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />

            <View style={styles.content}>
                <View style={styles.logoContainer}>
                    <Image
                        source={require('./../../assets/logo.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </View>

                <View style={styles.taglineContainer}>
                    <Text style={styles.tagline}>Track, predict, and manage your future bills like never before! Log in to access your account or sign up to join the fun and start your journey.</Text>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity 
                        style={styles.loginButton}
                        onPress={() => navigation.navigate('Login')}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.loginButtonText}>Log In</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.signUpButton}
                        onPress={() => navigation.navigate('Register')}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.signUpButtonText}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 32,
    },
    logoContainer: {
        marginBottom: 32,
    },
    logoPlaceholder: {
        width: 500,
        height: 500,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    logo: {
        width: 500,
        height: 120,
    },
    logoText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#000',
        letterSpacing: 0.5,
    },
    logoSubtext: {
        fontSize: 10,
        color: '#666',
        marginTop: 2,
    },
    taglineContainer: {
        alignItems: 'center',
        marginBottom: 48,
    },
    tagline: {
        fontSize: 14,
        color: '#555',
        textAlign: 'center',
        lineHeight: 20,
        marginBottom: 2,
    },
    buttonContainer: {
        width: '100%',
        maxWidth: 300,
    },
    loginButton: {
        backgroundColor: '#000000',
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    loginButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '500',
    },
    signUpButton: {
        backgroundColor: 'transparent',
        height: 48,
        borderRadius: 24,
        borderWidth: 1.5,
        borderColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    signUpButtonText: {
        color: '#000000',
        fontSize: 16,
        fontWeight: '500',
    },
});