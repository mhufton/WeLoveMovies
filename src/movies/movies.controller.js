const service = require("./movies.service.js")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

// Middleware
async function movieExists(req, res, next) {
    const { movieId } = req.params;
    const NumMovieId = Number(movieId);
    const data = await service.read(NumMovieId);
    if (data) {
      res.locals.movie = data;
      return next();
    }
    res.status(404).json({ error: `Movie cannot be found` });
  }


async function read(req, res) {
    res.json({ data: res.locals.movie });
  }


async function list(req, res) {
    const data = await service.list(req.query.is_showing);
    res.json({ data: data });
  }


module.exports = {
read: [asyncErrorBoundary(movieExists), read],
list: asyncErrorBoundary(list),
};
