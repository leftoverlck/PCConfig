import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { useEffect, useState } from 'react';

import { auth } from '../firebaseConfig';

const useAuth = () => {
    const [error, setError] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setIsAuthenticated(true);
                setUser(currentUser);
            } else {
                setIsAuthenticated(false);
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    const registerUser = async (email, password) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert('Реєстрація успішна!');
        } catch (error_) {
            setError(error_.message);
        }
    };

    const loginUser = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert('Вхід успішний!');
        } catch (error_) {
            setError(error_.message);
        }
    };

    const logoutUser = async () => {
        try {
            await auth.signOut();
            alert('Вихід успішний!');
        } catch (error_) {
            setError(error_.message);
        }
    };

    return { registerUser, loginUser, logoutUser, error, isAuthenticated, user };
};

export default useAuth;
