// const path = require('path');
// const readFile = require('../utils/read-file.js');
const User = require('../models/user.js');

// const jsonUsers = path.join(__dirname, '..', 'data', 'users.json');;
const postUsers = (req, res) => {
  // readFile(jsonUsers);
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' })); // данные не записались, вернём ошибку
};

module.exports = {
  postUsers,
};
