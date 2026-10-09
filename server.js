const express = require('express');
const cors = require('cors'); // <--- Adicionar esta linha

const app = express();

app.use(cors()); // <--- Libera o acesso para o React
app.use(express.json());

// Importação das rotas...
const adotanteController = require('./Controller/adotanteController');
const petController = require('./Controller/petController');
const matchController = require('./Controller/matchController');
const adocaoController = require('./Controller/adocaoController');

app.use('/adotantes', adotanteController);
app.use('/pets', petController);
app.use('/match', matchController);
app.use('/adocao', adocaoController);

app.listen(3000, () => {
    console.log('PetMatch API rodando em http://localhost:3000');
});