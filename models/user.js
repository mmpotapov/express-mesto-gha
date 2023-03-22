const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

/** Схема для данных о пользователе */
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: 'Неверный формат электронной почты',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

/** Метод для авторизации */
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return console.log('Текущий пользователь не найден');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return console.log('Текущий пользователь не найден');
          }
          return user;
        });
    });
};

/** Создание и экспорт модели */
module.exports = mongoose.model('user', userSchema);
