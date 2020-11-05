const defineValidationError = (err, res, errorName) => {
  const listErrors = Object.keys(err.errors);
  const messages = listErrors.map((item) => err.errors[item].message);
  res.status(400).send({ "message": `${errorName} ${messages.join(',  ')}` });
};

module.exports = {
  defineValidationError
};
