// AuthController.js
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var Usuario = require('../models/usuario');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../../config');
var verifyToken = require('../security/verifyToken');

router.post('/registrar', function(req, res) {
  
    //gerando hash com a senha
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    
    Usuario.create({
      nome : req.body.nome,
      email : req.body.email,
      password : hashedPassword
    },
    function (err, Usuario) {
      if (err) return res.status(500).send("Ocorreu um erro ao registrar o usuário.")
      // Criando o token
      var token = jwt.sign({ id: Usuario._id }, config.secret, {
        expiresIn: config.expiresIn //Tempo que expira a chave
      });
      res.status(200).send({ auth: true, token: token });
    }); 
});

//Recurso utilizado para validar token
router.get('/validartoken', verifyToken, function(req, res, next) {     
      //Recuperando dados do usuário
    Usuario.findById(req.userId,{ password: 0 }, function (err, user) {
        if (err) return res.status(500).send('Ocorreu um erro inesperado no servidor.');
        if (!user) return res.status(404).send('Usuário não encontrato.');
        
        res.status(200).send(user);
    });
});

router.post('/login', function(req, res) {
    Usuario.findOne({ email: req.body.email }, function (err, user) {
      if (err) return res.status(500).send('Ocorreu um erro inesperado no servidor.');
      if (!user) return res.status(404).send('Usuário não encontrato.');

      var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: config.expiresIn //Tempo que expira a chave
      });
      res.status(200).send({ auth: true, token: token });
    });
});

//Exportando os recursos da authentication
module.exports = router;