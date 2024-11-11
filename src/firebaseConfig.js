import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";  
import { getAuth } from "firebase/auth";  


const firebaseConfig = {
  apiKey: "AIzaSyC6Ai-ZWIJwQ-keNfjYVLYZiS3xR5GbOSo",
  authDomain: "pc-config-98ac2.firebaseapp.com",
  projectId: "pc-config-98ac2",
  storageBucket: "pc-config-98ac2.appspot.com",
  messagingSenderId: "819959149905",
  appId: "1:819959149905:web:ebd0276fafff82611f4f70",
  measurementId: "G-EVWR1NDFB6"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);  
const auth = getAuth(app);    

export { db, auth };
