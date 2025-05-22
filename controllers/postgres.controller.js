const dbpg = require("../utils/db_postgres.js");

exports.createPostgres = async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required.' });
  }

  try {
    const result = await dbpg.query(
      'INSERT INTO posts (title, content) VALUES ($1, $2) RETURNING *',
      [title, content]
    );

    res.status(201).json({
      message: 'Post created successfully',
      post: result.rows[0]
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Internal server error',
      error: error.message
    });
  }
};

exports.listPosts = async (req, res) => {
  try {
    const result = await dbpg.query('SELECT * FROM posts');
    res.status(200).json(result.rows);
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Internal server error',
      error: error.message
    });
  }
};

exports.getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await dbpg.query('SELECT * FROM posts WHERE id = $1', [id]);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Internal server error',
      error: error.message
    });
  }
};

exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required.' });
  }

  try {
    const result = await dbpg.query(
      'UPDATE posts SET title = $1, content = $2 WHERE id = $3 RETURNING *',
      [title, content, id]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Internal server error',
      error: error.message
    });
  }
};

exports.deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await dbpg.query('DELETE FROM posts WHERE id = $1', [id]);
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Internal server error',
      error: error.message
    });
  }
};