import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductInfo from './ProductInfo';
import { prices } from '../../utils/componentPrices';

jest.mock('../../utils/componentPrices', () => ({
    prices: {
        'Processor 1': [{ store: 'Store 1', price: '$200' }],
        'RAM 1': [{ store: 'Store 2', price: '$100' }],
        'GPU 1': [{ store: 'Store 3', price: '$300' }],
    },
}));

describe('ProductInfo', () => {
    const selectedComponents = {
        processor: 'Processor 1',
        ram: 'RAM 1',
        gpu: 'GPU 1',
        ssd: '',
        motherboard: '',
        psu: '',
    };

    test('рендерить компонент з вибраними компонентами та цінами', () => {
        render(<ProductInfo selectedComponents={selectedComponents} />);

        expect(screen.getByText(/Вибрані компоненти/i)).toBeInTheDocument();
        expect(screen.getAllByText(/Processor/i)[0]).toBeInTheDocument();
        expect(screen.getByText(/Processor 1/i)).toBeInTheDocument();
        expect(screen.getByText(/Store 1: \$200/i)).toBeInTheDocument();

        expect(screen.getAllByText(/Ram/i)[0]).toBeInTheDocument();
        expect(screen.getByText(/RAM 1/i)).toBeInTheDocument();
        expect(screen.getByText(/Store 2: \$100/i)).toBeInTheDocument();

        expect(screen.getAllByText(/Gpu/i)[0]).toBeInTheDocument();
        expect(screen.getByText(/GPU 1/i)).toBeInTheDocument();
        expect(screen.getByText(/Store 3: \$300/i)).toBeInTheDocument();
    });

    test('рендерить компонент з повідомленням про недоступність ціни', () => {
        const selectedComponentsWithoutPrice = {
            processor: 'Processor 2',
            ram: '',
            gpu: '',
            ssd: '',
            motherboard: '',
            psu: '',
        };

        render(<ProductInfo selectedComponents={selectedComponentsWithoutPrice} />);

        expect(screen.getAllByText(/Processor/i)[0]).toBeInTheDocument();
        expect(screen.getByText(/Processor 2/i)).toBeInTheDocument();
        expect(screen.getByText(/Ціна недоступна/i)).toBeInTheDocument();
    });
});
