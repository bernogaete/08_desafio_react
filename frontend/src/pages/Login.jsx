import { useContext, useState } from "react";
import { MyContext } from "../context/MyContext";

const Login = () => {
  // Estados del Login
  const { login } = useContext(MyContext);
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");

  // Estado para los errores
  const [error, setError] = useState("");

  // Función antes de enviar el formulario
  const validarDatos = (e) => {
    e.preventDefault();

    // Validación de los campos
    if (!email.trim() || !contraseña.trim()) {
      setError("Todos los campos son obligatorios");
      return;
    }

    if (contraseña.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    // Limpiar los errores si todo es válido
    setError("");

    alert("Los datos son correctos");

    // Llamar al login con los datos correctos
    login(email, contraseña); 

    // Limpiar los campos después de enviar los datos
    setEmail("");
    setContraseña("");
  };

  return (
    <div className="container-login">

      <form className="login" onSubmit={validarDatos}>

        <h1>Login</h1>
        {error && <p className="error-message">{error}</p>}

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className="form-group">
          <label>Contraseña</label>
          <input
            type="password"
            name="contraseña"
            className="form-control"
            onChange={(e) => setContraseña(e.target.value)}
            value={contraseña}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          ENVIAR
        </button>
      </form>
    </div>
  );
};

export default Login;
