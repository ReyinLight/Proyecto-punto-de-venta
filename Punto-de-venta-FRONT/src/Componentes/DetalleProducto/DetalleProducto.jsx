import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import CommentSection from '../SeccionComentarios/SeccionComentarios';
import './DetalleProducto.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3001/articulos/${id}`);
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
        } else {
          throw new Error('Producto no encontrado');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        navigate('/');
      }
    };

    fetchProduct();
  }, [id, navigate]);

  if (!product) {
    return (
      <Container className="mt-4 text-center">
        <h2>Producto no encontrado</h2>
        <Button variant="secondary" onClick={() => navigate('/')}>Regresar a Inicio</Button>
      </Container>
    );
  }

  const imageURL = `/Imagenes/${product.id}.jpg`;

  return (
    <Container className="mt-4">
      <Row>
        <Col md={6} className="mb-4">
          <Card>
            <Card.Img
              variant="top"
              src={imageURL}
              alt={product.nombre}
              className="product-detail-image"
            />
          </Card>
        </Col>
        <Col md={6}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>{product.nombre}</Card.Title>
              <Card.Text className="mb-4">{product.descripcion}</Card.Text>
              <Card.Text className="mb-4"><strong>Precio: ${product.precio.toFixed(2)}</strong></Card.Text>
              <Card.Text className="mb-4"><strong>Existencias: {product.existencias}</strong></Card.Text>
              <Button
                variant="primary"
                size="lg"
                className="w-100 mb-2"
                onClick={() => navigate(`/cliente/${product.id}`)}
              >
                Comprar
              </Button>
              <Button
                variant="secondary"
                onClick={() => navigate(-1)}
                className="w-100"
              >
                Regresar
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <CommentSection productId={id} />
    </Container>
  );
};

export default ProductDetail;
