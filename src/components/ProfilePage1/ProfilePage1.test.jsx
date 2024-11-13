import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProfilePage1 from './ProfilePage1';
import { useAuth } from '../../AuthContext';
import { collection, query, getDocs, doc, deleteDoc } from 'firebase/firestore';

jest.mock('../../AuthContext', () => ({
    useAuth: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
    collection: jest.fn(),
    query: jest.fn(),
    getDocs: jest.fn(),
    doc: jest.fn(),
    deleteDoc: jest.fn(),
    getFirestore: jest.fn(() => ({})), 
}));

describe('ProfilePage1', () => {
    const mockUser = { uid: 'test-uid' };

    beforeEach(() => {
        jest.clearAllMocks();
        useAuth.mockReturnValue({ user: mockUser });
    });

    test('рендерить компонент та відображає збірки користувача', async () => {
        const mockConfigurations = [
            {
                id: '1',
                processor: 'Intel i7',
                gpu: 'NVIDIA GTX 1080',
                motherboard: 'ASUS',
                psu: 'Corsair',
                ram: '16GB',
                ssd: '512GB SSD',
                processorPrice: '3000',
                gpuPrice: '7000',
                motherboardPrice: '4000',
                psuPrice: '2000',
                ramPrice: '1500',
                ssdPrice: '1000',
                totalCost: 18500,
            },
        ];
        getDocs.mockResolvedValueOnce({
            empty: false,
            docs: mockConfigurations.map((config) => ({
                id: config.id,
                data: () => ({ configuration: config }),
            })),
        });

        render(<ProfilePage1 />);

        await waitFor(() => {
            expect(screen.getByText(/Мої збірки/i)).toBeInTheDocument();
            expect(screen.getByText(/Деталі моїх збірок:/i)).toBeInTheDocument();
            expect(screen.getByText(/Збірка #1/i)).toBeInTheDocument();
            expect(screen.getByText(/Intel i7/i)).toBeInTheDocument();
            expect(screen.getByText(/NVIDIA GTX 1080/i)).toBeInTheDocument();
            expect(screen.getByText(/ASUS/i)).toBeInTheDocument();
            expect(screen.getByText(/Corsair/i)).toBeInTheDocument();
            expect(screen.getByText(/16GB/i)).toBeInTheDocument();
            expect(screen.getByText(/512GB SSD/i)).toBeInTheDocument();
            expect(screen.getByText(/18500грн/i)).toBeInTheDocument();
        });
    });

    test('відображає повідомлення, якщо збірки не знайдені', async () => {
        getDocs.mockResolvedValueOnce({ empty: true, docs: [] });

        render(<ProfilePage1 />);

        await waitFor(() => {
            expect(screen.getByText(/Збірки не знайдені/i)).toBeInTheDocument();
        });
    });

    test('видаляє збірку при натисканні кнопки Видалити', async () => {
        const mockConfigurations = [
            {
                id: '1',
                processor: 'Intel i7',
                gpu: 'NVIDIA GTX 1080',
                motherboard: 'ASUS',
                psu: 'Corsair',
                ram: '16GB',
                ssd: '512GB SSD',
                processorPrice: '3000',
                gpuPrice: '7000',
                motherboardPrice: '4000',
                psuPrice: '2000',
                ramPrice: '1500',
                ssdPrice: '1000',
                totalCost: 18500,
            },
        ];
        getDocs.mockResolvedValueOnce({
            empty: false,
            docs: mockConfigurations.map((config) => ({
                id: config.id,
                data: () => ({ configuration: config }),
            })),
        });

        render(<ProfilePage1 />);

        await waitFor(() => {
            expect(screen.getByText(/Збірка #1/i)).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText(/Видалити/i));

        await waitFor(() => {
            expect(deleteDoc).toHaveBeenCalledWith(doc({}, 'user_configurations', mockUser.uid, 'configurations', '1'));
            expect(screen.queryByText(/Збірка #1/i)).not.toBeInTheDocument();
        });
    });
});
