import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { useState, useEffect, useContext } from "react";
import { MyContext } from "../context/MyContext";
import { useParams } from "react-router-dom";

const Pizza = () => {
  const [infor, setInfor] = useState(null);
  const [error, setError] = useState(false);

  // nuevos parámetros hito 7
  const { getPizza, addToCart, userPizza, setUserPizza } = useContext(MyContext);
  const { id } = useParams();

  useEffect(() => {
    const fetchPizza = async () => {
      try {
        const pizzaData = await getPizza(id);
        setInfor(pizzaData);
      } catch (err) {
        setError(true);
      }
    };
    fetchPizza();
  }, [id, getPizza]);

  if (error) {
    return <p>Error al cargar los datos de la pizza.</p>;
  }

  if (!infor || !infor.ingredients) {
    return <p>Cargando datos...</p>;
  }

  return (
    <>
      <div className="d-flex justify-content-center align-items-center mt-5">
        <Card style={{ width: "25rem" }}>
          <Card.Img variant="top" src={infor.img} />
          <Card.Body>
            <Card.Title>{infor.name}</Card.Title>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>
              <Card.Text>INGREDIENTES:</Card.Text>
              <Card.Text>{infor.desc}</Card.Text>
              <ul>
                {infor.ingredients.map((ingredient, i) => (
                  <li key={i}>{ingredient}</li>
                ))}
              </ul>
            </ListGroup.Item>
            <ListGroup.Item>
              <Card.Title>PRECIO: {infor.price}</Card.Title>
              <div className="d-flex justify-content-center">
                <Button variant="primary" onClick={() => console.log('Ver más')}>Ver más 👀</Button>
                <Button variant="dark" onClick={() => addToCart(infor)}>Añadir 🛒</Button>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </div>
    </>
  );
};

export default Pizza;
