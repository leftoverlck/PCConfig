import React, { useState } from 'react';
import styles from './Question.module.css';

function Question({ question, options, handleAnswer, questionNumber }) {
    const [selectedAnswer, setSelectedAnswer] = useState('');

    const handleOptionChange = (e) => {
        setSelectedAnswer(e.target.value);
        handleAnswer(questionNumber, e.target.value);
    };

    return (
        <div className={styles.questionSection}>
            <h2 className={styles.questionTitle}>{question}</h2>
            <div className={styles.options}>
                {options.map((option, index) => (
                    <label key={index} className={styles.option}>
                        <input
                            type="radio"
                            name={`question-${questionNumber}`}
                            value={option}
                            checked={selectedAnswer === option}
                            onChange={handleOptionChange}
                        />
                        <span>{option}</span>
                    </label>
                ))}
            </div>
        </div>
    );
}

export default Question;
