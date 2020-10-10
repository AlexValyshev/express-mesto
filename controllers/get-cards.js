const path = require('path');
const readFile = require('../utils/read-file.js');

const jsonCards = path.join(__dirname, '..', 'data', 'cards.json');

const getCards = (req, res) => {
  readFile(jsonCards)
    .then(data => {
      res.send(data);
    })
    .catch(() => {
      res.status(500).send({ "mesage": "Файл с данными не найден" });
    });
};

module.exports = { getCards };
