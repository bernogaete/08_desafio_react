import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { ListGroup } from "react-bootstrap";

const CardPizza = ({ img, name, price, ingredients, quantity, updateCart }) => {
  const formattedPrice = price.toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
  });

  return (
    <>
      <Card style={{ width: "35rem" }}>
        <Card.Img variant="top" src={img} />
        <Card.Body>
          <Card.Title>
            <strong>{name}</strong>
          </Card.Title>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item style={{ textAlign: "center" }}>
            Ingredientes:
            <br />
            🍕
            <ul className="ingredientes">
              {ingredients.map((ingredient, index) => (
                <li key={index}>🍕 {ingredient}</li>
              ))}
            </ul>
          </ListGroup.Item>
          <ListGroup.Item style={{ fontSize: "20px", textAlign: "center" }}>
            <strong>Precio: {formattedPrice}</strong>
          </ListGroup.Item>
          <div className="cantidad-control">
            <Button
              variant="outline-dark"
              onClick={() => updateCart(quantity - 1)}
              disabled={quantity === 0}
              aria-label="Restar uno"
            >
              –
            </Button>
            <span className="quantity-display">{quantity}</span>
            <Button
              variant="outline-dark"
              onClick={() => updateCart(quantity + 1)}
              aria-label="Sumar uno"
            >
              +
            </Button>
          </div>
        </ListGroup>
        <div className="botones">
          {/* <Button
            variant="outline-dark"
            className="me-2"
            style={{ fontSize: 'small', width: '8em' }}
          >
            Ver Más 👀
          </Button>{' '}
          <Button
            variant="dark"
            className="text-white"
            style={{ fontSize: 'small', width: '8em' }}
          >
            Añadir 🛒
          </Button> */}
        </div>
      </Card>
    </>
  );
};

export default CardPizza;
