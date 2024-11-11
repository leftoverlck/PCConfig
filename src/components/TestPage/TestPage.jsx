import React, { useState } from "react";
import Question from "../Question/Question"; // Імпортуємо компонент Question
import ConfigurationCard from "../ConfigurationCard/ConfigurationCard"; // Імпортуємо новий компонент конфігурації
import styles from "./TestPage.module.css"; // Імпортуємо стилі

function TestPage() {
  const [answers, setAnswers] = useState([]); // Для збереження відповідей
  const [currentQuestion, setCurrentQuestion] = useState(0); // Показуємо поточне питання
  const [testCompleted, setTestCompleted] = useState(false); // Стан для перевірки, чи завершено тест
  const [configuration, setConfiguration] = useState(null); // Для збереження кінцевої конфігурації

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
      // Завершуємо тест і визначаємо конфігурацію на основі відповідей
      const finalConfiguration = determineConfiguration(answers);
      setConfiguration(finalConfiguration); // Зберігаємо кінцеву конфігурацію
      setTestCompleted(true); // Встановлюємо стан завершення тесту
    }
  };

  // Функція для визначення конфігурації на основі відповідей
  const determineConfiguration = (answers) => {
    let config = {
      psu: "650W",
      ram: "8 GB DDR4",
      gpu: "NVIDIA GTX 1650",
      cpu: "Intel Core i5-11400F",
      storage: "SSD 256 GB",
      motherboard: "MSI B560M PRO",
      totalPrice: "12 000"
    };

    if (answers[0] === "Ігри") {
      if (answers[2] === "Більше 50 000 грн") {
        config = {
          psu: "750W Platinum Certified",
          ram: "32 GB DDR4",
          gpu: "NVIDIA GeForce RTX 4070",
          cpu: "Intel Core i7-13700K",
          storage: "SSD 2 TB NVMe",
          motherboard: "ASUS ROG Strix Z690-E Gaming",
          totalPrice: "40 000"
        };
      } else if (answers[2] === "20 000 - 50 000 грн") {
        config = {
          psu: "750W Platinum Certified",
          ram: "16 GB DDR4",
          gpu: "NVIDIA GeForce RTX 3060",
          cpu: "Intel Core i5-12600K",
          storage: "SSD 1 TB NVMe",
          motherboard: "Gigabyte Z690 AORUS ELITE",
          totalPrice: "25 000"
        };
      }
    } else if (answers[0] === "Офісні завдання (документи, таблиці)") {
      config = {
        psu: "500W",
        ram: "8 GB DDR4",
        gpu: "Intel UHD Graphics 630",
        cpu: "Intel Core i3-10100",
        storage: "HDD 1 TB",
        motherboard: "ASRock B460M-HDV",
        totalPrice: "8 000"
      };
    }

    return config;
  };

  // Функція для додавання конфігурації в профіль користувача
  const handleAddConfiguration = () => {
    console.log("Конфігурація додана в профіль користувача:", configuration);
    // Тут можна додати логіку для збереження конфігурації, наприклад, у Firebase або контекст
  };

  return (
    <div className={styles.testPage}>
      <div className={styles.testContainer}>
        {/* Якщо тест не завершено, показуємо заголовок та опис */}
        {!testCompleted && (
          <>
            <h1 className={styles.testTitle}>Ваша ідеальна конфігурація комп'ютера: знайдіть свій варіант!</h1>
            <p className={styles.testDescription}>
              Цей тест допоможе вам визначити, які компоненти комп'ютера найкраще відповідатимуть вашим потребам.
            </p>
          </>
        )}

        {/* Якщо тест завершено, відображаємо конфігурацію в картці */}
        {testCompleted ? (
          <>
            <ConfigurationCard configuration={configuration} />
            {/* Кнопка для додавання конфігурації */}
            <button className={styles.addConfigurationButton} onClick={handleAddConfiguration}>
              Додати конфігурацію
            </button>
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
}

export default TestPage;
