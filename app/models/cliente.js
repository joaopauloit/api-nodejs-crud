/**
 * Arquivo: cliente.js
 * Author: João Paulo
 * Descrição: Classe modelo 'Cliente'
 * Data: 19/05/2018
*/

//Importando a biblioteca mongoose para usar o banco de dados MongoDB
var mongoose = require('mongoose');

//Atribuido o schema a variavel "Schema"
var Schema = mongoose.Schema;


/**
* Cliente:
* -> Id :Int
* -> Nome Fantasia: String
* -> Razao Social: String
* -> CNPJ: String
*/
//Criando um schema novo para ser armazenado.
var ClienteSchema = new Schema({
   nomeFantasia: String,
   razaoSocial: String,
   cnpj: String
});

//Exportando o novo schema
module.exports = mongoose.model('Cliente', ClienteSchema);