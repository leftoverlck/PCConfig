// src/utils/functions.js
import { deleteDoc, doc } from 'firebase/firestore';

import { db as database } from '../firebaseConfig';

// Функція для видалення конфігурації з Firestore
export const deleteConfiguration = async (user, configId, setConfigurations, configurations) => {
    try {
        const configReference = doc(database, 'user_configurations', user.uid, 'configurations', configId);
        await deleteDoc(configReference);
        setConfigurations(configurations.filter((config) => config.id !== configId));
        alert('Збірка видалена!');
    } catch (error) {
        console.error('Помилка видалення:', error);
        alert('Не вдалося видалити збірку.');
    }
};
