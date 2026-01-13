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
    useEffect(() => {
        const syncToken = async () => {
            try {
                if (token) {
                    await AsyncStorage.setItem("token", token);
                } else {
                    await AsyncStorage.removeItem("token");
                }
            } catch (error) {
                console.error("Error syncing token:", error);
            }
        };

        syncToken();
    }, [token]);
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
        }
    };
    // const login = async (userData) => {
    //     try {
    //         if (userData && userData.user && userData.user.token) {
    //             await AsyncStorage.setItem('userToken', userData.user.token);
    //             await AsyncStorage.setItem('userData', JSON.stringify(userData.user));

    //             setIsAuthenticated(true);
    //             setUser(userData.user);
    //             // console.log('User logged in:', userData.user);
    //         } else {
    //             console.error('Invalid login response:', userData);
    //         }
    //     } catch (error) {
    //         console.error('Error storing auth data:', error);
    //     }
    // };

    // const logout = async () => {
    //     try {
    //         // Remove token and user data from AsyncStorage
    //         await AsyncStorage.removeItem('userToken');
    //         await AsyncStorage.removeItem('userData');

    //         // Clear state
    //         setToken(null);
    //         setUser(null);

    //         return true;
    //     } catch (error) {
    //         console.error('Error during logout:', error);
    //         return false;
    //     }
    // };

    const login = async (loginResponse) => {
        try {
            // Handle both formats:
            // 1. { token, user: {...} }  <- from API
            // 2. { user: { token, ... } } <- legacy
            const token = loginResponse.token || loginResponse.user?.token;
            const userData = loginResponse.user || loginResponse;

            if (!token || !userData) {
                console.error('Invalid login response:', loginResponse);
                return false;
            }

            await AsyncStorage.setItem('userToken', token);
            await AsyncStorage.setItem('userData', JSON.stringify(userData));

            setToken(token);
            setUser(userData);
            setIsAuthenticated(true);
            return true;
        } catch (error) {
            console.error('Error storing auth data:', error);
            return false;
        }
    };
    const logout = async () => {
        try {
            await AsyncStorage.removeItem('userToken');
            await AsyncStorage.removeItem('userData');
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



    const updateProfile = (updatedUser) => {
        setUser(updatedUser);
    };




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