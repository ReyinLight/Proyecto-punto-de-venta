import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  if (!product) {
    return <div>Producto no disponible</div>;
  }

  const imageURL = `/Imagenes/${product.id}.jpg`;

  return (
    <Card className="product-card">
      <Card.Img
        variant="top"
        src={imageURL}
        alt={product.nombre}
        className="product-card-img"
      />
      <Card.Body>
        <Card.Title>{product.nombre}</Card.Title>
        <Card.Text>
          <strong>Precio:</strong> ${product.precio.toFixed(2)}
        </Card.Text>
        <Card.Text>
          <strong>Existencias:</strong> {product.existencias}
        </Card.Text>
        <div className="d-flex justify-content-between">
          <Link to={`/producto/${product.id}`}>
            <Button variant="primary">Ver detalles</Button>
          </Link>
          <Button variant="success">Comprar</Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
