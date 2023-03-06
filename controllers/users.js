const User = require('../models/user');

module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка на сервере' }));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Пользователь не найден' });
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Некорректный ID пользователя' });
        return;
      }
      res.status(500).send({ message: 'Произошла ошибка на сервере' });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Некорректный формат данных нового пользователя' });
        return;
      }
      res.status(500).send({ message: 'Произошла ошибка на сервере' });
    });
};

module.exports.updateUserInfo = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
    upsert: false,
  })
    .then((updatedUser) => {
      if (!updatedUser) {
        res.status(404).send('Текущий пользователь не найден');
        return;
      }
      res.send(updatedUser);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(400).send({ message: 'Ошибка при передаче новых данных о пользователе' });
        return;
      }
      res.status(500).send({ message: 'Произошла ошибка на сервере' });
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
    upsert: false,
  })
    .then((updatedUser) => {
      if (!updatedUser) {
        res.status(404).send('Текущий пользователь не найден');
        return;
      }
      res.send(updatedUser);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(400).send({ message: 'Ошибка при передаче нового аватара для пользователя' });
        return;
      }
      res.status(500).send({ message: 'Произошла ошибка на сервере' });
    });
};
