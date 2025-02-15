import React from 'react';
import styles from './FeaturesSection.module.css';

function FeaturesSection() {
    return (
        <section className={styles.features} id="features">
            {' '}
            <div className={styles.feature}>
                <h3>Підбір за допомогою тесту</h3>
                <p>
                    <span>Наш алгоритм створює персоналізований тест,</span>{' '}
                    <span>
                        що враховує різні аспекти, такі як цілі використання (ігри, робота, творчість) і особисті
                        уподобання.
                    </span>
                </p>
            </div>
            <div className={styles.feature}>
                <h3>Порівняння з популярними конфігураціями</h3>
                <p>
                    <span>Порівнюйте свої власні збірки з популярними конфігураціями інших користувачів</span>
                    <span>або з рекомендованими експертами. </span>
                    <span>Ви зможете переглядати статистику популярності різних конфігурацій</span>
                    <span>та отримувати ідеї для своїх власних налаштувань.</span>
                </p>
            </div>
            <div className={styles.feature}>
                <h3>Сумісність компонентів</h3>
                <p>
                    <span>Функція перевірки сумісності допоможе вам легко зібрати ваш ідеальний комп'ютер,</span>
                    <span>гарантуючи, що всі компоненти працюватимуть разом без проблем.</span>
                    <span>
                        Під час вибору компонентів, таких як материнська плата, процесор або оперативна пам'ять,
                    </span>
                    <span>наша система перевіряє їх сумісність за характеристиками.</span>
                </p>
            </div>
            <div className={styles.feature}>
                <h3>Поради щодо доступу до компонентів</h3>
                <p>
                    <span>
                        Наша функція надає корисні поради щодо догляду за кожним компонентом збірки вашого комп'ютера,
                    </span>
                    <span>щоб підтримувати їх у відмінному стані та забезпечити тривалу безперебійну роботу.</span>
                    <span>Кожна порада враховує специфіку компонентів і надає рекомендації,</span>
                    <span>які допоможуть запобігти проблемам.</span>
                </p>
            </div>
        </section>
    );
}

export default FeaturesSection;
