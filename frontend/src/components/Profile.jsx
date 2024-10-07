import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Usamos useNavigate para redirigir
import { MyContext } from '../context/MyContext'; // Asegúrate de ajustar la ruta del contexto

const Profile = () => {
  const { user, getUser, token, logout } = useContext(MyContext); // Asegúrate de traer la función de logout y el token
  const navigate = useNavigate(); // Hook de navegación

  // Llama a getUser para obtener los datos del usuario si el token está disponible
  useEffect(() => {
    if (token) {
      getUser();
    }
  }, [token, getUser]);

  const handleLogout = () => {
    console.log("Cerrando sesión..."); // Verificar si se ejecuta
    logout(); // Llama a la función de logout

    // Verificar si la redirección funciona
    console.log("Redirigiendo a /login...");
    navigate("/login"); // Redirige al usuario a la página de login
  };

  return (
    <div>
      {user ? (
        <div>
          <p>Email del Usuario: {user.email}</p>
          <p>ID del Usuario: {user.id}</p>

          <button className='btn btn-danger' onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      ) : (
        <p>No hay información del usuario disponible.</p>
      )}
    </div>
  );
};

export default Profile;
