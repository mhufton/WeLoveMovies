const knex = require("../db/connection");

async function read(movie_id) {
  return knex("movies")
    .where({ movie_id })
    .first();
}

function list(isShowing) {
  return knex(`movies as m`)
    .select("m.*")
    .modify((queryBuilder) => {
      if (isShowing) {
        queryBuilder
          .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
          .where({ "mt.is_showing": true })
          .groupBy("m.movie_id");
      }
    });
}

module.exports = {
  list,
  read,
};