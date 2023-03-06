const router = require('express').Router();

const {
  getAllCards, createCard, deleteCard, addLike, removeLike,
} = require('../controllers/cards');

/** Роутеры для /users */
router.get('/', getAllCards);
router.post('/', createCard);
router.delete('/:cardId', deleteCard);
router.put('/:cardId/likes', addLike);
router.delete('/:cardId/likes', removeLike);

module.exports = router;
