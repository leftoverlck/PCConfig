import React from 'react';
import styles from './ProductInfo.module.css';
import { prices } from '../../utils/componentPrices';

const ProductInfo = ({ selectedComponents }) => {
    return (
        <div className={styles.productInfo}>
            <h2>Вибрані компоненти:</h2>
            <div className={styles.selectedComponents}>
                {Object.entries(selectedComponents).map(
                    ([componentName, componentValue]) =>
                        componentValue && (
                            <div className={styles.component} key={componentName}>
                                <h3>{componentName.charAt(0).toUpperCase() + componentName.slice(1)}</h3>
                                <p>{componentValue}</p>
                                {prices[componentValue] ? (
                                    prices[componentValue].map((price, index) => (
                                        <p className={styles.price} key={index}>
                                            {price.store}: {price.price}
                                        </p>
                                    ))
                                ) : (
                                    <p className={styles.noPrice}>Ціна недоступна</p>
                                )}
                            </div>
                        ),
                )}
            </div>
        </div>
    );
};

export default ProductInfo;
