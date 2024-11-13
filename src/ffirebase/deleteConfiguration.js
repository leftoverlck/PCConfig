
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";


export const deleteConfiguration = async (user, configId, setConfigurations, configurations) => {
  try {
    const configRef = doc(db, "user_configurations", user.uid, "configurations", configId);
    await deleteDoc(configRef);
    setConfigurations(configurations.filter(config => config.id !== configId)); 
    alert("Збірка видалена!");
  } catch (error) {
    console.error("Помилка видалення:", error);
    alert("Не вдалося видалити збірку.");
  }
};
