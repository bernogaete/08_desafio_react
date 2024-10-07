import { useContext, useState } from "react";
import { Button, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { MyContext } from "../context/MyContext";

function Cart({ cart, setCart }) {
  const { token, simulacro } = useContext(MyContext); // Accedemos al token desde el contexto MyContext
  const [message, setMessage] = useState(""); // Estado para el mensaje de pago

  const increaseQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const pizzasInCart = cart.filter((pizza) => pizza.quantity > 0);

  const handlePayment = () => {
    setMessage("¡Gracias por tu compra! El pago se ha realizado exitosamente."); // Actualizar el mensaje
    simulacro(); // Llamar a la función de pago simulada
  };

  return (
    <div className="carrito-principal">
      <h2>Tu Carrito de compras</h2>
      {pizzasInCart.length > 0 ? (
        pizzasInCart.map((pizza) => (
          <div className="card-container-second" key={pizza.id}>
            <Card>
              <Card.Img
                variant="top"
                src={pizza.img}
                alt={pizza.name}
                style={{
                  width: "640px",
                  height: "426px",
                  objectFit: "cover",
                }}
              />
              <Card.Body>
                <Card.Title>
                  Pizza{" "}
                  {pizza.name.charAt(0).toUpperCase() + pizza.name.slice(1)}
                </Card.Title>
                <p>
                  Precio:{" "}
                  {pizza.price.toLocaleString("es-CL", {
                    style: "currency",
                    currency: "CLP",
                  })}
                </p>
                <ListGroup>
                  <ListGroupItem>
                    <div className="quantity-control">
                      <Button
                        variant="outline-dark"
                        onClick={() => decreaseQuantity(pizza.id)}
                        disabled={pizza.quantity <= 1} // Impide que el valor sea negativo
                        aria-label={`Disminuir cantidad de ${pizza.name}`}
                      >
                        -
                      </Button>
                      <span>{pizza.quantity}</span>
                      <Button
                        onClick={() => increaseQuantity(pizza.id)}
                        aria-label={`Aumentar cantidad de ${pizza.name}`}
                      >
                        +
                      </Button>
                    </div>
                  </ListGroupItem>
                </ListGroup>
              </Card.Body>
            </Card>
          </div>
        ))
      ) : (
        <p>Tu carrito está vacío.</p>
      )}
      <h3>
        Total:{" "}
        {total.toLocaleString("es-CL", { style: "currency", currency: "CLP" })}
      </h3>

      {message && <p className="payment-message">{message}</p>} {/* Mostrar el mensaje */}

      <button
        className="btn btn-success" 
        onClick={handlePayment}
        disabled={!token} // El botón se desactiva si no hay token
      >
        Pagar
      </button>
    </div>
  );
}

export default Cart;
