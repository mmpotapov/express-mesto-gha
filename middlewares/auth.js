const jsonwebtoken = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorizedError');
const {
  SECRET_KEY,
} = require('../utils/constants');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }
  const token = authorization.replace('Bearer ', '');

  let payload;
  try {
    payload = jsonwebtoken.verify(token, SECRET_KEY);
  } catch (err) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  req.user = payload;
  return next();
};
