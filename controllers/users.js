const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const User = require('../models/user');

const {
  CREATED,
} = require('../utils/httpStatus');
const {
  SECRET_KEY,
} = require('../utils/constants');

const BadRequestError = require('../errors/badRequestError');
const NotFoundError = require('../errors/notFoundError');
const ConflictError = require('../errors/conflictError');

/** /users GET — получить список всех пользователей */
module.exports.getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

/** /users/:userId GET — получить инфо о пользователе по id */
module.exports.getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Некорректный ID пользователя'));
      }
      return next(err);
    });
};

/** /signup POST — добавить нового пользователя */
module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name, about, avatar, email, password: hash,
      })
        .then(() => res.status(CREATED).send({
          name, about, avatar, email,
        }))
        .catch((err) => {
          if (err.name === 'ValidationError') {
            return next(new BadRequestError('Некорректный формат данных нового пользователя'));
          }
          if (err.code === 11000) {
            return next(new ConflictError('Пользователь уже зарегистрирован на сайте'));
          }
          return next(err);
        });
    });
};

/** /users/me PATCH — обновить информацию о пользователе  */
module.exports.updateUserInfo = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
    upsert: false,
  })
    .then((updatedUser) => {
      if (!updatedUser) {
        throw new NotFoundError('Текущий пользователь не найден');
      }
      res.send(updatedUser);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Ошибка при передаче новых данных о пользователе'));
      }
      return next(err);
    });
};

/** /users/me/avatar PATCH — обновить аватар пользователя  */
module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
    upsert: false,
  })
    .then((updatedUser) => {
      if (!updatedUser) {
        throw new NotFoundError('Текущий пользователь не найден');
      }
      res.send(updatedUser);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Ошибка при передаче нового аватара для пользователя'));
      }
      return next(err);
    });
};

/** /signin POST — авторизация */
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const jwt = jsonwebtoken.sign({ _id: user._id }, SECRET_KEY, { expiresIn: '7d' });
      res.send({ token: jwt });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Некорректный формат введённых данных'));
      }
      return next(err);
    });
};

/** /users/me GET — получить инфо о текущем пользователе */
module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.send(user);
    })
    .catch(next);
};
