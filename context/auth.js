import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from "@react-native-google-signin/google-signin";
const AuthContext = createContext({});

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(null);
    // const [isLoading, setIsLoading] = useState(true);

    // Check if user is already logged in on app start
    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            const storedToken = await AsyncStorage.getItem('userToken');
            const storedUser = await AsyncStorage.getItem('userData');

            if (storedToken && storedUser) {
                setToken(storedToken);
                setUser(JSON.parse(storedUser));
                setIsAuthenticated(true);
            }
        } catch (error) {
            console.error('Error checking auth status:', error);
        } finally {
            // setIsLoading(false);
        }
    };
    const login = async (userData) => {
        try {
            // Normalize different backend responses. Common shapes:
            // 1) { user: { token, ... } }
            // 2) { token, user: { ... } }
            // 3) { token, ...userFields } (user object returned at root)
            let tokenValue = null;
            let userObj = null;

            if (userData?.user) {
                userObj = userData.user;
                tokenValue = userData.user.token ?? userData.token ?? null;
            } else {
                // treat root as user object or token response
                tokenValue = userData?.token ?? userData?.accessToken ?? null;
                // if user fields are at root, use them as userObj
                userObj = (userData && typeof userData === 'object') ? { ...userData } : null;
                // if userObj accidentally contains token at root, remove it from stored user object
                if (userObj && tokenValue && userObj.token && userObj.token !== tokenValue) {
                    // leave as-is; no-op
                }
            }

            // fallback: if token is on userObj
            if (!tokenValue && userObj?.token) tokenValue = userObj.token;

            if (tokenValue && userObj) {
                await AsyncStorage.setItem('userToken', tokenValue);
                await AsyncStorage.setItem('userData', JSON.stringify(userObj));

                setToken(tokenValue);
                setUser(userObj);
                setIsAuthenticated(true);
            } else {
                console.error('Invalid login response (missing token or user):', userData);
            }
        } catch (error) {
            console.error('Error storing auth data:', error);
        }
    };

    const logout = async () => {
        try {

            try {
            await GoogleSignin.signOut();
                } catch (e) {
                    // Ignore errors here (e.g., if user wasn't signed in with Google)
                    console.log("Google signout error (non-fatal):", e);
                }

            // Remove token and user data from AsyncStorage
            await AsyncStorage.removeItem('userToken');
            await AsyncStorage.removeItem('userData');

            // Clear state
            setToken(null);
            setUser(null);
            setIsAuthenticated(false);

            return true;
        } catch (error) {
            console.error('Error during logout:', error);
            return false;
        }
    };

    const getToken = async () => {
        try {
            return await AsyncStorage.getItem('userToken');
        } catch (error) {
            console.error('Error getting token:', error);
            return null;
        }
    };


<<<<<<< HEAD
<<<<<<< Updated upstream
=======
=======
>>>>>>> ab46273d0e7e6ca4d0f15d5b9ca4bdadc01a9bda

    const updateProfile = (updatedUser) => {
        setUser(updatedUser);
    };


<<<<<<< HEAD
>>>>>>> Stashed changes
=======


>>>>>>> ab46273d0e7e6ca4d0f15d5b9ca4bdadc01a9bda
    const value = {
        user,
        token,
        // isLoading,
        login,
        logout,
        getToken,
        isAuthenticated,
        updateProfile
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};