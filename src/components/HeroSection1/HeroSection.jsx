import React from 'react';
import styles from './HeroSection.module.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';

function HeroSection() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const handleStartButtonClick = () => {
        if (isAuthenticated) {
            navigate('/assembly');
        } else {
            navigate('/login');
        }
    };

    return (
        <section className={styles.hero}>
            <div className={styles.heroContent}>
                <h1>
                    Збірка комп'ютера без <br /> зайвих зусиль
                </h1>
                <p>Твій комп'ютер – твої правила!</p>
                <button className={styles.startButton} onClick={handleStartButtonClick}>
                    Почати збірку
                </button>
            </div>
            <div className={styles.heroBefore}></div>
        </section>
    );
}

export default HeroSection;
