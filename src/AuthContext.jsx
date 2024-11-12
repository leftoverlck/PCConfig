import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState(null);
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                setIsAuthenticated(true);
            } else {
                setUser(null);
                setIsAuthenticated(false);
            }
        });
        return unsubscribe;
    }, [auth]);

    const loginUser = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setError(null);
        } catch (err) {
            setError(err.message);
        }
    };

    const logout = () => {
        auth.signOut();
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, loginUser, logout, error }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext); // Хук для доступу до контексту
