const { Error } = require('mongoose');
const Card = require('../models/card.js');

const getCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .then(data => {
      res.send(data);
    })
    .catch(() => {
      res.status(500).send({ "mesage": "Ошибка на стороне сервера" });
    });
};

const postCards = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then(card => res.send({ card }))
    .catch(err => {
      if (err.name === 'ValidationError') {
        const listErrors = Object.keys(err.errors);
        const messages = listErrors.map((item) => err.errors[item].message);
        res.status(400).send({ "message": `Переданы некорректные данные: ${messages.join(' ')}` });
      } else {
        res.status(500).send({ "mesage": "Ошибка на стороне сервера" });
      }
    });
};

const deleteCards = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .orFail(() => {
      const err = new Error('Карточка не найдена');
      err.statusCode = 404;
      throw err;
    })
    .then(card => res.send({ card }))
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(400).send({ "mesage": "Не корректный _id карточки" });
      }
      if (err.statusCode === 404) {
        return res.status(404).send({ "mesage": err.message });
      }
      res.status(500).send({ "mesage": "Ошибка на стороне сервера" });
    });
};

const likeCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      const err = new Error('Карточка не найдена');
      err.statusCode = 404;
      throw err;
    })
    .populate('likes')
    .then(card => res.send({ card }))
    .catch(err => {
      if (err.statusCode === 404) {
        return res.status(404).send({ "mesage": err.message });
      }
      res.status(500).send({ "mesage": "Ошибка на стороне сервера" });
    });
};

const disLikeCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .orFail(() => {
      const err = new Error('Карточка не найдена');
      err.statusCode = 404;
      throw err;
    })
    .populate('likes')
    .then(card => res.send({ card }))
    .catch(err => {
      if (err.statusCode === 404) {
        return res.status(404).send({ "mesage": err.message });
      }
      res.status(500).send({ "mesage": "Ошибка на стороне сервера" });
    });
};

module.exports = {
  getCards,
  postCards,
  deleteCards,
  likeCard,
  disLikeCard,
};
