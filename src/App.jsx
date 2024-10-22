import Button from '@components/Button';
import Header from '@components/Header';
// import { Header as MyHeader } from '@components/Header';
// import * as React from 'react';
import React, { useState } from 'react';

import styles from './App.css';

const content = [
    [
        'React is extremely popular',
        'It makes building complex, interactive UIs a breeze',
        "It's powerful & flexible",
        'It has a very active and versatile ecosystem',
    ],
    ['Components, JSX & Props', 'State', 'Hooks (e.g., useEffect())', 'Dynamic rendering'],
    [
        'Official web page (react.dev)',
        'Next.js (Fullstack framework)',
        'React Native (build native mobile apps with React)',
    ],
];

const App = () =>  {
    const [activeContentIndex, setActiveContentIndex] = useState(0);

    // function f(activeIndex) {
    //     return function () {
    //         setActiveContentIndex(activeIndex);
    //     }
    // }

    const buttonClickHandler = (activeIndex) => () => {
        console.log(activeIndex);
        setActiveContentIndex(activeIndex);
    };

    return (
        <div className={styles.container} >
            <Header />

            <div id="tabs" className={styles.tabs}>
                <menu>
                    <Button
                        className={activeContentIndex === 0 && styles.active}
                        handleClick={buttonClickHandler(0)}
                    >
                        Why React?
                    </Button>
                    <button
                        className={activeContentIndex === 1 && styles.active}
                        onClick={() => setActiveContentIndex(1)}
                    >
                        Core Features
                    </button>
                    <button
                        className={activeContentIndex === 2 && styles.active}
                        onClick={() => setActiveContentIndex(2)}
                    >
                        Related Resources
                    </button>
                </menu>
                <div id="tab-content" className={styles['tab-content']}>
                    <ul>
                        {content[activeContentIndex].map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default App;