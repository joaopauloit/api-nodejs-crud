/**
 * Arquivo: server.js
 * Descrição: 
 * Autor: João Paulo Rezende da Silva
 * Data de Criação: 24/05/2018
 */

//Configurar o setup da App:

//Importando os pacotes:
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var clientes = require('./app/routes/clientes');
var authentication = require('./app/security/authentication');
var verifyToken = require('./app/security/verifyToken');

//Configuração da variável app para usar o 'bodyParser()':
app.use(bodyParser.json());

//Definindo a porta onde será executada nossa api:
var port = process.env.port || 8000;

//Criando uma instância da Rotas via Express:
var router = express.Router();

//Todo request a api passará por essa função de callback primeiramente e podemos usar para log do lado do servidor
router.use(verifyToken, function(req, res, next){
    console.log('Alguém está fazendo requisição a api ;)');
    next();
});

//Rota que criamos para informar que a api está online
router.get('/online', function(req, res){
    res.json({message:'Beleza! Eu estou online =)'});
});

//Chamar routes clientes
router.use(clientes);

//Chamar routes authentication
router.use('/auth/', authentication);

//Definindo uma rota prefixada '/api':
//Todas chamadas começaram com '/api/', exemplo localhost:8000/api/usuarios
app.use('/api', router);

//Iniciando a aplicação (Servidor)
app.listen(port);
console.log("Iniciando a app na porta " + port);