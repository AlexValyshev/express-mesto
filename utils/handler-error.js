const { errorServer } = require('./constants');

const hanlerErrors = (err, res, errorId) => {
  if (err.kind === 'ObjectId') {
    return res.status(400).send({ "mesage": `${errorId}` });
  }
  if (err.statusCode === 404) {
    return res.status(404).send({ "mesage": err.message });
  }
  res.status(500).send({ "message": `${errorServer}` });
};

module.exports = {
  hanlerErrors
};
