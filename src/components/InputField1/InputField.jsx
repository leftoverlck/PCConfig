import React from 'react';
import styles from './InputField.module.css';

function InputField({ id, label, type, placeholder, value, onChange }) {
    return (
        <div className={styles.inputContainer}>
            <label htmlFor={id} className={styles.inputLabel}>
                {label}
            </label>
            <input
                type={type}
                id={id}
                className={styles.inputField}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    );
}

export default InputField;
