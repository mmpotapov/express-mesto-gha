const { INTERNAL_SERVER_ERROR } = require('../utils/httpStatus');

module.exports = (err, req, res, next) => {
  const statusCode = err.statusCode || INTERNAL_SERVER_ERROR;
  const message = statusCode === INTERNAL_SERVER_ERROR ? 'Произошла ошибка на сервере' : err.message;
  res.status(statusCode).send({ message });
  next();
};
