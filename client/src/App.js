import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Search from "./pages/Search";
import Lists from "./pages/Lists";
import PrivateRoute from "./components/PrivateRoute"; 

function App() {
  const token = localStorage.getItem("token");

  return (
    <AuthProvider>
      <Router>
        {token && <Navbar />}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          
          <Route element={<PrivateRoute />}>
            <Route path="/search" element={<Search />} />
            <Route path="/lists" element={<Lists />} />
          </Route>

          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
