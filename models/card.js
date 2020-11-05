const mongoose = require('mongoose');

const regex = /https?:\/\/[w{3}.]?[a-z0-9/.-=]#?/;

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
<<<<<<< HEAD
      validator(v) { // validator - функция проверки данных. v - значение свойства link
        return regex.test(v); // если проверка Url по требованиям прошла, то вернется true
=======
      validator(v) {
        return regex.test(v);
>>>>>>> ada5229a62c3624a5269bf1d9a3c540f2098c530
      },
      message: 'Введена неправильная ссылка',
    },
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    default: [],
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    }],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
