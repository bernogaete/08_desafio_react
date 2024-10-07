import { useContext } from "react"; 
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { MyContext } from "../context/MyContext";


const Navbar = () => {
  const { quantity, totalPrice, token, logout, email } = useContext(MyContext);

  const setActiveClass = ({ isActive }) => (isActive ? 'active' : undefined);

  return (
    <div className="barra">
      <div className="d-flex align-items-center justify-content-between w-100">
        {/* Título */}
        <p className="mb-0">Pizzería Mamma Mía!</p>
  

        <div className="d-inline-flex gap-2">
          {/* Links de navegación */}
          <ul>
            <li className="navlink-button"><NavLink to="/" className={setActiveClass}>Home</NavLink></li>
           

            {token ? (
              // Mostrar cuando el token es true
              <>
                <li className="navlink-button"><NavLink to="/profile" className={setActiveClass}>🔒 Profile</NavLink></li>
                <li>
                  <span className="welcome-message">Bienvenido, {email}!</span> {/* Mostrar el mensaje de bienvenida */}
                  <Button variant="outline-warning" onClick={logout} className="text-white me-2">
                    🔒 Logout
                  </Button>
                </li>
              </>
            ) : (
              // Mostrar cuando el token es false
              <>
                <li className="navlink-button"><NavLink to="/register" className={setActiveClass}>🔐 Register</NavLink></li>
                <li className="navlink-button"><NavLink to="/login" className={setActiveClass}>👤 Login</NavLink></li>
              </>
            )}
          </ul>
        </div>

        {/* Información del carrito */}
        <div className="d-flex gap-2 ms-auto">
          <NavLink
            to="/cart"
            className="btn btn-outline-primary d-flex align-items-center"
            style={{ fontSize: "small", backgroundColor: "#f8f9fa" }}
          >
            {/* Mostramos el total del carrito y la cantidad */}
            🛒 Total: ${totalPrice.toLocaleString()} &nbsp;|&nbsp; CARRITO: {quantity} 


         
            
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
