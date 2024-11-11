import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App1";
import { initializeApp } from "firebase/app";

// import { getFirestore } from "firebase/firestore";  // Для Firestore
// import { getAuth } from "firebase/auth";  // Для аутентифікації


const firebaseConfig = {
  apiKey: "AIzaSyC6Ai-ZWIJwQ-keNfjYVLYZiS3xR5GbOSo",
  authDomain: "pc-config-98ac2.firebaseapp.com",
  projectId: "pc-config-98ac2",
  storageBucket: "pc-config-98ac2.appspot.com",
  messagingSenderId: "819959149905",
  appId: "1:819959149905:web:ebd0276fafff82611f4f70",
  measurementId: "G-EVWR1NDFB6"
};


initializeApp(firebaseConfig);

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
