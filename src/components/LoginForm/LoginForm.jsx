import React from "react";
import InputField from "../InputField1/InputField";
import styles from "./LoginForm.module.css";
import { Link } from "react-router-dom";

function LoginForm() {
  return (
    <form className={styles.loginForm}>
      <InputField
        id="email"
        label="Email"
        type="email"
        placeholder="Введіть ваш email"
      />
      <InputField
        id="password"
        label="Пароль"
        type="password"
        placeholder="Введіть ваш пароль"
      />
      <button type="submit" className={styles.loginButton}>
        Вхід
      </button>
      <div className={styles.registerButtonContainer}>
        <Link to="/register">
          <button className={styles.registerButton}>Зареєструватися</button>
        </Link>
      </div>
    </form>
  );
}

export default LoginForm;
