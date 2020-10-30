const Card = require('../models/card.js');

const getCards = (req, res) => {
  Card.find({})
    .then(data => {
      res.send(data);
    })
    .catch(() => {
      res.status(500).send({ "mesage": "Файл с данными не найден" });
    });
};

const postCards = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then(card => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' })); // данные не записались, вернём ошибку
};

const deleteCards = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .then(card => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' })); // данные не записались, вернём ошибку
};

module.exports = {
  getCards,
  postCards,
  deleteCards
};
