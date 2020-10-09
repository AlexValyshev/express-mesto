const express = require('express');
const usersRouter = require('./routes/users');
const { PORT = 3000 } = process.env;
const app = express();

app.use(express.static(__dirname + '/public'));
// app.use('/', usersRouter);


app.listen(PORT, () => {
  console.log(`App listening on port localhost:${PORT}`)
})

