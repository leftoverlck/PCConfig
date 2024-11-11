import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "../../App1.module.css";
import ProductInfo from "../ProductInfo/ProductInfo";
import styles from "./NewAssemblyPage.module.css";

const NewAssemblyPage = () => {
  return (
    <div className={styles.newAssemblyPage}>
      <main className={styles.mainContent}>
        <h1 className={styles.title}>Нова збірка</h1>
        <div className={styles.form}>
          <label className={styles.label}>
            Назва збірки
            <input type="text" className={styles.input} />
          </label>
          <label className={styles.label}>
            Коментар
            <textarea className={styles.textarea}></textarea>
          </label>
        </div>
        <div className={styles.selects}>
          <select className={styles.select}>
            <option>Процесор</option>
          </select>
          <select className={styles.select}>
            <option>Оперативна пам'ять</option>
          </select>
          <select className={styles.select}>
            <option>Відеокарта</option>
          </select>
          <select className={styles.select}>
            <option>Накопичувач SSD</option>
          </select>
          <select className={styles.select}>
            <option>Материнська плата</option>
          </select>
          <select className={styles.select}>
            <option>Живлення PSU</option>
          </select>
        </div>
        <div className={styles.buttons}>
          <button className={styles.button}>Готові збірки</button>
          <button className={styles.button}>Додати збірку</button>
        </div>
        <ProductInfo />
      </main>
    </div>
  );
};

export default NewAssemblyPage;
