import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import { db } from '../../firebaseConfig';
import { collection, query, getDocs } from 'firebase/firestore';
import { deleteConfiguration } from '../../ffirebase/deleteConfiguration';
import styles from './ProfilePage.module.css';
import ProfilePage1 from '../ProfilePage1/ProfilePage1';

const ProfilePage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [configurations, setConfigurations] = useState([]);

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    const fetchConfigurations = async () => {
        if (user) {
            try {
                const userConfigRef = collection(db, 'user_configurations', user.uid, 'configurations');
                const q = query(userConfigRef);
                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) {
                    console.log('Конфігурації не знайдені');
                } else {
                    const configData = querySnapshot.docs.map((doc) => ({ ...doc.data().configuration, id: doc.id }));
                    const validAssemblies = configData.filter((config) => {
                        return (
                            config &&
                            config.totalPrice &&
                            config.cpu &&
                            config.gpu &&
                            config.motherboard &&
                            config.psu &&
                            config.ram &&
                            config.storage
                        );
                    });
                    setConfigurations(validAssemblies);
                }
            } catch (error) {
                console.error('Помилка при завантаженні збірок:', error);
            }
        }
    };

    useEffect(() => {
        if (user) {
            fetchConfigurations();
        }
    }, [user]);

    return (
        <div className={styles.profilePage}>
            <main className={styles.mainContent}>
                <h1 className={styles.title}>Мій профіль</h1>
                <button className={styles.newAssemblyButton} onClick={() => navigate('/assembly')}>
                    Нова збірка
                </button>

                {configurations.length > 0 ? (
                    <div className={styles.assembliesList}>
                        <h2>Мої збірки з тесту</h2>
                        {configurations.map((config, index) => (
                            <div key={config.id} className={styles.assemblyItem}>
                                <h3 className={styles.assemblyTitle}>Збірка #{index + 1}</h3>
                                <div className={styles.specs}>
                                    <p className={styles.spec}>
                                        <strong>Процесор:</strong> {config.cpu}
                                    </p>
                                    <p className={styles.spec}>
                                        <strong>Відеокарта:</strong> {config.gpu}
                                    </p>
                                    <p className={styles.spec}>
                                        <strong>Материнська плата:</strong> {config.motherboard}
                                    </p>
                                    <p className={styles.spec}>
                                        <strong>Блок живлення:</strong> {config.psu}
                                    </p>
                                    <p className={styles.spec}>
                                        <strong>Оперативна пам'ять:</strong> {config.ram}
                                    </p>
                                    <p className={styles.spec}>
                                        <strong>Сховище:</strong> {config.storage}
                                    </p>
                                </div>
                                <p className={styles.totalPrice}>
                                    <strong>Ціна: </strong>
                                    {config.totalPrice.replace(/\s/g, '').replace(/грн$/, '')} грн
                                </p>
                                <button
                                    className={styles.deleteButton}
                                    onClick={() =>
                                        deleteConfiguration(user, config.id, setConfigurations, configurations)
                                    }
                                >
                                    Видалити
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Збірки не знайдені.</p>
                )}
                <ProfilePage1 />
            </main>
        </div>
    );
};

export default ProfilePage;
