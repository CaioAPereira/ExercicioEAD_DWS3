const express = require('express');
const salasRoutes = require('./routes/salasRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para processar JSON no corpo da requisição
app.use(express.json());

// Usar as rotas de salas de aula
app.use('/api', salasRoutes);

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});