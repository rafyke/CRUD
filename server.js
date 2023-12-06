// server.js
const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Middleware para servir arquivos estáticos (HTML, CSS, JS, imagens, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Rota para a página inicial
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Inicie o servidor
app.listen(port, () => {
  console.log(`Servidor está rodando em http://localhost:${port}`);
});