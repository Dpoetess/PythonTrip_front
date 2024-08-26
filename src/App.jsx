// App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UseApi from './useApi';
import Navbar from './components/nav/Nav'; // Asegúrate de que la ruta sea correcta

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<UseApi />} />
        {/* Agrega otras rutas aquí */}
        <Route path="/login" element={<div>Login Page</div>} />
        <Route path="/signup" element={<div>Sign Up Page</div>} />
      </Routes>
    </div>
  );
}

export default App;
