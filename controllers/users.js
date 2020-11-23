/* eslint-disable consistent-return */
// const bcrypt = require('bcryptjs');
const User = require('../models/user.js');
const {
  errorUser, errorIdUser, errorRegister, errorEmail,
} = require('../utils/constants');
const { defineValidationError } = require('../utils/validation');
const { errorCode } = require('../utils/error-code');
const { hanlerErrors } = require('../utils/handler-error');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => {
      hanlerErrors(err, res, errorIdUser);
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail(() => {
      throw errorCode(errorUser);
    })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      hanlerErrors(err, res, errorIdUser);
    });
};

// const login = (req, res) => {
//   const { email, password } = req.body;
//   User.findById(userId)
//     .orFail(() => {
//       throw errorCode(errorUser);
//     })
//     .then((user) => {
//       res.status(200).send(user);
//     })
//     .catch((err) => {
//       hanlerErrors(err, res, errorIdUser);
//     });
// };

const createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  if (!email || !password) {
    return res.status(400).send({ message: errorRegister });
  }
  User.create({
    name, about, avatar, email, password,
  })
    .then((user) => {
      console.log(res.code);
      res.status(200).send({
        email: user.email,
        _id: user._id,
      });
    })
    .catch((err) => {
      // res.send({ err: err.kind });
      if (err.name === 'ValidationError') {
        defineValidationError(err, res);
      } else {
        hanlerErrors(err, res, errorEmail);
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
      upsert: false,
    },
  )
    .orFail(() => {
      throw errorCode(errorUser);
    })
    .then((user) => res.status(200).send({ user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        defineValidationError(err, res);
      } else {
        hanlerErrors(err, res, errorIdUser);
      }
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
      upsert: false,
    },
  )
    .orFail(() => {
      throw errorCode(errorUser);
    })
    .then((user) => res.status(200).send({ user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        defineValidationError(err, res);
      } else {
        hanlerErrors(err, res, errorIdUser);
      }
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateProfile,
  updateAvatar,
};
