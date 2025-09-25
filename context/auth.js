import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
            }
        } catch (error) {
            console.error('Error checking auth status:', error);
        } finally {
            // setIsLoading(false);
        }
    };
    const login = async (userData) => {
        try {
            if (userData && userData.user && userData.user.token) {
                await AsyncStorage.setItem('userToken', userData.user.token);
                await AsyncStorage.setItem('userData', JSON.stringify(userData.user));

                setIsAuthenticated(true);
                setUser(userData.user);
                // console.log('User logged in:', userData.user);
            } else {
                console.error('Invalid login response:', userData);
            }
        } catch (error) {
            console.error('Error storing auth data:', error);
        }
    };

    // const login = async (userToken, userData) => {
    //     try {
    //         // Store token and user data in AsyncStorage
    //         await AsyncStorage.setItem('userToken', userToken);
    //         await AsyncStorage.setItem('userData', JSON.stringify(userData));

    //         // Update state
    //         setToken(userToken);
    //         setUser(userData);

    //         return true;
    //     } catch (error) {
    //         console.error('Error storing auth data:', error);
    //         return false;
    //     }
    // };

    const logout = async () => {
        try {
            // Remove token and user data from AsyncStorage
            await AsyncStorage.removeItem('userToken');
            await AsyncStorage.removeItem('userData');

            // Clear state
            setToken(null);
            setUser(null);

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

    // const isAuthenticated = () => {
    //     return token !== null && user !== null;
    // };

    const value = {
        user,
        token,
        // isLoading,
        login,
        logout,
        getToken,
        isAuthenticated,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};