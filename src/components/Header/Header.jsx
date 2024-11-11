import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import { useAuth } from "../../AuthContext"; // Імпортуємо хук для доступу до контексту

function Header() {
  const { isAuthenticated, logout } = useAuth(); // Отримуємо автентифікацію та logout з контексту
  const navigate = useNavigate(); // Хук для навігації

  const handleTestButtonClick = () => {
    if (isAuthenticated) {
      // Якщо користувач увійшов, перенаправляємо на сторінку тесту
      navigate("/test");
    } else {
      // Якщо не увійшов, перенаправляємо на сторінку логіну
      navigate("/login");
    }
  };

  const handleLogout = () => {
    logout(); // Вихід з облікового запису
    navigate("/login"); // Перенаправлення на сторінку входу
  };

  return (
    <header className={styles.header}>
      {/* Логотип, який веде на головну сторінку */}
      <Link to="/" className={styles.logo}>
        PCCONFIG
      </Link>
      <nav>
        <a href="#features" className={styles.navLink}>
          Про нас
        </a>

        {/* Умовно рендеримо лінк */}
        {isAuthenticated ? (
          <>
            <Link to="/profile" className={styles.navLink}>
              Мій профіль
            </Link>
            <button onClick={handleLogout} className={styles.navLink}>
              Вийти
            </button>
          </>
        ) : (
          <Link to="/login" className={styles.navLink}>
            Увійти
          </Link>
        )}

        {/* Кнопка, яка перенаправляє в залежності від статусу авторизації */}
        <button className={styles.button} onClick={handleTestButtonClick}>
          Пройти тест
        </button>
      </nav>
    </header>
  );
}

export default Header;
