const express = require('express');
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.static('public'));

app.post('/login', (req, res) => {
    const { cnpj, password } = req.body;
    if (cnpj === '49.053.569/0001-04' && password === '123123') {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
