const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { regexURL } = require('../utils/validation');

const {
  getAllUsers, getUser, updateUserInfo, updateUserAvatar, getCurrentUser,
} = require('../controllers/users');

/** Роутеры для /users с Joi валидацией */
router.get('/', getAllUsers);

router.get('/me', getCurrentUser);

router.get(
  '/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().length(24).hex().required(),
    }),
  }),
  getUser,
);

router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  updateUserInfo,
);

router.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().pattern(regexURL),
    }),
  }),
  updateUserAvatar,
);

module.exports = router;
