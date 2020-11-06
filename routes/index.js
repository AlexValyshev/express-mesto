const router = require('express').Router();

const usersRouter = require('./users.js');
const cardsRouter = require('./cards.js');
const { errorFind } = require('../utils/constants');

router.use('/', usersRouter);
router.use('/', cardsRouter);
router.use('/*', (req, res) => {
  res.status(404).send({ message: `${errorFind}` });
});

module.exports = router;
