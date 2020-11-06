const router = require('express').Router();

const {
  getCards, postCards, deleteCards, likeCard, disLikeCard,
} = require('../controllers/cards.js');

router.get('/cards', getCards);
router.post('/cards', postCards);
router.delete('/cards/:cardId', deleteCards);
router.put('/cards/:cardId/likes', likeCard);
router.delete('/cards/:cardId/likes', disLikeCard);

module.exports = router;
