import React, { useContext, useState } from "react";
import Footer from "./components/Footer";
import "./App.css";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./components/Profile";
import NotFound from "./components/NotFound";
import Pizza from "./pages/Pizza";
import Cart from "./pages/Cart";
import pizzas from "./script/pizzas";
import ProtectedRoute from "./components/ProtectedRoute";
import { MyContext } from "./context/MyContext";

function App() {
  const { token } = useContext(MyContext); // Asegúrate de que el contexto sea correcto
  const [cart, setCart] = useState(
    pizzas.map((pizza) => ({ ...pizza, quantity: 0 }))
  );

  const calcularTotal = () => {
    return cart.reduce(
      (total, pizza) => total + pizza.price * pizza.quantity,
      0
    );
  };

  return (
    <>
      <div>
        <Navbar total={calcularTotal()} />

        <Routes>
          <Route path="/" element={<Home cart={cart} setCart={setCart} />} />
          <Route
            path="/register"
            element={token ? <Navigate to="/" /> : <Register />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
          <Route path="/pizza/p001" element={<Pizza />} />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer />
      </div>
    </>
  );
}

export default App;
