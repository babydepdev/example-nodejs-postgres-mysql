const express = require('express');
const router = express.Router();

const { createMysql, listMysql, getMysql, updateMysql, deleteMysql } = require('../controllers/mysql.controller.js');

router.post('/mysql', createMysql)
router.get('/mysql', listMysql)
router.get('/mysql/:id', getMysql)
router.put('/mysql/:id', updateMysql)
router.delete('/mysql/:id', deleteMysql)

module.exports = router