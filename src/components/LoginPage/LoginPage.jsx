import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import LoginForm from "../LoginForm/LoginForm";
import styles from "./LoginPage.module.css";
import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <div className={styles.loginPage}>
      <div className={styles.pageWrapper}>
        <div className={styles.formWrapper}>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
