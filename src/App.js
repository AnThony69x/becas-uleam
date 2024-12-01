import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import InicioSesion from './pages/InicioSesion';
import RecuperarContraseña from './pages/RecuperarContraseña';
import InicioEstudiante from './pages/InicioEstudiante';
import InicioAdministrador from './pages/InicioAdministrador';
import PostulacionEstudiante from './pages/PostulacionEstudiante';
import BecadosEstudiante from './pages/BecadosEstudiante';
import PostulacionAdministrador from './pages/PostulacionAdministrador';
import RechazadosAdministrador from './pages/RechazadosAdministrador';
import BecadosAdministrador from './pages/BecadosAdministrador';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/inicio-sesion" />} /> 
        <Route path="/inicio-sesion" element={<InicioSesion />} />
        <Route path="/recuperar-contraseña" element={<RecuperarContraseña />} />
        <Route path="/inicio-estudiante" element={<InicioEstudiante />} />
        <Route path="/inicio-administrador" element={<InicioAdministrador />} />
        <Route path="/postulacion-estudiante" element={<PostulacionEstudiante />} />
        <Route path="/busqueda-estudiante" element={<BecadosEstudiante />} />
        <Route path="/postulacion-administrador" element={<PostulacionAdministrador />} />
        <Route path="/rechazados-administrador" element={<RechazadosAdministrador />} />
        <Route path="/becados-administrador" element={<BecadosAdministrador />} />
      </Routes>
    </Router>
  );
}

export default App;
