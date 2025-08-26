const db = require('../database/connection');

// Função para buscar todas as salas de aula
exports.getAllSalas = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM salasDeAula WHERE removido = false');
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Função para buscar uma sala de aula por ID
exports.getSalaByID = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db.query('SELECT * FROM salasdeaula WHERE salasdeaulaid = $1 AND removido = false', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Sala de aula não encontrada ou já removida.' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Função para inserir uma nova sala de aula
exports.insertSalas = async (req, res) => {
    try {
        const { descricao, localizacao, capacidade } = req.body;
        const result = await db.query(
            'INSERT INTO salasdeaula (descricao, localizacao, capacidade, removido) VALUES ($1, $2, $3, false) RETURNING *',
            [descricao, localizacao, capacidade]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Função para atualizar uma sala de aula
exports.updateSalas = async (req, res) => {
    try {
        const { id } = req.params;
        const { descricao, localizacao, capacidade } = req.body;
        const result = await db.query(
            'UPDATE salasdeaula SET descricao = $1, localizacao = $2, capacidade = $3 WHERE salasdeaulaid = $4 RETURNING *',
            [descricao, localizacao, capacidade, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Sala de aula não encontrada.' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Função para fazer o soft delete de uma sala de aula
exports.deleteSalas = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db.query(
            'UPDATE salasdeaula SET removido = true WHERE salasdeaulaid = $1 RETURNING *',
            [id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Sala de aula não encontrada.' });
        }
        res.status(200).json({ message: 'Sala de aula removida (soft delete) com sucesso.', sala: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};