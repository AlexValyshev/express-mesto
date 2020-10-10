const express = require('express');
const path = require('path');
const router = require('./routes/index.js');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(router);

app.listen(PORT, () => {
  console.log(`App listening on port localhost:${PORT}`);
});
