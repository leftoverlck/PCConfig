import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import NewAssemblyPage from './NewAssemblyPage';
import { useAuth } from '../../AuthContext';
import { useSaveAssembly } from '../../hooks/useSaveAssembly';

jest.mock('../../AuthContext', () => ({
    useAuth: jest.fn(),
}));

jest.mock('../../hooks/useSaveAssembly', () => ({
    useSaveAssembly: jest.fn(),
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

describe('NewAssemblyPage', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('рендерить компонент з вибором компонентів', () => {
        useAuth.mockReturnValue({ user: { uid: 'test-uid' } });
        useSaveAssembly.mockReturnValue({ saveAssembly: jest.fn(), loading: false, error: null });

        render(
            <BrowserRouter>
                <NewAssemblyPage />
            </BrowserRouter>,
        );

        expect(screen.getByText(/Нова збірка/i)).toBeInTheDocument();
        expect(screen.getByText(/Процесор/i)).toBeInTheDocument();
        expect(screen.getByText(/Оперативна пам'ять/i)).toBeInTheDocument();
        expect(screen.getByText(/Відеокарта/i)).toBeInTheDocument();
        expect(screen.getByText(/Накопичувач SSD/i)).toBeInTheDocument();
        expect(screen.getByText(/Материнська плата/i)).toBeInTheDocument();
        expect(screen.getByText(/Живлення PSU/i)).toBeInTheDocument();
        expect(screen.getByText(/Зберегти збірку/i)).toBeInTheDocument();
    });

    test('перенаправляє на профіль після збереження збірки', async () => {
        const mockSaveAssembly = jest.fn().mockResolvedValueOnce({});
        useAuth.mockReturnValue({ user: { uid: 'test-uid' } });
        useSaveAssembly.mockReturnValue({ saveAssembly: mockSaveAssembly, loading: false, error: null });

        render(
            <BrowserRouter>
                <NewAssemblyPage />
            </BrowserRouter>,
        );

        fireEvent.change(screen.getByText(/Процесор/i), { target: { value: 'test-processor' } });
        fireEvent.change(screen.getByText(/Оперативна пам'ять/i), { target: { value: 'test-ram' } });
        fireEvent.change(screen.getByText(/Відеокарта/i), { target: { value: 'test-gpu' } });
        fireEvent.change(screen.getByText(/Накопичувач SSD/i), { target: { value: 'test-ssd' } });
        fireEvent.change(screen.getByText(/Материнська плата/i), { target: { value: 'test-motherboard' } });
        fireEvent.change(screen.getByText(/Живлення PSU/i), { target: { value: 'test-psu' } });

        fireEvent.click(screen.getByText(/Зберегти збірку/i));

        expect(mockSaveAssembly).toHaveBeenCalled();
        expect(mockNavigate).toHaveBeenCalledWith('/profile');
    });
});
