import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyC6Ai-ZWIJwQ-keNfjYVLYZiS3xR5GbOSo',
    authDomain: 'pc-config-98ac2.firebaseapp.com',
    projectId: 'pc-config-98ac2',
    storageBucket: 'pc-config-98ac2.appspot.com',
    messagingSenderId: '819959149905',
    appId: '1:819959149905:web:ebd0276fafff82611f4f70',
    measurementId: 'G-EVWR1NDFB6',
};

const app = initializeApp(firebaseConfig);
if (app) {
    console.log('Firebase ініціалізовано успішно');
} else {
    console.log('Помилка ініціалізації Firebase');
}

const database = getFirestore(app);
const auth = getAuth(app);

export { auth, database as db };
