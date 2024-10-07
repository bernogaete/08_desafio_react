import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../context/MyContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { token, role } = useContext(MyContext); // Reemplazamos "user" por "token"
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || role !== requiredRole) {
      navigate('/login'); // Redirigir si no hay token o el rol no coincide
    }
  }, [token, role, requiredRole, navigate]);

  if (!token || role !== requiredRole) {
    return <p>Redirigiendo...</p>; // Mostrar mensaje temporal mientras redirige
  }

  return children; // Si el token y el rol son válidos, renderiza los hijos
};

export default ProtectedRoute;