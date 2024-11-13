import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ConfigurationCard from './ConfigurationCard';

describe('ConfigurationCard', () => {
    const mockConfiguration = {
        psu: '750W',
        ram: '16GB',
        gpu: 'NVIDIA RTX 3080',
        cpu: 'Intel i9-11900K',
        storage: '1TB SSD',
        motherboard: 'ASUS ROG Strix Z590-E',
        totalPrice: '2500$',
    };

    test('renders the component with given configuration', () => {
        render(<ConfigurationCard configuration={mockConfiguration} />);
        
        expect(screen.getByRole('heading', { name: /Ваша конфігурація/i })).toBeInTheDocument();
        expect(screen.getByText(/750W/i)).toBeInTheDocument();
        expect(screen.getByText(/16GB/i)).toBeInTheDocument();
        expect(screen.getByText(/NVIDIA RTX 3080/i)).toBeInTheDocument();
        expect(screen.getByText(/Intel i9-11900K/i)).toBeInTheDocument();
        expect(screen.getByText(/1TB SSD/i)).toBeInTheDocument();
        expect(screen.getByText(/ASUS ROG Strix Z590-E/i)).toBeInTheDocument();
        expect(screen.getByText(/2500\$/i)).toBeInTheDocument();
    });
});
