import React, { useEffect, useState } from 'react';
import { useAuth } from '../../AuthContext';
import { db } from '../../firebaseConfig';
import { collection, query, getDocs, doc, deleteDoc } from 'firebase/firestore';
import styles from '../ProfilePage/ProfilePage.module.css';

const ProfilePage1 = () => {
    const { user } = useAuth();
    const [configurations, setConfigurations] = useState([]);

    useEffect(() => {
        if (!user) {
            console.log('Будь ласка, увійдіть в систему!');
            return;
        }
        fetchConfigurations();
    }, [user]);

    const fetchConfigurations = async () => {
        if (user) {
            try {
                const userConfigRef = collection(db, 'user_configurations', user.uid, 'configurations');
                const q = query(userConfigRef);
                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) {
                    console.log('Збірки не знайдені');
                } else {
                    const configData = querySnapshot.docs
                        .map((doc) => {
                            const config = doc.data().configuration;

                            const totalCost =
                                parseInt(config.processorPrice) +
                                parseInt(config.gpuPrice) +
                                parseInt(config.motherboardPrice) +
                                parseInt(config.psuPrice) +
                                parseInt(config.ramPrice) +
                                parseInt(config.ssdPrice);

                            if (isNaN(totalCost)) {
                                return null;
                            }

                            return {
                                ...config,
                                id: doc.id,
                                totalCost,
                            };
                        })
                        .filter((config) => config !== null);

                    setConfigurations(configData);
                }
            } catch (error) {
                console.error('Помилка при отриманні збірок:', error);
            }
        }
    };

    const deleteConfiguration = async (configId) => {
        try {
            const configRef = doc(db, 'user_configurations', user.uid, 'configurations', configId);
            await deleteDoc(configRef);
            setConfigurations((prevConfigs) => prevConfigs.filter((config) => config.id !== configId));
            console.log('Збірку видалено');
        } catch (error) {
            console.error('Помилка при видаленні збірки:', error);
        }
    };

    return (
        <div className={styles.profilePage}>
            <main className={styles.mainContent}>
                <h1 className={styles.title}>Мої збірки</h1>

                {configurations.length > 0 ? (
                    <div className={styles.assembliesList}>
                        <h2>Деталі моїх збірок:</h2>
                        {configurations.map((config, index) => (
                            <div key={config.id} className={styles.assemblyItem}>
                                <h3 className={styles.assemblyTitle}>Збірка #{index + 1}</h3>
                                <div className={styles.specs}>
                                    <p className={styles.spec}>
                                        <strong>Процесор:</strong> {config.processor} - {config.processorPrice}грн
                                    </p>
                                    <p className={styles.spec}>
                                        <strong>Відеокарта:</strong> {config.gpu} - {config.gpuPrice}грн
                                    </p>
                                    <p className={styles.spec}>
                                        <strong>Материнська плата:</strong> {config.motherboard} -{' '}
                                        {config.motherboardPrice}грн
                                    </p>
                                    <p className={styles.spec}>
                                        <strong>Блок живлення:</strong> {config.psu} - {config.psuPrice}грн
                                    </p>
                                    <p className={styles.spec}>
                                        <strong>Оперативна пам'ять:</strong> {config.ram} - {config.ramPrice}грн
                                    </p>
                                    <p className={styles.spec}>
                                        <strong>SSD:</strong> {config.ssd} - {config.ssdPrice}грн
                                    </p>
                                </div>
                                <p className={styles.totalPrice}>
                                    <strong>Загальна ціна: </strong>
                                    {config.totalCost}грн
                                </p>

                                <button className={styles.deleteButton} onClick={() => deleteConfiguration(config.id)}>
                                    Видалити
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Збірки не знайдені.</p>
                )}
            </main>
        </div>
    );
};

export default ProfilePage1;
