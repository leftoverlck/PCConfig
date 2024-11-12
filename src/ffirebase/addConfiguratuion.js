import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase';

const addConfigurationToDatabase = async (configuration) => {
    try {
        const docRef = await addDoc(collection(db, 'configurations'), {
            ...configuration,
            createdAt: new Date(),
        });
        console.log('Конфігурація додана до бази даних:', docRef.id);
    } catch (e) {
        console.error('Помилка при додаванні конфігурації:', e);
    }
};

export default addConfigurationToDatabase;
