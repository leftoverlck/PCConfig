import React, { useState } from 'react';
import InputField from '../InputField1/InputField';
import styles from './LoginForm.module.css';
import { useAuth } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { loginUser, error } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            alert('Будь ласка, введіть email та пароль.');
            return;
        }

        try {
            await loginUser(email, password);
            navigate('/profile');
        } catch (err) {
            alert('Не вдалося увійти: ' + err);
        }
    };

    return (
        <form className={styles.loginForm} onSubmit={handleLogin}>
            <InputField
                id="email"
                label="Email"
                type="email"
                placeholder="Введіть ваш email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <InputField
                id="password"
                label="Пароль"
                type="password"
                placeholder="Введіть ваш пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className={styles.loginButton}>
                Вхід
            </button>
            {error && <p className={styles.errorMessage}>{error}</p>}

            <div className={styles.registerButtonContainer}>
                <button type="button" className={styles.registerButton} onClick={() => navigate('/register')}>
                    Реєстрація
                </button>
            </div>
        </form>
    );
}

export default LoginForm;
