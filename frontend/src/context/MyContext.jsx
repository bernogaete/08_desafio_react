import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const MyContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [token, setToken] = useState('');
  const [user, setUser] = useState(null); // Inicialización de 'user'
  const navigate = useNavigate();

  const addToCart = (pizza) => {
    const index = cart.findIndex((item) => item.id === pizza.id);
    if (index !== -1) {
      const newCart = [...cart];
      newCart[index].count++;
      setCart(newCart);
    } else {
      const newCart = [...cart, { ...pizza, count: 1 }];
      setCart(newCart);
    }
  };

  const decreaseQuantity = (id) => {
    setCart(
      cart
        .map((pizza) =>
          pizza.id === id ? { ...pizza, count: pizza.count - 1 } : pizza
        )
        .filter((pizza) => pizza.count > 0)
    );
  };

  

  useEffect(() => {
    const newTotalPrice = cart.reduce(
      (total, pizza) => total + pizza.price * pizza.count,
      0
    );
    const newQuantity = cart.reduce((total, pizza) => total + pizza.count, 0);

    setTotalPrice(newTotalPrice);
    setQuantity(newQuantity);
  }, [cart]);

  const logout = () => {
    setToken('');
  };

  const getUser = async () => {
    if (token) {
      const response = await fetch("http://localhost:5001/api/auth/me", { // se cmabia a puerto 5001
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setUser(data);
    }
  };

  const login = async (emailValue, pwdValue) => {
    try {
      const response = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailValue,
          password: pwdValue,
        }),
      });

      const data = await response.json();

      if (data.error) {
        alert(data.error);
        return;
      }

      alert("Autenticación exitosa");
      localStorage.setItem("token", data.token);
      setToken(data.token);
      navigate("/");
    } catch (error) {
      console.error("Login error", error);
    }
  };

  const register = async (email, pwd) => {
    try {
      const response = await fetch("http://localhost:5001/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: pwd,
        }),
      });

      const data = await response.json();

      if (data.error) {
        alert(data.error);
        return;
      }

      alert("Registro exitoso");
      localStorage.setItem("token", data.token);
      setToken(data.token);
      navigate("/");
    } catch (error) {
      console.error("Error en el registro", error);
    }
  };

  const simulacro = async () => {
    const response = await fetch("http://localhost:5001/api/checkouts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        cart: {cart}
      }),
    });
    let data = await response.json();
    alert(data?.error || data.message);
  };

  return (
    <MyContext.Provider
      value={{
        token,
        getUser,
        simulacro,
        cart,
        addToCart,
        decreaseQuantity,
        totalPrice,
        quantity,
        logout,
        login,
        register,
        user,
        
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default CartProvider;
