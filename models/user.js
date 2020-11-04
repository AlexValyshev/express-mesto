const mongoose = require('mongoose');

const regex = /https?:\/\/[www.]?[a-z0-9/.-]+#?/;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  avatar: {
    type: String,
    validate: {
      validator(v) { // validator - функция проверки данных. v - значение свойства avatar
        return regex.test(v); // если проверка Url по требованиям прошла, то вернется true
      },
      message: 'Введите правильный Url', // когда validator вернёт false
    },
    required: true,
  },
});

module.exports = mongoose.model('user', userSchema);
