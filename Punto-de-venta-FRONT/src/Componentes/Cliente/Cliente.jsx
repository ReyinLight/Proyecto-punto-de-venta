import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const DatosUsuario = () => {
    const { id } = useParams(); // Obtener el ID del producto de la URL
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate(); // Hook para redireccionar

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {


            // realizar solicitud
            await axios.post('http://localhost:3001/compra/', {
                usuario: formData,
                productoId: id
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });




            setSuccess('Compra realizada con exito');
            setError(null);

        } catch (error) {
            if (error.userResponse && error.userResponse.status === 400) {
                setError(error.userResponse.data.error);
            } else {
                setError("No se pudo comprar");
            }

            setSuccess(null);
            console.error('Error al guardar los datos', error);
        }

    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <h2>Datos del Usuario</h2>
                    {success && <Alert variant="success">{success}</Alert>}
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="name">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="email" className="mt-3">
                            <Form.Label>Correo Electrónico</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="phone" className="mt-3">
                            <Form.Label>Teléfono</Form.Label>
                            <Form.Control
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-4 w-100">
                            Guardar
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default DatosUsuario;
