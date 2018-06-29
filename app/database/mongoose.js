//Importando a biblioteca mongoose para usar o banco de dados MongoDB
var mongoose = require('mongoose');

//URI MLab
mongoose.connect('mongodb://<dbuser>:<dbpassword>@<enviroment>:<port>/<database>');
mongoose.Promise = global.Promise;


module.exports = mongoose;