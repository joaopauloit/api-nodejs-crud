var express = require('express');
var app = express();

//Importando nossa function cliente (Em OO seria uma classe)
var Cliente = require('../models/cliente');

//Importando nossa function de acesso a dados mongoose
var mongoose = require('../database/mongoose');

var router = express.Router();
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
                res.status(500).send('Erro ao tentar salvar o cliente....: ' + error);
            }
            else{
                res.json({ message:'cliente cadastrado com sucesso!' });
            }
        });
    })
    /* 2) Recurso para recuperar todos clientes (acessar em Get http://localhost:8000/api/clientes)*/
    .get(function(req, res){
        Cliente.find(function(error, clientes){
            if(error){
                res.status(500).send('Erro ao tentar recuperar os clientes....: ' + error);
            }
            else{
                res.json(clientes);
            }
        });
    });
    /* 3) Recurso para recuperar cliente por id (acessar em Get http://localhost:8000/api/clientes/id/:id)*/
    router.route('/clientes/id/:id')
    .get(function(req, res){
        var id = req.params.id;
        Cliente.findById(id, function(error, cliente){
            if(error){
                res.status(500).send('Erro ao tentar recuperar o cliente....: ' + error);
            }
            else{
                if(cliente){
                    res.json(cliente);
                }
                else{
                    res.status(404).json({ message:'cliente não encontrado!' });
                }
            }
        });
    })
    /* 4) Recurso para atualizar dados do cliente (acessar em PUT http://localhost:8000/api/clientes/id/:id)*/
    .put(function(req, res){
        var id = req.params.id;
        Cliente.findById(id, function(error, cliente){
            if(error){
                res.status(500).send('Erro ao tentar recuperar o cliente....: ' + error);
            }
            else{
                if(cliente){
                    var nomeFantasia = req.body.nomeFantasia;
                    var razaoSocial = req.body.razaoSocial;
                    var cnpj = req.body.cnpj;

                    Cliente.update({ _id: id }, { $set: { 
                            nomeFantasia: nomeFantasia,
                            razaoSocial: razaoSocial,
                            cnpj: cnpj,
                        } },function(error){
                        if(error){                
                            res.status(500).send('Erro ao tentar atualizar o cliente....: ' + error);
                        }
                        else{
                            res.json({ message:'cliente atualizado com sucesso!' });
                        }
                    });
                }
                else{
                    res.status(404).json({ message:'cliente não encontrado!' });
                }
            }
        });
    })
    /* 5) Recurso para deletar dados do cliente (acessar em DELETE http://localhost:8000/api/clientes/id/:id)*/
    .delete(function(req, res){
        var id = req.params.id;
        Cliente.findById(id, function(error, cliente){
            if(error){
                res.status(500).send('Erro ao tentar recuperar o cliente....: ' + error);
            }
            else{
                if(cliente){
                    
                    Cliente.deleteOne({ _id: id }, function(error){
                        if(error){                
                            res.status(500).send('Erro ao tentar deletar o cliente....: ' + error);
                        }
                        else{
                            res.json({ message:'cliente deletado com sucesso!' });
                        }
                    });
                }
                else{
                    res.status(404).json({ message:'cliente não encontrado!' });
                }
            }
        });
    });

module.exports = router;