import React, { useEffect, useState } from "react";
import "./App.css";
import { LoginForm } from "./components/loginForm";
import { Route, Routes, useNavigate } from "react-router";
import { ProfilePage } from "./components/proilePage";

function App() {
  const [logged, setLogin] = useState<null | boolean>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLogin(localStorage.getItem("user") ? true : null);
  }, []);

  useEffect(() => {
    localStorage.getItem("user") ? navigate("/profile") : navigate("/login");
  }, [logged, navigate]);

  return (
    <div className="App">
      <h1>ONLY.</h1>
      <Routes>
        <Route
          path="/login"
          element={<LoginForm logged={logged} setLogin={setLogin} />}
        />

        <Route path="/profile" element={<ProfilePage setLogin={setLogin} />} />
      </Routes>
    </div>
  );
}

export default App;
