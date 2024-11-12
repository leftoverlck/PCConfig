import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import styles from './RegisterPage.module.css';

function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError('Будь ласка, введіть email та пароль.');
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            // Авторизація одразу після реєстрації
            await signInWithEmailAndPassword(auth, email, password);
            alert('Реєстрація успішна!');
            navigate('/profile');
        } catch (err) {
            console.error('Помилка реєстрації:', err);
            setError(err.message);
        }
    };

    return (
        <div className={styles.registerPage}>
            <div className={styles.pageWrapper}>
                <div className={styles.formWrapper}>
                    <h2 className={styles.registerTitle}>Реєстрація</h2>
                    <form className={styles.registerForm} onSubmit={handleRegister}>
                        <div className={styles.inputContainer}>
                            <label htmlFor="email" className={styles.inputLabel}>
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                className={styles.inputField}
                                placeholder="Введіть ваш email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className={styles.inputContainer}>
                            <label htmlFor="password" className={styles.inputLabel}>
                                Пароль
                            </label>
                            <input
                                type="password"
                                id="password"
                                className={styles.inputField}
                                placeholder="Введіть ваш пароль"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className={styles.rememberMeContainer}>
                            <input type="checkbox" id="remember-me" className={styles.rememberMeCheckbox} />
                            <label htmlFor="remember-me" className={styles.rememberMeLabel}>
                                Запам'ятати мене
                            </label>
                        </div>
                        <button type="submit" className={styles.registerButton}>
                            Зареєструватись
                        </button>
                        {error && <p className={styles.errorMessage}>{error}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
