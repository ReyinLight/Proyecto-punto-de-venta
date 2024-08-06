import connection from '../config/db.js';


export const getCommentsById = async (req, res, next) => {
    try {
        
        const [rows] = await connection.execute('SELECT * FROM comentarios WHERE idProducto = ?', [req.params.id]);

        
        res.json(rows);

    } catch (error) {
        next(error);
    }
};


export const createComment = async (req, res, next) => {
    try {
        const { idArticulo, comentario } = req.body;

        
        if (!idArticulo || !comentario) {
            return res.status(400).json({ message: 'Faltan datos requeridos' });
        }

        
        const [result] = await connection.execute(
            'INSERT INTO comentarios (idProducto, comentario) VALUES (?, ?)',
            [idArticulo, comentario]
        );

        
        res.status(201).json({ id: result.insertId, idArticulo, comentario });

    } catch (error) {
        next(error);
    }
};
