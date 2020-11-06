const router = require('express').Router();

const {
  getUsers, getUser, postUsers, updateProfile, updateAvatar,
} = require('../controllers/users.js');

router.get('/users', getUsers);
router.get('/users/:userId', getUser);
router.post('/users', postUsers);
router.patch('/users/me', updateProfile);
router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
