const router = require('express').Router();
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');

const {
  NOT_FOUND,
} = require('../utils/httpStatus');

/** Импорт роутеров на /users и /cards */
const usersRouter = require('./users');
const cardsRouter = require('./cards');

/** Обработка запросов на /signup и /signin */
router.post('/signup', createUser);
router.post('/signin', login);

/** Обработка запросов на /users, /cards и все остальные адреса */
router.use('/users', auth, usersRouter);
router.use('/cards', auth, cardsRouter);
router.use('*', auth, (req, res) => {
  res.status(NOT_FOUND).send({ message: 'Страница не найдена' });
});

module.exports = router;
