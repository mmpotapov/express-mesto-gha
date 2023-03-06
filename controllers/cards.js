const Card = require('../models/card');
// const testCards = require('../testCards.json');

module.exports.getAllCards = (req, res) => {
  // res.send(testCards);
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => console.log('Ошибка'));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send({ data: card }))
    .catch(() => console.log('Ошибка'));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } else {
        res.status('Карточка не найдена');
      }
    })
    .catch(() => console.log('Ошибка'));
};
