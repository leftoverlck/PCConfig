import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import InputField from './InputField';

describe('InputField', () => {
    const mockOnChange = jest.fn();
    const defaultProps = {
        id: 'test-input',
        label: 'Test Label',
        type: 'text',
        placeholder: 'Enter text',
        value: 'test value',
        onChange: mockOnChange,
    };

    test('рендерить компонент з переданими властивостями', () => {
        render(<InputField {...defaultProps} />);

        expect(screen.getByLabelText(/Test Label/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Enter text/i)).toBeInTheDocument();
        expect(screen.getByDisplayValue(/test value/i)).toBeInTheDocument();
    });

    test('викликає onChange при зміні значення', () => {
        render(<InputField {...defaultProps} />);

        fireEvent.change(screen.getByPlaceholderText(/Enter text/i), {
            target: { value: 'new value' }
        });

        expect(mockOnChange).toHaveBeenCalledTimes(1);
    });
});
