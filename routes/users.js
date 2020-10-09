const router = require('express').Router();
const fsPromises = require('fs').promises;
const path = require('path');
const users = path.join(__dirname, '../data/users.json');
// const users = require('../data/users.json');

router.get('/users', (req, res) => {
  // if (!users[req.params.id]) {
  //   //const error = {error: 'Такого пользователя нет'}
  //   res.send({error: 'Такого пользователя нет'});
  //       return;
  // }
  fsPromises.readFile(users, { encoding: 'utf8' })
    .then((data) => {
      res.send(data);
      console.log(data);
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
