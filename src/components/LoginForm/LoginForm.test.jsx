import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import LoginForm from './LoginForm';
import { useAuth } from '../../AuthContext';


jest.mock('../../AuthContext', () => ({
    useAuth: jest.fn(),
}));


const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

describe('LoginForm', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('рендерить компонент з переданими властивостями', () => {
        useAuth.mockReturnValue({
            loginUser: jest.fn(),
            error: null,
        });

        render(
            <BrowserRouter>
                <LoginForm />
            </BrowserRouter>
        );

        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Пароль/i)).toBeInTheDocument();
        expect(screen.getByText(/Вхід/i)).toBeInTheDocument();
        expect(screen.getByText(/Реєстрація/i)).toBeInTheDocument();
    });

    test('викликає loginUser та перенаправляє на профіль при успішному вході', async () => {
        const mockLoginUser = jest.fn().mockResolvedValueOnce({});
        useAuth.mockReturnValue({
            loginUser: mockLoginUser,
            error: null,
        });

        render(
            <BrowserRouter>
                <LoginForm />
            </BrowserRouter>
        );

        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText(/Пароль/i), { target: { value: 'password' } });
        fireEvent.click(screen.getByText(/Вхід/i));

        expect(mockLoginUser).toHaveBeenCalledWith('test@example.com', 'password');
        await screen.findByText(/Реєстрація/i); 
        expect(mockNavigate).toHaveBeenCalledWith('/profile');
    });

    test('перенаправляє на сторінку реєстрації при натисканні кнопки Реєстрація', () => {
        useAuth.mockReturnValue({
            loginUser: jest.fn(),
            error: null,
        });

        render(
            <BrowserRouter>
                <LoginForm />
            </BrowserRouter>
        );

        fireEvent.click(screen.getByText(/Реєстрація/i));
        expect(mockNavigate).toHaveBeenCalledWith('/register');
    });
});
