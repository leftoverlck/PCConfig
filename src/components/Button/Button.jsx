import React from 'react';

import styles from './Button.css';

// const o = {a: 4, b: 5}
// 1) const a = o.a; => 4;
// 2) const { a } = o; => 4;                 const [el1, n] = [3,5,6]; // el1 => 3; n 5;

const Button = ({ children, handleClick }) => {
    return (
        <button className={styles.button} onClick={handleClick}>
            {children}
        </button>
    );
};

export default Button