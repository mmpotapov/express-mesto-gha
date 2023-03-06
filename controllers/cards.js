const Card = require('../models/card');

/** /cards GET — получить список всех карточек */
module.exports.getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка на сервере' }));
};

/** /cards POST — загрузить на сервер новую карточку */
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Некорректный формат данных новой карточки' });
        return;
      }
      res.status(500).send({ message: 'Произошла ошибка на сервере' });
    });
};

/** /cards/:cardId DELETE — удалить с сервера указанную карточку */
module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(404).send('Карточка не найдена');
        return;
      } res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Ошибка при передаче данных о карточке' });
        return;
      }
      res.status(500).send({ message: 'Произошла ошибка на сервере' });
    });
};

/** /cards/:cardId/likes PUT — проставить лайк */
module.exports.addLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(404).send('Карточка не найдена');
        return;
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(400).send({ message: 'Ошибка при передаче данных о карточке' });
        return;
      }
      res.status(500).send({ message: 'Произошла ошибка на сервере' });
    });
};

/** /cards/:cardId/likes DELETE — убрать лайк */
module.exports.removeLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(404).send('Карточка не найдена');
        return;
      } res.send(card);
    }).catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(400).send({ message: 'Ошибка при передаче данных о карточке' });
        return;
      }
      res.status(500).send({ message: 'Произошла ошибка на сервере' });
    });
};
