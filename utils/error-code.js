const errorCode = (errorName) => {
  const err = new Error(errorName);
  err.statusCode = 404;
  return err;
};

module.exports = {
  errorCode,
};
