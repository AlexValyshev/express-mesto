const User = require('../models/user.js');
const { errorUser, errorIdUser } = require('../utils/constants');
const { defineValidationError } = require('../utils/validation');
const { errorCode } = require('../utils/error-code');
const { hanlerErrors } = require('../utils/handler-error');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
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
      res.send(user);
    })
    .catch((err) => {
      hanlerErrors(err, res, errorIdUser);
    });
};

const postUsers = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        defineValidationError(err, res);
      } else {
        hanlerErrors(err, res, errorIdUser);
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
    .then((user) => res.send({ user }))
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
    .then((user) => res.send({ user }))
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
  postUsers,
  updateProfile,
  updateAvatar,
};
