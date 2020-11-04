const User = require('../models/user.js');

const getUsers = (req, res) => {
  User.find({})
    .then(users => {
      res.send(users);
    })
    .catch(() => {
      res.status(500).send({ "mesage": "Ошибка на стороне сервера" });
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail(() => {
      const err = new Error('Пользователь не найден');
      err.statusCode = 404;
      throw err;
    })
    .then(user => {
      res.send(user);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(400).send({ "mesage": "Не корректный _id пользователя" });
      }
      if (err.statusCode === 404) {
        return res.status(404).send({ "mesage": err.message });
      }
      res.status(500).send({ "mesage": "Ошибка на стороне сервера" });
    });
};

const postUsers = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then(user => res.send({ user }))
    .catch(err => {
      if (err.name === 'ValidationError') {
        const listErrors = Object.keys(err.errors);
        const messages = listErrors.map((item) => err.errors[item].message);
        res.status(400).send({ "message": `Переданы некорректные данные: ${messages.join(' ')}` });
      } else {
        res.status(500).send({ "mesage": "Ошибка на стороне сервера" });
      }
    });
};

const updateProfile = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { name: 'Александр' },
    {
      new: true,
      runValidators: true
    }
  )
    .orFail(() => {
      const err = new Error('Пользователь не найден');
      err.statusCode = 404;
      throw err;
    })
    .then(user => res.send({ user }))
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(400).send({ "mesage": "Не корректный _id пользователя" });
      }
      if (err.statusCode === 404) {
        return res.status(404).send({ "mesage": err.message });
      }
      res.status(500).send({ "mesage": "Ошибка на стороне сервера" });
    });
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
    .orFail(() => {
      const err = new Error('Пользователь не найден');
      err.statusCode = 404;
      throw err;
    })
    .then(user => res.send({ user }))
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(400).send({ "mesage": "Не корректный _id пользователя" });
      }
      if (err.statusCode === 404) {
        return res.status(404).send({ "mesage": err.message });
      }
      res.status(500).send({ "mesage": "Ошибка на стороне сервера" });
    });
};

module.exports = {
  getUsers,
  getUser,
  postUsers,
  updateProfile,
  updateAvatar,
};
