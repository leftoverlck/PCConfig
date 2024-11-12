import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { db } from '../../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import styles from './TestPage.module.css';
import Question from '../Question/Question';
import { determineConfiguration } from '../../utils/configUtils';
import ConfigurationCard from '../ConfigurationCard/ConfigurationCard';
import { useNavigate } from 'react-router-dom';

function TestPage() {
    const [answers, setAnswers] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [testCompleted, setTestCompleted] = useState(false);
    const [configuration, setConfiguration] = useState(null);
    const [user, setUser] = useState(null);

    const auth = getAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const currentUser = auth.currentUser;
        if (currentUser) {
            setUser(currentUser);
        }
    }, [auth]);

    const questions = [
        {
            question: "1. Для яких цілей ви плануєте використовувати комп'ютер?",
            options: [
                'Ігри',
                'Офісні завдання (документи, таблиці)',
                'Навчання та програмування',
                'Робота з графікою (редагування фото/відео)',
            ],
        },
        {
            question: '2. Яку операційну систему ви віддаєте перевагу?',
            options: ['Windows', 'macOS', 'Linux', 'Іншу'],
        },
        {
            question: "3. Скільки грошей ви готові витратити на комп'ютер?",
            options: ['Менше 10 000 грн', '10 000 - 20 000 грн', '20 000 - 50 000 грн', 'Більше 50 000 грн'],
        },
        {
            question: "4. Яким чином ви будете використовувати комп'ютер?",
            options: ['Дома', 'В офісі', 'Віддалено', 'Відпочинок / розваги'],
        },
        {
            question: "5. Які особливості вам важливі в комп'ютері?",
            options: ['Швидкість', 'Тривалий термін служби', 'Мобільність', 'Ціна'],
        },
    ];

    const handleAnswer = (questionNumber, answer) => {
        const newAnswers = [...answers];
        newAnswers[questionNumber] = answer;
        setAnswers(newAnswers);
    };

    const handleNextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            const finalConfiguration = determineConfiguration(answers);
            setConfiguration(finalConfiguration);
            setTestCompleted(true);
        }
    };

    const handleAddConfiguration = async () => {
        if (user) {
            try {
                const userConfigRef = collection(db, 'user_configurations', user.uid, 'configurations');
                await addDoc(userConfigRef, {
                    configuration: configuration,
                    createdAt: new Date(),
                });
                console.log('Нова конфігурація додана до бази даних для користувача:', user.uid);
                navigate('/profile');
            } catch (error) {
                console.error('Помилка при додаванні конфігурації в базу даних:', error);
            }
        }
    };

    return (
        <div className={styles.testPage}>
            <div className={styles.testContainer}>
                {!testCompleted && (
                    <>
                        <h1 className={styles.testTitle}>
                            Ваша ідеальна конфігурація комп'ютера: знайдіть свій варіант!
                        </h1>
                        <p className={styles.testDescription}>
                            Цей тест допоможе вам визначити, які компоненти комп'ютера найкраще відповідатимуть вашим
                            потребам.
                        </p>
                    </>
                )}

                {testCompleted ? (
                    <>
                        <ConfigurationCard configuration={configuration} />
                        <button className={styles.addConfigurationButton} onClick={handleAddConfiguration}>
                            Додати конфігурацію
                        </button>
                    </>
                ) : (
                    <>
                        <Question
                            question={questions[currentQuestion].question}
                            options={questions[currentQuestion].options}
                            handleAnswer={handleAnswer}
                            questionNumber={currentQuestion}
                        />
                        <button className={styles.nextButton} onClick={handleNextQuestion}>
                            {currentQuestion < questions.length - 1 ? 'Далі' : 'Завершити'}
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default TestPage;
