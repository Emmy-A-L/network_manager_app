import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFoundPage from "./pages/NotFoundPage";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./component/ProtectedRoute";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/account/register" element={<Register />} />
        <Route
          path="/account/login"
          element={<Login onLoginSuccess={() => setIsAuthenticated(true)} />}
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
