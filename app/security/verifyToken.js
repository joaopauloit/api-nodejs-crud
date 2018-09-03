var jwt = require('jsonwebtoken');
var config = require('../../config');

var naoValidarToken = function(req){
  return req.originalUrl === '/api/auth/login' || req.originalUrl === '/api/auth/registrar';
}
function verifyToken(req, res, next) {

  if(naoValidarToken(req))
    return next();
    
  var token = req.headers['x-api-token'];
  if (!token)
    return res.status(403).send({ auth: false, message: 'Não foi fornecido o Token.' });
  jwt.verify(token, config.secret, function(err, decoded) {
    if (err)
    return res.status(500).send({ auth: false, message: 'Token inválido, realize a autenticação novamente.' });
    // if everything good, save to request for use in other routes
    req.userId = decoded.id;
    next();
  });
}
module.exports = verifyToken;