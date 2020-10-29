const mongoose = require('mongoose');

const regex = /https?:\/\/[www]?[a-z0-9/.-]+#?/;

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    validate: {
      validator(v) { // validator - функция проверки данных. v - значение свойства avatar
        return regex.test(v); // если проверка Url по требованиям прошла, то вернется true
      },
      message: 'Введите правильный Url', // когда validator вернёт false
    },
    required: true,
  },
  owner: {
    type: Object,
    required: true,
  },
  likes: {
    type: Array,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
