import React from "react";
import styles from "./InputField.module.css";

function InputField({ id, label, type, placeholder }) {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={id} className={styles.inputLabel}>
        {label}
      </label>
      <input
        type={type}
        id={id}
        className={styles.inputField}
        placeholder={placeholder}
      />
    </div>
  );
}

export default InputField;
