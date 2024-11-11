import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import styles from "./RegisterPage.module.css"; // Імпорт модульного CSS

function RegisterPage() {
  return (
    <div className={styles.registerPage}>
      <div className={styles.pageWrapper}>
        <div className={styles.formWrapper}>
          <h2 className={styles.registerTitle}>Реєстрація</h2>
          <form className={styles.registerForm}>
            <div className={styles.inputContainer}>
              <label htmlFor="email" className={styles.inputLabel}>
                Email
              </label>
              <input
                type="email"
                id="email"
                className={styles.inputField}
                placeholder="Введіть ваш email"
              />
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="password" className={styles.inputLabel}>
                Пароль
              </label>
              <input
                type="password"
                id="password"
                className={styles.inputField}
                placeholder="Введіть ваш пароль"
              />
            </div>
            <div className={styles.rememberMeContainer}>
              <input
                type="checkbox"
                id="remember-me"
                className={styles.rememberMeCheckbox}
              />
              <label htmlFor="remember-me" className={styles.rememberMeLabel}>
                Запам'ятати мене
              </label>
            </div>
            <button type="submit" className={styles.registerButton}>
              Зареєструватись
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
