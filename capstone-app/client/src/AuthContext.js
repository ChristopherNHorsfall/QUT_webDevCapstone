//Centralized State Management: Use instead of passing the setIsLoggedIn function down through multiple levels of components.
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

//A custom hook that retrieves authentication context values
export const useAuth = () => {
    const context = useContext(AuthContext); //give you the current value of AuthContext
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

//A component that wraps the application, providing authentication state and methods to its children.
export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(
        localStorage.getItem("token") ? true : false
    );
    const [username, setUsername] = useState(localStorage.getItem('username') || '');
    const [userLocation, setUserLocation] = useState(localStorage.getItem('userLocation') || '');

    // Available locations
    const locations = [
        'Cairns',
        'Noosa',
        'Gold Coast',
        'Whitsunday'
    ];

     // Login function
     const handleLogin = ( username) => {
        const defaultLocations = {
            'admin': 'Cairns',
            'user1': 'Noosa'
        };
        const defaultLocation = defaultLocations[username] || locations[0];

        //localStorage.setItem("token", token); // Save token to localStorage
        localStorage.setItem("username", username); // Save username to localStorage
        localStorage.setItem("userLocation", defaultLocation);
        setUsername(username);
        setUserLocation(defaultLocation);
        setIsLoggedIn(true);
        console.log('User logged in:', username, 'Default location:', defaultLocation);
    };

    // Logout function
    const handleLogout = () => {
        //localStorage.removeItem("token"); // Remove token from localStorage
        localStorage.removeItem("username"); // Remove username from localStorage
        localStorage.removeItem("userLocation");
        setIsLoggedIn(false);
        setUsername('');
        setUserLocation('');
    };   
    
    // Location change function
    const handleLocationChange = (newLocation) => {
        if (locations.includes(newLocation)) {
            localStorage.setItem("userLocation", newLocation);
            setUserLocation(newLocation);
            console.log('Location updated to:', newLocation);
        }
    };

    return (
        <AuthContext.Provider value={{ 
            isLoggedIn, 
            username,
            userLocation,
            locations, 
            handleLogin, 
            handleLogout,
            handleLocationChange 
            }}>
            {children}
        </AuthContext.Provider>
    );
};