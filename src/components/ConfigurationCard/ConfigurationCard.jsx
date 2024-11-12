import React from 'react';
import styles from './ConfigurationCard.module.css'; // Імпортуємо стилі

const ConfigurationCard = ({ configuration }) => {
    return (
        <div className={styles.configurationCard}>
            <h2 className={styles.configurationTitle}>Ваша конфігурація</h2>
            <div className={styles.specs}>
                <p>
                    <strong>Живлення (PSU):</strong> {configuration.psu}
                </p>
                <p>
                    <strong>Оперативна пам'ять (RAM):</strong> {configuration.ram}
                </p>
                <p>
                    <strong>Відеокарта (GPU):</strong> {configuration.gpu}
                </p>
                <p>
                    <strong>Процесор (CPU):</strong> {configuration.cpu}
                </p>
                <p>
                    <strong>Тип зберігання (Storage):</strong> {configuration.storage}
                </p>
                <p>
                    <strong>Материнська плата:</strong> {configuration.motherboard}
                </p>
            </div>
            <p className={styles.totalPrice}>
                <strong>Загальна вартість:</strong> {configuration.totalPrice}{' '}
            </p>
        </div>
    );
};

export default ConfigurationCard;
