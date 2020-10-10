const router = require('express').Router();
const usersRouter = require('./users.js');
const cardsRouter = require('./cards.js');

router.use('/', usersRouter);
router.use('/', cardsRouter);
router.use('/*', (req, res) => {
  res.send({ "message": "Запрашиваемый ресурс не найден" });
});

module.exports = router;
