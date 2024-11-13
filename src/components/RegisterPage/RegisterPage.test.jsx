import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RegisterPage from './RegisterPage';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { useNavigate } from 'react-router-dom';

jest.mock('firebase/auth', () => ({
    createUserWithEmailAndPassword: jest.fn(),
    signInWithEmailAndPassword: jest.fn(),
    getAuth: jest.fn(() => ({})),
}));

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

describe('RegisterPage', () => {
    const mockNavigate = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        useNavigate.mockReturnValue(mockNavigate);
    });

    test('рендерить компонент з формою реєстрації', () => {
        render(<RegisterPage />);

        expect(screen.getByText(/Реєстрація/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Пароль/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Запам'ятати мене/i)).toBeInTheDocument();
        expect(screen.getByText(/Зареєструватись/i)).toBeInTheDocument();
    });

    test('викликає createUserWithEmailAndPassword та signInWithEmailAndPassword при реєстрації', async () => {
        createUserWithEmailAndPassword.mockResolvedValueOnce({ user: { uid: 'test-uid' } });
        signInWithEmailAndPassword.mockResolvedValueOnce({ user: { uid: 'test-uid' } });

        render(<RegisterPage />);

        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText(/Пароль/i), { target: { value: 'password' } });
        fireEvent.click(screen.getByText(/Зареєструватись/i));

        await waitFor(() => {
            expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(auth, 'test@example.com', 'password');
            expect(signInWithEmailAndPassword).toHaveBeenCalledWith(auth, 'test@example.com', 'password');
            expect(mockNavigate).toHaveBeenCalledWith('/profile');
        });
    });

    test('відображає помилку при невдалій реєстрації', async () => {
        const errorMessage = 'Помилка реєстрації';
        createUserWithEmailAndPassword.mockRejectedValueOnce(new Error(errorMessage));

        render(<RegisterPage />);

        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText(/Пароль/i), { target: { value: 'password' } });
        fireEvent.click(screen.getByText(/Зареєструватись/i));

        await waitFor(() => {
            expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(auth, 'test@example.com', 'password');
            expect(screen.getByText(errorMessage)).toBeInTheDocument();
        });
    });
});
