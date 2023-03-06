const mongoose = require('mongoose');
const User = require('../models/user');
// const testUser = require('../testUser.json');

module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => console.log('Ошибка'));
  // res.send(testUser)
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        console.log('Юзер не найден');
      }
    })
    .catch(() => console.log('Ошибка'));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(200).send({ data: user }))
    .catch(() => console.log('Ошибка'));
};
