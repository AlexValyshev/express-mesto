const { errorServer } = require('./constants');

module.exports.hanlerErrors = (err, res, errorId) => {
  if (err.kind === 'ObjectId') {
    res.status(400).send({ mesage: `${errorId}` });
  } else if (err.statusCode === 404) {
    res.status(404).send({ mesage: err.message });
  } else {
    res.status(500).send({ message: `${errorServer}` });
  }
};
