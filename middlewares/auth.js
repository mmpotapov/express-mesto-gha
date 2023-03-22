const jsonwebtoken = require('jsonwebtoken');
const {
  UNAUTHORIZED,
} = require('../utils/httpStatus');
const {
  SECRET_KEY,
} = require('../utils/constants');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(UNAUTHORIZED).send({ message: 'Необходима авторизация' });
  }
  const token = authorization.replace('Bearer ', '');

  let payload;
  try {
    payload = jsonwebtoken.verify(token, SECRET_KEY);
  } catch (err) {
    return res.status(UNAUTHORIZED).send({ message: 'Необходима авторизация' });
  }

  req.user = payload;
  return next();
};
