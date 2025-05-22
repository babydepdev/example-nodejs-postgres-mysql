const express = require('express');
const router = express.Router();

const { createPostgres, listPosts, getPost, updatePost, deletePost } = require('../controllers/postgres.controller.js');

router.post('/pg', createPostgres)
router.get('/pg', listPosts)
router.get('/pg/:id', getPost)
router.put('/pg/:id', updatePost)
router.delete('/pg/:id', deletePost)

module.exports = router