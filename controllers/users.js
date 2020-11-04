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

const updateProfile = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { name: 'Александр' },
    {
      new: true,
      runValidators: true,
      upsert: true
    }
  )
    .then(user => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' })); // данные не записались, вернём ошибку
};

const updateAvatar = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: 'https://images.unsplash.com/photo-1542903660-eedba2cda473?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80' },
    {
      new: true,
      runValidators: true,
      upsert: true
    }
  )
    .then(user => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' })); // данные не записались, вернём ошибку
};

module.exports = {
  getUsers,
  getUser,
  postUsers,
  updateProfile,
  updateAvatar,
};
