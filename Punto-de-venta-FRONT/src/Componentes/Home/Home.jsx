import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./Home.css";

const Home = () => {
  const [articulos, setArticulos] = useState([]);
  const [randomProducts, setRandomProducts] = useState([]);

  useEffect(() => {
    const fetchArticulos = async () => {
      try {
        const response = await fetch('http://localhost:3001/articulos');
        const data = await response.json();
        setArticulos(data);
        updateRandomProducts(data);
      } catch (error) {
        console.error('Error fetching articulos:', error);
      }
    };

    fetchArticulos();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (articulos.length > 0) {
        updateRandomProducts(articulos);
      }
    }, 3000); // Cambia los productos cada 3 segundos

    return () => clearInterval(interval);
  }, [articulos]);

  const updateRandomProducts = (data) => {
    const shuffled = data.sort(() => 0.5 - Math.random());
    setRandomProducts(shuffled.slice(0, 3));
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h1>Bienvenidos a nuestra Tienda de Regalos</h1>
          <p>Encuentra el regalo perfecto para cualquier ocasión.</p>
        </Col>
      </Row>
      <Row>
        {randomProducts.map((articulo) => (
          <Col md={4} key={articulo.id}>
            <Card className="mb-4">
              <Card.Img
                variant="top"
                src={`/Imagenes/${articulo.id}.jpg`}
                alt={articulo.nombre}
              />
              <Card.Body>
                <Card.Title>{articulo.nombre}</Card.Title>
                <Link to={`/producto/${articulo.id}`}>
                  <Button variant="primary">Ver detalles</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;
