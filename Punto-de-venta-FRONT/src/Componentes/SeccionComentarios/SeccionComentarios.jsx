import React, { useState, useEffect } from 'react';
import { Form, Button, ListGroup, Container } from 'react-bootstrap';
import axios from 'axios';

const CommentSection = ({ productId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/comentarios/${productId}`);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [productId]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/comentarios', {
        idArticulo: productId,
        comentario: newComment
      });
      setNewComment('');

      const response = await axios.get(`http://localhost:3001/comentarios/${productId}`);
      setComments(response.data);
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <Container className="mt-4">
      <h3>Comentarios</h3>
      <ListGroup className="mb-4">
        {comments.map((comment) => (
          <ListGroup.Item key={comment.id}>{comment.comentario}</ListGroup.Item>
        ))}
      </ListGroup>
      <Form onSubmit={handleAddComment}>
        <Form.Group controlId="newComment">
          <Form.Control
            as="textarea"
            rows={3}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Escribe tu comentario aquí..."
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-2">
          Agregar Comentario
        </Button>
      </Form>
    </Container>
  );
};

export default CommentSection;
