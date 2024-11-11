import React from "react";
import { useAuth } from "../../AuthContext"; // Імпортуємо хук для доступу до автентифікації
import { useNavigate } from "react-router-dom"; // Хук для навігації
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import styles from "./ProfilePage.module.css";
import "../../App1.module.css";

const ProfilePage = () => {
  const { isAuthenticated } = useAuth(); // Отримуємо статус автентифікації
  const navigate = useNavigate(); // Хук для навігації

  // Якщо користувач не авторизований, перенаправляємо на сторінку логіну
  if (!isAuthenticated) {
    navigate("/login");
    return null; // Не рендеримо сторінку
  }

  const assemblies = [
    {
      id: 1,
      name: "Збірка 1",
      totalPrice: "40 000",
      specs: [
        "Живлення (PSU): 750W Platinum Certified",
        "Оперативна пам'ять (RAM): 32 GB DDR4",
        "Відеокарта (GPU): NVIDIA GeForce RTX 4070",
        "Процесор (CPU): Intel Core i7-13700K",
        "Тип зберігання (Storage): SSD 2 TB NVMe",
        "Материнська плата: ASUS ROG Strix Z690-E Gaming",
      ],
    },
    {
      id: 2,
      name: "Збірка 2",
      totalPrice: "40 000",
      specs: [
        "Живлення (PSU): 750W Platinum Certified",
        "Оперативна пам'ять (RAM): 32 GB DDR4",
        "Відеокарта (GPU): NVIDIA GeForce RTX 4070",
        "Процесор (CPU): Intel Core i7-13700K",
        "Тип зберігання (Storage): SSD 2 TB NVMe",
        "Материнська плата: ASUS ROG Strix Z690-E Gaming",
      ],
    },
    {
      id: 3,
      name: "Збірка 3",
      totalPrice: "40 000",
      specs: [
        "Живлення (PSU): 750W Platinum Certified",
        "Оперативна пам'ять (RAM): 32 GB DDR4",
        "Відеокарта (GPU): NVIDIA GeForce RTX 4070",
        "Процесор (CPU): Intel Core i7-13700K",
        "Тип зберігання (Storage): SSD 2 TB NVMe",
        "Материнська плата: ASUS ROG Strix Z690-E Gaming",
      ],
    },
  ];

  const handleNewAssemblyClick = () => {
    navigate("/assembly"); // Перехід на сторінку /assembly
  };

  return (
    <div className={styles.profilePage}>
      <main className={styles.mainContent}>
        <h1 className={styles.title}>Мій профіль</h1>
        {/* Додаємо обробник кліку для кнопки */}
        <button
          className={styles.newAssemblyButton}
          onClick={handleNewAssemblyClick}
        >
          Нова збірка
        </button>
        <div className={styles.assembliesList}>
          {assemblies.map((assembly) => (
            <div key={assembly.id} className={styles.assemblyItem}>
              <h2 className={styles.assemblyTitle}>{assembly.name}</h2>
              <div className={styles.specs}>
                {assembly.specs.map((spec, index) => (
                  <p key={index} className={styles.spec}>
                    {spec}
                  </p>
                ))}
              </div>
              <p className={styles.totalPrice}>
                Загальна вартість: {assembly.totalPrice} грн
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
