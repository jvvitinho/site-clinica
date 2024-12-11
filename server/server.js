const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql2');

const app = express();
const port = 5000;

// Configuração do banco de dados
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'clinica_db'
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados MySQL');
});

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rota de login
app.post('/auth/login', (req, res) => {
  const { cnpj, password } = req.body;
  const query = 'SELECT * FROM empresas WHERE cnpj = ? AND senha = ?';
  
  db.query(query, [cnpj, password], (err, results) => {
    if (err) {
      console.error('Erro na consulta:', err);
      return res.status(500).json({ message: 'Erro no servidor.' });
    }
    if (results.length > 0) {
      res.status(200).json({ message: 'Login realizado com sucesso!' });
    } else {
      res.status(401).json({ message: 'CNPJ ou senha inválidos.' });
    }
  });
});

// Rota de recuperação de senha
app.post('/auth/forgot-password', (req, res) => {
  const { cnpj } = req.body;
  const query = 'SELECT * FROM empresas WHERE cnpj = ?';
  
  db.query(query, [cnpj], (err, results) => {
    if (err) {
      console.error('Erro na consulta:', err);
      return res.status(500).json({ message: 'Erro no servidor.' });
    }
    if (results.length > 0) {
      res.status(200).json({ message: 'Instruções enviadas para o e-mail cadastrado.' });
    } else {
      res.status(404).json({ message: 'CNPJ não encontrado.' });
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});