import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Question from './Question';

describe('Question', () => {
    const questionProps = {
        question: 'Яке улюблене кольор?',
        options: ['Червоний', 'Зелений', 'Синій'],
        handleAnswer: jest.fn(),
        questionNumber: 1,
    };

    test('рендерить компонент з питанням та варіантами відповіді', () => {
        render(<Question {...questionProps} />);

        expect(screen.getByText(/Яке улюблене кольор?/i)).toBeInTheDocument();
        questionProps.options.forEach(option => {
            expect(screen.getByLabelText(option)).toBeInTheDocument();
        });
    });

    test('викликає handleAnswer при зміні відповіді', () => {
        render(<Question {...questionProps} />);

        fireEvent.click(screen.getByLabelText(/Червоний/i));
        expect(questionProps.handleAnswer).toHaveBeenCalledWith(1, 'Червоний');

        fireEvent.click(screen.getByLabelText(/Зелений/i));
        expect(questionProps.handleAnswer).toHaveBeenCalledWith(1, 'Зелений');
    });

    test('відзначає вибраний варіант відповіді', () => {
        render(<Question {...questionProps} />);

        fireEvent.click(screen.getByLabelText(/Синій/i));
        expect(screen.getByLabelText(/Синій/i)).toBeChecked();
    });
});
