const User = require('../models/user.js');
const {
  errorServer, errorData, errorUser, errorIdUser
} = require('../utils/constants');
const { defineValidationError } = require('../utils/validation');

const getUsers = (req, res) => {
  User.find({})
    .then(users => {
      res.send(users);
    })
    .catch(() => {
      res.status(500).send({ "message": `${errorServer}` });
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail(() => {
      const err = new Error(errorUser);
      err.statusCode = 404;
      throw err;
    })
    .then(user => {
      res.send(user);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(400).send({ "mesage": `${errorIdUser}` });
      }
      if (err.statusCode === 404) {
        return res.status(404).send({ "mesage": err.message });
      }
      res.status(500).send({ "message": `${errorServer}` });
    });
};

const postUsers = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then(user => res.send({ user }))
    .catch(err => {
      if (err.name === 'ValidationError') {
        defineValidationError(err, res, errorData);
      } else {
        res.status(500).send({ "message": `${errorServer}` });
      }
    });
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
      upsert: false
    }
  )
    .orFail(() => {
      const err = new Error(errorUser);
      err.statusCode = 404;
      throw err;
    })
    .then(user => res.send({ user }))
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(400).send({ "mesage": `${errorIdUser}` });
      }
      if (err.statusCode === 404) {
        return res.status(404).send({ "mesage": err.message });
      }
      res.status(500).send({ "message": `${errorServer}` });
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
      upsert: false
    }
  )
    .orFail(() => {
      const err = new Error(errorUser);
      err.statusCode = 404;
      throw err;
    })
    .then(user => res.send({ user }))
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(400).send({ "mesage": `${errorIdUser}` });
      }
      if (err.statusCode === 404) {
        return res.status(404).send({ "mesage": err.message });
      }
      res.status(500).send({ "message": `${errorServer}` });
    });
};

module.exports = {
  getUsers,
  getUser,
  postUsers,
  updateProfile,
  updateAvatar,
};
