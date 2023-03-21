const mongoose = require('mongoose');
// const validator = require('validator');

/** Схема для данных о пользователе */
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
  },
});

/** Создание и экспорт модели */
module.exports = mongoose.model('user', userSchema);
