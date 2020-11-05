const hanlerErrors = (err, res, errorId, errorServer) => {
  if (err.kind === 'ObjectId') {
    return res.status(400).send({ "mesage": `${errorId}` });
  }
  if (err.statusCode === 404) {
    // const { statusCode, message } = err;
    console.log(err);
    return res.status(404).send({ "mesage": err.message });
  }
  res.status(500).send({ "message": `${errorServer}` });
};

module.exports = {
  hanlerErrors
};
