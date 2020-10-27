const router = require('express').Router();
const { getUsers, getUser } = require('../controllers/get-users.js');
const { postUsers } = require('../controllers/post-users');

router.get('/users', getUsers);
router.get('/users/:userId', getUser);
router.post('/users', postUsers);

module.exports = router;
