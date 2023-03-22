const jsonwebtoken = require('jsonwebtoken');
const {
  NOT_FOUND,
} = require('../utils/httpStatus');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(NOT_FOUND).send({ message: 'Необходима авторизация' });
  }
  const token = authorization.replace('Bearer ', '');

  let payload;
  try {
    payload = jsonwebtoken.verify(token, 'SOMERRRRRRRREEEEKEY');
  } catch (err) {
    return res.status(NOT_FOUND).send({ message: 'Необходима авторизация' });
  }

  req.user = payload;
  return next();
};
