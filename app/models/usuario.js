/**
 * Arquivo: usuario.js
 * Author: João Paulo
 * Descrição: Classe modelo 'User'
 * Data: 06/08/2018
*/

//Importando a biblioteca mongoose para usar o banco de dados MongoDB
var mongoose = require('mongoose');

//Atribuido o schema a variavel "Schema"
var Schema = mongoose.Schema;

/**
* Usuario:
* -> Id :Int
* -> Nome: String
* -> Email: String
* -> Password: String
*/
//Criando um schema novo para ser armazenado.
var UsuarioSchema = new Schema({
   nome: String,
   email: String,
   password: String
});

//Exportando o novo schema
module.exports = mongoose.model('usuario', UsuarioSchema);