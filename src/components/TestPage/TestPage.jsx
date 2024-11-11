// TestPage.js
import React, { useState } from "react";
import Question from "../Question/Question"; // Імпортуємо компонент Question
import styles from "./TestPage.module.css"; // Імпортуємо стилі

function TestPage() {
  const [answers, setAnswers] = useState([]); // Для збереження відповідей
  const [currentQuestion, setCurrentQuestion] = useState(0); // Показуємо поточне питання

  // Массив з питань і варіантів відповідей
  const questions = [
    {
      question: "1. Для яких цілей ви плануєте використовувати комп'ютер?",
      options: ["Ігри", "Офісні завдання (документи, таблиці)", "Навчання та програмування", "Робота з графікою (редагування фото/відео)"],
    },
    {
      question: "2. Яку операційну систему ви віддаєте перевагу?",
      options: ["Windows", "macOS", "Linux", "Іншу"],
    },
    {
      question: "3. Скільки грошей ви готові витратити на комп'ютер?",
      options: ["Менше 10 000 грн", "10 000 - 20 000 грн", "20 000 - 50 000 грн", "Більше 50 000 грн"],
    },
    {
      question: "4. Яким чином ви будете використовувати комп'ютер?",
      options: ["Дома", "В офісі", "Віддалено", "Відпочинок / розваги"],
    },
    {
      question: "5. Які особливості вам важливі в комп'ютері?",
      options: ["Швидкість", "Тривалий термін служби", "Мобільність", "Ціна"],
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
      // Завершуємо тест і виводимо результати
      alert("Тест завершено! Ваші відповіді: " + answers.join(", "));
    }
  };

  return (
    <div className={styles.testPage}>
      <div className={styles.testContainer}>
        <h1 className={styles.testTitle}>Ваша ідеальна конфігурація комп'ютера: знайдіть свій варіант!</h1>
        <p className={styles.testDescription}>
          Цей тест допоможе вам визначити, які компоненти комп'ютера найкраще відповідатимуть вашим потребам.
        </p>

        {/* Рендеримо поточне питання */}
        <Question
          question={questions[currentQuestion].question}
          options={questions[currentQuestion].options}
          handleAnswer={handleAnswer}
          questionNumber={currentQuestion}
        />

        {/* Кнопка для переходу до наступного питання */}
        <button className={styles.nextButton} onClick={handleNextQuestion}>
          {currentQuestion < questions.length - 1 ? "Далі" : "Завершити"}
        </button>
      </div>
    </div>
  );
}

export default TestPage;
