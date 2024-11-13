import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import TestPage from './TestPage';

describe('TestPage', () => {
    it('відображає перше питання тесту', () => {
        render(
            <MemoryRouter>
                <TestPage />
            </MemoryRouter>,
        );

        const question = screen.getByText("1. Для яких цілей ви плануєте використовувати комп'ютер?");

        expect(question).toBeInTheDocument();
    });
});
