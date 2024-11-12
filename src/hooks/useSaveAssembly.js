import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';

import { db as database } from '../firebaseConfig';

export const useSaveAssembly = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const saveAssembly = async (userId, assemblyData) => {
        setLoading(true);
        try {
            const configReference = collection(database, 'user_configurations', userId, 'configurations');
            await addDoc(configReference, {
                configuration: assemblyData,
                createdAt: new Date(),
            });
            setLoading(false);
            console.log('Збірка успішно збережена!');
        } catch (error_) {
            setError(error_.message);
            setLoading(false);
            console.error('Помилка при збереженні збірки:', error_);
        }
    };

    return { saveAssembly, loading, error };
};
