const router = require('express').Router();

const {
  getAllUsers, getUser, updateUserInfo, updateUserAvatar, getCurrentUser,
} = require('../controllers/users');

/** Роутеры для /users */
router.get('/', getAllUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', getUser);
router.patch('/me', updateUserInfo);
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
