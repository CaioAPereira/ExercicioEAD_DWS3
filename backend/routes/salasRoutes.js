const express = require('express');
const router = express.Router();
const salasController = require('../apps/salasController');

// Rota para obter todas as salas
router.get('/salas-de-aula', salasController.getAllSalas);

// Rota para obter uma sala por ID
router.get('/salas-de-aula/:id', salasController.getSalaByID);

// Rota para inserir uma nova sala
router.post('/salas-de-aula', salasController.insertSalas);

// Rota para atualizar uma sala
router.put('/salas-de-aula/:id', salasController.updateSalas);

// Rota para "soft delete" de uma sala
router.delete('/salas-de-aula/:id', salasController.deleteSalas);

module.exports = router;