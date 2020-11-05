const Card = require('../models/card.js');
const { errorCard, errorIdCard } = require('../utils/constants');
const { defineValidationError } = require('../utils/validation');
const { errorCode } = require('../utils/error-code');
const { hanlerErrors } = require('../utils/handler-error');

const getCards = (req, res) => {
  Card.find({})
    .populate(['likes', 'owner'])
    .then(data => {
      res.send(data);
    })
    .catch((err) => {
      hanlerErrors(err, res, errorIdCard);
    });
};

const postCards = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then(card => res.send({ card }))
    .catch(err => {
      if (err.name === 'ValidationError') {
        defineValidationError(err, res);
      } else {
        hanlerErrors(err, res, errorIdCard);
      }
    });
};

const deleteCards = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .orFail(() => {
      throw errorCode(errorCard);
    })
    .then(card => res.send({ card }))
    .catch(err => {
      hanlerErrors(err, res, errorIdCard);
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
      throw errorCode(errorCard);
    })
    .populate('likes')
    .then(card => res.send({ card }))
    .catch(err => {
      hanlerErrors(err, res, errorIdCard);
    });
};

const disLikeCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw errorCode(errorCard);
    })
    .populate('likes')
    .then(card => res.send({ card }))
    .catch(err => {
      hanlerErrors(err, res, errorIdCard);
    });
};

module.exports = {
  getCards,
  postCards,
  deleteCards,
  likeCard,
  disLikeCard,
};
