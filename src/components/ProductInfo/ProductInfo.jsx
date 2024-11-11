import React from "react";
import styles from "./ProductInfo.module.css";

const ProductInfo = () => {
  // Дані продукту
  const product = {
    title: "AMD Ryzen 7 5800X",
    description:
      "— це високопродуктивний процесор з архітектурою Zen 3, призначений для настільних комп'ютерів.",
    specs: [
      { label: "Кількість ядер", value: 8 },
      { label: "Кількість потоків", value: 16 },
      { label: "Базова тактова частота", value: "3.8 GHz" },
      { label: "Максимальна тактова частота (Boost)", value: "До 4.7 GHz" },
      { label: "Об'єм кеш-пам'яті", value: "32 MB L3 кеша, 4 MB L2 кеша" },
      { label: "Техпроцес", value: "7 нм" },
      { label: "Енергоефективність", value: "105 Вт" },
    ],
    prices: [
      { store: "Rozetka", price: "10,999 грн" },
      { store: "Comfy", price: "12,599 грн" },
      { store: "MOYO", price: "8,786 грн" },
    ],
    imageSrc: "ryzen-image.png", // Замість цього використовуйте правильний шлях до зображення
  };

  return (
    <div className={styles.productInfo}>
      <h2 className={styles.productTitle}>{product.title}</h2>
      <p className={styles.description}>{product.description}</p>

      <div className={styles.specs}>
        {product.specs.map((spec, index) => (
          <p key={index}>
            {spec.label}: {spec.value}
          </p>
        ))}
      </div>

      <img
        src={product.imageSrc}
        alt={product.title}
        className={styles.image}
      />

      <div className={styles.prices}>
        <h3 className={styles.priceTitle}>Вартість</h3>
        {product.prices.map((price, index) => (
          <p key={index}>
            {price.store} – {price.price}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ProductInfo;
