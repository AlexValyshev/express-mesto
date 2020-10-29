const router = require('express').Router();
const { getUsers, getUser, postUsers } = require('../controllers/users.js');

router.get('/users', getUsers);
router.get('/users/:userId', getUser);
router.post('/users', postUsers);

module.exports = router;
