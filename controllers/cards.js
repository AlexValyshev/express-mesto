const Card = require('../models/card.js');
const {
  errorServer, errorData, errorCard, errorIdCard
} = require('../utils/constants');
const { defineValidationError } = require('../utils/validation');
// const Error404 = require('../utils/Error404.js');
const { hanlerErrors } = require('../utils/handler-error');

const getCards = (req, res) => {
  Card.find({})
    .populate(['likes', 'owner'])
    .then(data => {
      res.send(data);
    })
    .catch(() => {
      res.status(500).send({ "message": `${errorServer}` });
    });
};

const postCards = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then(card => res.send({ card }))
    .catch(err => {
      if (err.name === 'ValidationError') {
        defineValidationError(err, res, errorData);
      } else {
        res.status(500).send({ "message": `${errorServer}` });
      }
    });
};

const deleteCards = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .orFail(() => {
      const err = new Error(errorCard);
      err.statusCode = 404;
      throw err;
    })
    .then(card => res.send({ card }))
    .catch(err => {
      hanlerErrors(err, res, errorIdCard, errorServer);
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
      const err = new Error(errorCard);
      err.statusCode = 404;
      throw err;
    })
    .populate('likes')
    .then(card => res.send({ card }))
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(400).send({ "mesage": `${errorIdCard}` });
      }
      if (err.statusCode === 404) {
        return res.status(404).send({ "mesage": err.message });
      }
      res.status(500).send({ "message": `${errorServer}` });
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
      const err = new Error(errorCard);
      err.statusCode = 404;
      throw err;
    })
    .populate('likes')
    .then(card => res.send({ card }))
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(400).send({ "mesage": `${errorIdCard}` });
      }
      if (err.statusCode === 404) {
        return res.status(404).send({ "mesage": err.message });
      }
      res.status(500).send({ "message": `${errorServer}` });
    });
};

module.exports = {
  getCards,
  postCards,
  deleteCards,
  likeCard,
  disLikeCard,
};
