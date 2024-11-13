import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App1'; // Оновлений шлях до App1
import { AuthProvider } from './AuthContext';

jest.mock('firebase/app', () => ({
    initializeApp: jest.fn(),
    getApp: jest.fn(() => ({ name: '[DEFAULT]' })),
    getApps: jest.fn(() => [{ name: '[DEFAULT]' }]),
}));

jest.mock('firebase/auth', () => ({
    getAuth: jest.fn(() => ({})), // Мокаємо getAuth
    signInWithEmailAndPassword: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
    onAuthStateChanged: jest.fn(),
}));

jest.mock('./components/Header/Header', () => () => <div>Header Mock</div>);
jest.mock('./components/Footer/Footer', () => () => <div>Footer Mock</div>);
jest.mock('./components/RegisterPage/RegisterPage', () => () => <div>RegisterPage Mock</div>);
jest.mock('./components/ProfilePage/ProfilePage', () => () => <div>ProfilePage Mock</div>);
jest.mock('./components/LoginPage/LoginPage', () => () => <div>LoginPage Mock</div>);
jest.mock('./components/TestPage/TestPage', () => () => <div>TestPage Mock</div>);
jest.mock('./components/HeroSection1/HeroSection', () => () => <div>HeroSection Mock</div>);
jest.mock('./components/FeaturesSection/FeaturesSection', () => () => <div>FeaturesSection Mock</div>);
jest.mock('./components/NewAssemblyPage/NewAssemblyPage', () => () => <div>NewAssemblyPage Mock</div>);

describe('App', () => {
    test('рендерить App компонент', () => {
        render(
            <AuthProvider>
                <App /> {/* Відсутній додатковий BrowserRouter */}
            </AuthProvider>
        );

        expect(screen.getByText(/Header Mock/i)).toBeInTheDocument();
        expect(screen.getByText(/Footer Mock/i)).toBeInTheDocument();
    });
});
