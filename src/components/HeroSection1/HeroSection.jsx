import React from "react";
import styles from "./HeroSection.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext"; // Імпортуємо хук для доступу до контексту

function HeroSection() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth(); // Використовуємо хук для доступу до автентифікації

  const handleStartButtonClick = () => {
    if (isAuthenticated) {
      // Якщо користувач увійшов, перенаправляємо на сторінку асемблі
      navigate("/assembly");
    } else {
      // Якщо не увійшов, перенаправляємо на сторінку входу
      navigate("/login");
    }
  };

  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h1>
          Збірка комп'ютера без <br /> зайвих зусиль
        </h1>
        <p>Твій комп'ютер – твої правила!</p>
        {/* Додаємо обробник події для кнопки */}
        <button className={styles.startButton} onClick={handleStartButtonClick}>
          Почати збірку
        </button>
      </div>
      <div className={styles.heroBefore}></div>
    </section>
  );
}

export default HeroSection;