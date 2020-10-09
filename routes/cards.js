const router = require('express').Router();
const { getCards } = require('../controllers/get-cards.js');

router.get('/cards', getCards);

module.exports = router;
