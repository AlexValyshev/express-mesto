const path = require('path');
const readFile = require('../utils/read-file.js');
const jsonCards = path.join(__dirname, '..', 'data', 'cards.json');

const getCards = (req, res) => {
  readFile(jsonCards)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.send(err)
    })
}

module.exports = { getCards }
