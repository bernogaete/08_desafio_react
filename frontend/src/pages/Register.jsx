import { useContext, useState } from "react"
import { MyContext } from "../context/MyContext";

const Register = () => {
    // Estados del Registro
    const {register} = useContext (MyContext)
    const [email, setEmail] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [confirmarContraseña, setConfirmarContraseña] = useState("");

    // Estado para los errores
    const [error, setError] = useState("");

    // Función antes de enviar el formulario
    const validarDatos = (e) => {
        e.preventDefault();

        // Validación de los campos
        if (!email.trim() || !contraseña.trim() || !confirmarContraseña.trim()) {
            setError("Todos los campos son obligatorios");
            return;
        }

        if (contraseña.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres");
            return;
        }

        if (contraseña !== confirmarContraseña) {
            setError("El password y la confirmación del password deben ser iguales");
            return;
        }

        // Limpiar los errores y los campos si todo es válido
        setError("");
        setEmail("");
        setContraseña("");
        setConfirmarContraseña("");
        
        alert("Registro exitoso");

        register(email, contraseña)
    };

    return (
        <div className="container-register">
            <form className="register" onSubmit={validarDatos}>
                {error && <p>{error}</p>}

                <div className="form-group">
                    <label>Email</label>
                    <input 
                        type="text"
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

                <div className="form-group">
                    <label>Confirmar Contraseña</label>
                    <input
                        type="password"
                        name="confirmarContraseña"
                        className="form-control"
                        onChange={(e) => setConfirmarContraseña(e.target.value)}
                        value={confirmarContraseña}
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-primary"
                >
                    ENVIAR
                </button>
            </form>
        </div>
    );
}

export default Register;
