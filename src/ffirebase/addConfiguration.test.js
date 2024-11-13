// Файл: addConfiguratuion.test.js
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import addConfiguratuion from './addConfiguratuion';

jest.mock('firebase/firestore', () => ({
    collection: jest.fn(),
    addDoc: jest.fn(),
}));

jest.mock('../firebaseConfig', () => ({
    db: {},
}));

describe('addConfiguratuion', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

   

    test('обробляє помилки при додаванні конфігурації', async () => {
        const mockConfiguration = {
            cpu: 'Intel i7',
            gpu: 'NVIDIA GTX 1080',
            motherboard: 'ASUS',
            psu: 'Corsair',
            ram: '16GB',
            storage: '512GB SSD',
            totalPrice: '3000 грн',
        };
        
        const mockError = new Error('Помилка при додаванні конфігурації');
        addDoc.mockRejectedValueOnce(mockError);

        console.error = jest.fn();
        await addConfiguratuion(mockConfiguration);
        expect(console.error).toHaveBeenCalledWith('Помилка при додаванні конфігурації:', mockError);
    });
});
