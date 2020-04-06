const jwt = require('jsonwebtoken');
const authConfig = require('../config/authConfig');

module.exports = (request, response, next) => {

  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).send({ error: 'no token provided' });
  }

  // const parts = authHeader.split(' ');

  // if (!parts.length === 2) {
  //   return response.status(401).send({ error: 'token error' });
  // }

  // console.log(parts.length);
  // console.log(authHeader);



  // const [scheme, token] = parts;

  // if (!/^Bearer$/i.test(scheme)) {
  //   return response.status(401).send({ error: 'token malformatted' });

  // }

  // console.log('scheme', scheme);
  // console.log('token', token);


  // if (!authHeader.startsWith('Bearer ')) {
  //   return response.status(401).send({ error: 'token malformatted' });
  // }


  jwt.verify(authHeader, authConfig.secret, (error, decoded) => {
    if (error) {
      return response.status(401).send({ error: 'token invalid' });
    }

    request.id = decoded.id;
    request.type = decoded.type;

    return next();
  });
};




