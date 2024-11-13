import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';
import { useAuth } from '../../AuthContext';


jest.mock('../../AuthContext', () => ({
    useAuth: jest.fn(),
}));


const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

describe('Header', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('рендерить компонент для неаутентифікованого користувача', () => {
        useAuth.mockReturnValue({
            isAuthenticated: false,
            user: null,
            logout: jest.fn(),
        });

        render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );

        expect(screen.getByText(/PCCONFIG/i)).toBeInTheDocument();
        expect(screen.getByText(/Про нас/i)).toBeInTheDocument();
        expect(screen.getByText(/Увійти/i)).toBeInTheDocument();
        expect(screen.getByText(/Пройти тест/i)).toBeInTheDocument();
    });

    test('рендерить компонент для аутентифікованого користувача', () => {
        useAuth.mockReturnValue({
            isAuthenticated: true,
            user: { email: 'user@example.com' },
            logout: jest.fn(),
        });

        render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );

        expect(screen.getByText(/PCCONFIG/i)).toBeInTheDocument();
        expect(screen.getByText(/Про нас/i)).toBeInTheDocument();
        expect(screen.getByText(/Мій профіль \(user@example.com\)/i)).toBeInTheDocument();
        expect(screen.getByText(/Вийти/i)).toBeInTheDocument();
        expect(screen.getByText(/Пройти тест/i)).toBeInTheDocument();
    });

    test('перенаправляє на тестову сторінку для аутентифікованого користувача', () => {
        useAuth.mockReturnValue({
            isAuthenticated: true,
            user: { email: 'user@example.com' },
            logout: jest.fn(),
        });

        render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );

        fireEvent.click(screen.getByText(/Пройти тест/i));
        expect(mockNavigate).toHaveBeenCalledWith('/test');
    });

    test('перенаправляє на сторінку входу для неаутентифікованого користувача', () => {
        useAuth.mockReturnValue({
            isAuthenticated: false,
            user: null,
            logout: jest.fn(),
        });

        render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );

        fireEvent.click(screen.getByText(/Пройти тест/i));
        expect(mockNavigate).toHaveBeenCalledWith('/login');
    });

    test('перенаправляє на сторінку входу після виходу з системи', () => {
        const mockLogout = jest.fn();

        useAuth.mockReturnValue({
            isAuthenticated: true,
            user: { email: 'user@example.com' },
            logout: mockLogout,
        });

        render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );

        fireEvent.click(screen.getByText(/Вийти/i));
        expect(mockLogout).toHaveBeenCalled();
        expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
});
