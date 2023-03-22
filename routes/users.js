const router = require('express').Router();

const {
  getAllUsers, getUser, updateUserInfo, updateUserAvatar,
} = require('../controllers/users');

/** Роутеры для /cards */
router.get('/', getAllUsers);
router.get('/:userId', getUser);
// router.post('/', createUser);
router.patch('/me', updateUserInfo);
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
