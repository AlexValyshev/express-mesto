const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');

const regex = /https?:\/\/[www.]?[a-z0-9.-]{1,}\.[a-z]{2,3}[a-z0-9/.-=]?#?/;
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    validate: {
      validator(v) { // validator - функция проверки данных. v - значение свойства avatar
        return regex.test(v); // если проверка Url по требованиям прошла, то вернется true
      },
      message: 'Введена неправильная ссылка',
    },
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return isEmail(v);
      },
      message: 'Введён неправильный формат почты',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false,
  },
});

module.exports = mongoose.model('user', userSchema);
