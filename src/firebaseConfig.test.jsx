// Файл: firebaseConfig.test.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { auth, db } from './firebaseConfig';

jest.mock('firebase/app', () => ({
    initializeApp: jest.fn(() => ({ name: 'mocked-app' })),
}));

jest.mock('firebase/auth', () => ({
    getAuth: jest.fn(() => ({ name: 'mocked-auth' })),
}));

jest.mock('firebase/firestore', () => ({
    getFirestore: jest.fn(() => ({ name: 'mocked-firestore' })),
}));

describe('firebaseConfig', () => {
    test('ініціалізує Firebase і отримує сервіси', () => {
        expect(initializeApp).toHaveBeenCalledWith({
            apiKey: 'AIzaSyC6Ai-ZWIJwQ-keNfjYVLYZiS3xR5GbOSo',
            authDomain: 'pc-config-98ac2.firebaseapp.com',
            projectId: 'pc-config-98ac2',
            storageBucket: 'pc-config-98ac2.appspot.com',
            messagingSenderId: '819959149905',
            appId: '1:819959149905:web:ebd0276fafff82611f4f70',
            measurementId: 'G-EVWR1NDFB6',
        });

        expect(getAuth).toHaveBeenCalled();
        expect(getFirestore).toHaveBeenCalled();
        expect(auth).toEqual({ name: 'mocked-auth' });
        expect(db).toEqual({ name: 'mocked-firestore' });
    });
});
