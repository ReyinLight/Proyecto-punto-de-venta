import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Container } from 'react-bootstrap';

const HistorialCompras = () => {
    const [historial, setHistorial] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHistorial = async () => {
            try {
                const response = await axios.get('http://localhost:3001/compra/historial');
                setHistorial(response.data);
            } catch (error) {
                setError('Error al cargar el historial de compras');
                console.error('Error fetching historial:', error);
            }
        };

        fetchHistorial();
    }, []);

    return (
        <Container className="mt-5">
            <h2>Historial de Compras</h2>
            {error && <p className="text-danger">{error}</p>}
            <Table striped bordered hover responsive className="mt-3">
                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Correo</th>
                        <th>Teléfono</th>
                        <th>Artículo comprado</th>
                        <th>Subtotal</th>
                        <th>Fecha de compra</th>
                    </tr>
                </thead>
                <tbody>
                    {historial.map((compra) => (
                        <tr key={compra.Id}>
                            <td>{compra.Cliente}</td>
                            <td>{compra.Correo}</td>
                            <td>{compra.Telefono}</td>
                            <td>{compra['Articulo comprado']}</td>
                            <td>{compra.Subtotal}</td>
                            <td>{new Date(compra['Fecha de compra']).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default HistorialCompras;
