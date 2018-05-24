/**
 * Arquivo: server.js
 * Descrição: 
 * Autor: João Paulo Rezende da Silva
 * Data de Criação: 14/04/2018
 */

//Configurar o setup da App:

//Importando os pacotes:
var bodyParser = require('body-parser');
var express = require('express');
var app = express();

//Importando a biblioteca mongoose para usar o banco de dados MongoDB
var mongoose = require('mongoose');

//Importando nossa function cliente (Em OO seria uma classe)
var Cliente = require('./app/models/cliente');

//URI MLab
mongoose.connect('mongodb://<dbuser>:<dbpassword>@<enviroment>:<port>/<database>');
mongoose.Promise = global.Promise;

//Configuração da variável app para usar o 'bodyParser()':
app.use(bodyParser.json());

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

//Rotas da nossa api
router.route('/clientes')
    /* 1) Recurso para criar cliente (acessar em POST http://localhost:8000/api/clientes)*/
    .post(function(req, res){

        var cliente = new Cliente();
        cliente.nomeFantasia = req.body.nomeFantasia;
        cliente.razaoSocial = req.body.razaoSocial;
        cliente.cnpj = req.body.cnpj;

        cliente.save(function(error){
            if(error){                
                res.send('Erro ao tentar salvar o cliente....: ' + error);
            }
            else{
                res.json({ message:'cliente cadastrado com sucesso!' });
            }
        });
    });

//Denifindo uma rota prefixada '/api':
//Todas chamadas começaram com '/api/', exemplo localhost:8000/api/usuarios
app.use('/api', router);

//Iniciando a aplicação (Servidor)
app.listen(port);
console.log("Iniciando a app na porta " + port);