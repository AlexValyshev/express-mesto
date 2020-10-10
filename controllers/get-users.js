const path = require('path');
const readFile = require('../utils/read-file.js');

const jsonUsers = path.join(__dirname, '..', 'data', 'users.json');
const getUsers = (req, res) => {
  readFile(jsonUsers)
    .then(data => {
      res.send(data);
    })
    .catch(() => {
      res.status(500).send({ "mesage": "Файл с данными не найден" });
    });
};

const getUser = (req, res) => {
  const { id } = req.params;
  readFile(jsonUsers)
    .then(data => {
      const user = data.find(item => item._id === id);
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

module.exports = {
  getUsers,
  getUser,
};
