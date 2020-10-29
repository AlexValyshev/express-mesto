const User = require('../models/user.js');

const getUsers = (req, res) => {
  User.find({})
    .then(data => {
      res.send(data);
    })
    .catch(() => {
      res.status(500).send({ "mesage": "Файл с данными не найден" });
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then(user => {
      res.send(user);
      return user;
    })
    .then(user => {
      if (!user) {
        return res.status(404).send({ "message": "Нет пользователя с таким id" });
      }
      res.send(user);
    })
    .catch(() => {
      res.status(500).send({ "mesage": "Файл с данными не найден" });
    });
};

const postUsers = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' })); // данные не записались, вернём ошибку
};

module.exports = {
  getUsers,
  getUser,
  postUsers,
};
