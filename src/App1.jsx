import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import LoginPage from "./components/LoginPage/LoginPage";
import TestPage from "./components/TestPage/TestPage";
import { AuthProvider } from "./AuthContext";
import HeroSection from "./components/HeroSection1/HeroSection";
import FeaturesSection from "./components/FeaturesSection/FeaturesSection";
import NewAssemblyPage from "./components/NewAssemblyPage/NewAssemblyPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Header /> {/* Хедер рендериться на всіх сторінках */}
          <Routes>
            {/* Головна сторінка */}
            <Route
              path="/"
              element={
                <>
                  <HeroSection />
                  <FeaturesSection />
                </>
              }
            />

            {/* Сторінка логіну */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            {/* Сторінка реєстрації */}
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/test" element={<TestPage />} />
            <Route path="/assembly" element={<NewAssemblyPage />} />
          </Routes>
          <Footer /> {/* Футер рендериться на всіх сторінках */}
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
