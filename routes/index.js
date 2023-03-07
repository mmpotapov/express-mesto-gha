const router = require('express').Router();

const {
  NOT_FOUND,
} = require('../utils/httpStatus');

const usersRouter = require('./users');
const cardsRouter = require('./cards');

/** Обработка запросов на /user, /cards и остальные адреса */
router.use('/users', usersRouter);
router.use('/cards', cardsRouter);
router.use('*', (req, res) => {
  res.status(NOT_FOUND).send({ message: 'Страница не найдена' });
});

module.exports = router;
