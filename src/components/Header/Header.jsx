import React from 'react';

import styles from './Header.css';

export const Header = () => (
    <header className={styles.header}>
        {/*<img src="react-logo-xs.png" alt="React logo" />*/}
        <div>
            <h1>React.js</h1>
            <p>i.e., using the React library for rendering the UI</p>
        </div>
    </header>
);

// export { Header, default: Header };
export default Header;
