import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import LoginPage from './LoginPage';
import { useAuth } from '../../AuthContext';


jest.mock('../../AuthContext', () => ({
    useAuth: jest.fn(),
}));

describe('LoginPage', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('рендерить компонент LoginPage з LoginForm', () => {
        useAuth.mockReturnValue({
            loginUser: jest.fn(),
            error: null,
        });

        render(
            <BrowserRouter>
                <LoginPage />
            </BrowserRouter>
        );

        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Пароль/i)).toBeInTheDocument();
        expect(screen.getByText(/Вхід/i)).toBeInTheDocument();
        expect(screen.getByText(/Реєстрація/i)).toBeInTheDocument();
    });
});
