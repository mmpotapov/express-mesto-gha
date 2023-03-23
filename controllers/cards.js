const Card = require('../models/card');

const {
  OK, CREATED,
} = require('../utils/httpStatus');

const BadRequestError = require('../errors/badRequestError');
const NotFoundError = require('../errors/notFoundError');
const ForbiddenError = require('../errors/forbiddenError');

/** /cards GET — получить список всех карточек */
module.exports.getAllCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send(cards))
    .catch(next);
};

/** /cards POST — загрузить на сервер новую карточку */
module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(CREATED).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Некорректный формат данных новой карточки'));
      }
      return next(err);
    });
};

/** /cards/:cardId DELETE — удалить с сервера указанную карточку пользователя */
module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }
      if (req.user._id !== card.owner.toString()) {
        throw new ForbiddenError('Нет прав для удаления карточки');
      }
      card.deleteOne().then(() => {
        res.status(OK).send({ message: 'Успешно удалено' });
      });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Ошибка при передаче данных о карточке'));
      }
      return next(err);
    });
};

/** /cards/:cardId/likes PUT — проставить лайк */
module.exports.addLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Ошибка при передаче данных о карточке'));
      }
      // res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка на сервере' });
      return next(err);
    });
};

/** /cards/:cardId/likes DELETE — убрать лайк */
module.exports.removeLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      } res.send(card);
    }).catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Ошибка при передаче данных о карточке'));
      }
      return next(err);
    });
};
