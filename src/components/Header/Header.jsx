import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import { useAuth } from '../../AuthContext';

function Header() {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();

    const handleTestButtonClick = () => {
        if (isAuthenticated) {
            navigate('/test');
        } else {
            navigate('/login');
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className={styles.header}>
            <Link to="/" className={styles.logo}>
                PCCONFIG
            </Link>
            <nav>
                <a href="#features" className={styles.navLink}>
                    Про нас
                </a>

                {isAuthenticated ? (
                    <>
                        <Link to="/profile" className={styles.navLink}>
                            Мій профіль {user?.email ? `(${user.email})` : ''}
                        </Link>
                        <button onClick={handleLogout} className={styles.navLink}>
                            Вийти
                        </button>
                    </>
                ) : (
                    <Link to="/login" className={styles.navLink}>
                        Увійти
                    </Link>
                )}

                <button className={styles.button} onClick={handleTestButtonClick}>
                    Пройти тест
                </button>
            </nav>
        </header>
    );
}

export default Header;
