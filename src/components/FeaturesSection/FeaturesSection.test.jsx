import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FeaturesSection from './FeaturesSection';

describe('FeaturesSection', () => {
    test('рендерить компонент з усіма функціями', () => {
        render(<FeaturesSection />);

        expect(screen.getByRole('heading', { name: /Підбір за допомогою тесту/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /Порівняння з популярними конфігураціями/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /Сумісність компонентів/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /Поради щодо доступу до компонентів/i })).toBeInTheDocument();

        expect(screen.getByText(/Наш алгоритм створює персоналізований тест/i)).toBeInTheDocument();
        expect(screen.getByText(/Порівнюйте свої власні збірки з популярними конфігураціями/i)).toBeInTheDocument();
        expect(
            screen.getByText(/Функція перевірки сумісності допоможе вам легко зібрати ваш ідеальний комп'ютер/i),
        ).toBeInTheDocument();
        expect(
            screen.getByText(/Наша функція надає корисні поради щодо догляду за кожним компонентом/i),
        ).toBeInTheDocument();
    });
});
