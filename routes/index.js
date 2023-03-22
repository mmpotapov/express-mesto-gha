const router = require('express').Router();
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');

const {
  NOT_FOUND,
} = require('../utils/httpStatus');

const usersRouter = require('./users');
const cardsRouter = require('./cards');

/** Обработка запросов на /user, /cards и остальные адреса */
router.post('/signup', createUser);
router.post('/signin', login);
router.use('/users', auth, usersRouter);
router.use('/cards', auth, cardsRouter);
// router.use('/users', usersRouter);
// router.use('/cards', cardsRouter);
router.use('*', auth, (req, res) => {
  res.status(NOT_FOUND).send({ message: 'Страница не найдена' });
});

module.exports = router;
