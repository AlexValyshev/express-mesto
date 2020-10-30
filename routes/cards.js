const router = require('express').Router();
const { getCards, postCards, deleteCards } = require('../controllers/cards.js');

router.get('/cards', getCards);
router.post('/cards', postCards);
router.delete('/cards/:cardId', deleteCards);

module.exports = router;
