const dbmysql = require("../utils/db_mysql.js");

exports.createMysql = async (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({ message: 'Title and content are required.' });
    }

    try {
        const [result] = await dbmysql.query(
            'INSERT INTO posts (title, content) VALUES (?, ?)',
            [title, content]
        );

        res.status(201).json({
            message: 'Post created successfully',
            postId: result.insertId
        });
    } catch (error) {
        console.error('MySQL insert error:', error);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
};

exports.listMysql = async (req, res) => {
    try {
        const [rows] = await dbmysql.query('SELECT * FROM posts');
        res.status(200).json(rows);
    } catch (error) {
        console.error('MySQL select all error:', error);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
};

exports.getMysql = async (req, res) => {
    const { id } = req.params;

    try {
        const [rows] = await dbmysql.query('SELECT * FROM posts WHERE id = ?', [id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.status(200).json(rows[0]);
    } catch (error) {
        console.error('MySQL get error:', error);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
};

exports.updateMysql = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({ message: 'Title and content are required.' });
    }

    try {
        const [result] = await dbmysql.query(
            'UPDATE posts SET title = ?, content = ? WHERE id = ?',
            [title, content, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.status(200).json({
            message: 'Post updated successfully'
        });
    } catch (error) {
        console.error('MySQL update error:', error);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
};

exports.deleteMysql = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await dbmysql.query('DELETE FROM posts WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error('MySQL delete error:', error);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
};