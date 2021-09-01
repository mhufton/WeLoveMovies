function errorHandler(req, res, next) {
  const status = { status = 500, message = "Something went wrong!" } = error;
  res.status(status).json({ error: mesage })
};

module.exports = errorHandler;
