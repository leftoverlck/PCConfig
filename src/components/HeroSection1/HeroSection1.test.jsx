import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import HeroSection from './HeroSection';
import { useAuth } from '../../AuthContext';

jest.mock('../../AuthContext', () => ({
    useAuth: jest.fn(),
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

describe('HeroSection', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('рендерить компонент і перевіряє наявність тексту', () => {
        useAuth.mockReturnValue({
            isAuthenticated: false,
        });

        render(
            <BrowserRouter>
                <HeroSection />
            </BrowserRouter>,
        );

        expect(screen.getByText(/Збірка комп'ютера без зайвих зусиль/i)).toBeInTheDocument();
        expect(screen.getByText(/Твій комп'ютер – твої правила!/i)).toBeInTheDocument();
        expect(screen.getByText(/Почати збірку/i)).toBeInTheDocument();
    });

    test('перенаправляє на сторінку збірки для аутентифікованого користувача', () => {
        useAuth.mockReturnValue({
            isAuthenticated: true,
        });

        render(
            <BrowserRouter>
                <HeroSection />
            </BrowserRouter>,
        );

        fireEvent.click(screen.getByText(/Почати збірку/i));
        expect(mockNavigate).toHaveBeenCalledWith('/assembly');
    });

    test('перенаправляє на сторінку входу для неаутентифікованого користувача', () => {
        useAuth.mockReturnValue({
            isAuthenticated: false,
        });

        render(
            <BrowserRouter>
                <HeroSection />
            </BrowserRouter>,
        );

        fireEvent.click(screen.getByText(/Почати збірку/i));
        expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
});
