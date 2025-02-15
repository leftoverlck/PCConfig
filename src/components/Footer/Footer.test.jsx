import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from './Footer';

describe('Footer', () => {
    test('рендерить компонент з правильним текстом', () => {
        render(<Footer />);
        
        expect(screen.getByText(/PCCONFIG/i)).toBeInTheDocument();
    });
});
