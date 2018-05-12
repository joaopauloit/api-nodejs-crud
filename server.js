/**
 * Arquivo: server.js
 * Descrição: 
 * Autor: João Paulo Rezende da Silva
 * Data de Criação: 14/04/2018
 */

//Configurar o setup da App:

//Importando os pacotes:
var express = require('express');
var app = express();

//Definindo a porta onde será executada nossa api:
var port = process.env.port || 8000;

//Criando uma instância da Rotas via Express:
var router = express.Router();

//Todo request a api passará por essa função de callback primeiramente e podemos usar para log do lado do servidor
router.use(function(req, res, next){
    console.log('Alguém está fazendo requisição a api ;)');
    next();
});

//Rota que criamos para informar que a api está online
router.get('/online', function(req, res){
    res.json({message:'Beleza! Eu estou online =)'});
});

//Denifindo uma rota prefixada '/api':
//Todas chamadas começaram com '/api/', exemplo localhost:8000/api/usuarios
app.use('/api', router);

//Iniciando a aplicação (Servidor)
app.listen(port);
console.log("Iniciando a app na porta " + port);