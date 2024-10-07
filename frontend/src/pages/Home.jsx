import CardPizza from "../components/CardPizza";

import pizzaData from "../script/pizzas"; // Renombrar la importación
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = ({ cart, setCart }) => {
  const [pizzas, setPizzas] = useState([]);
  const navigate = useNavigate();

  // Cambiar el título al montar el componente
  useEffect(() => {
    document.title = "Home - Pizzería Mamma Mía";
  }, []);

  // Fetch de las pizzas desde la API
  useEffect(() => {
    async function apiFetch() {
      const response = await fetch('http://localhost:5001/api/pizzas'); // Corrige la URL
      const data = await response.json();
      setPizzas(data); 
    }
    apiFetch();
  }, []);

  const handleViewMore = (pizza) => {
    navigate(`/pizza/${pizza.id}`);
  };

  const updateCart = (pizzaId, quantity) => {
    setCart(prevCart => {
      const existingPizza = prevCart.find(pizza => pizza.id === pizzaId);
      if (existingPizza) {
        return prevCart.map(pizza =>
          pizza.id === pizzaId ? { ...pizza, quantity: Math.max(0, quantity) } : pizza
        );
      } else {
        const newPizza = pizzas.find(pizza => pizza.id === pizzaId);
        return [...prevCart, { ...newPizza, quantity }];
      }
    });
  };

  return (
    <>
      <div className="card-container">
        {pizzas.map((pizza) => (
          <CardPizza
            key={pizza.id}
            name={pizza.name}
            price={pizza.price}
            ingredients={pizza.ingredients}
            img={pizza.img}
            quantity={cart?.find((item) => item.id === pizza.id)?.quantity || 0}
            updateCart={(quantity) => updateCart(pizza.id, quantity)}
            onViewMore={() => handleViewMore(pizza)}

          />
        ))}
      </div>
    </>
  );
};

export default Home;

