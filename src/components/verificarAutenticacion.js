// src/components/useVerificarAutenticacion.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useVerificarAutenticacion = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    // Si no hay token, redirige a inicio de sesión
    if (!token || token === 'undefined' || token === 'null') {
      console.log("Token no válido o no encontrado. Redirigiendo a inicio de sesión.");
      navigate('/inicio-sesion', { replace: true });
    } else {
      console.log("Token encontrado, acceso permitido.");
    }
  }, [navigate]);
};

export default useVerificarAutenticacion;
