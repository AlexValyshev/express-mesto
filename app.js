const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/index.js');

const { PORT = 3000 } = process.env;
const app = express();
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  req.user = {
    _id: '5f9b12363357b21414d42a1a'
  };

  next();
});
app.use(router);
app.listen(PORT, () => {
  console.log(`App listening on port localhost:${PORT}`);
});
