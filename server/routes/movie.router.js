const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', (req, res) => {
  const query = `
    SELECT * FROM "movies"
      ORDER BY "title" ASC;
  `;
  pool.query(query)
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all movies', err);
      res.sendStatus(500)
    })

});

router.get('/:id', (req, res) => {
  const movieId = req.params.id;

  const query = 'SELECT * FROM "movies" WHERE "id" = $1;';
  pool.query(query, [movieId])
      .then(result => {
        res.send(result.rows[0]);
      })
      .catch(err => {
        console.log('ERROR: Get movie details', err);
        res.sendStatus(500);
      });
});

router.post('/', (req, res) => {
  console.log(req.body);
  // RETURNING "id" will give us back the id of the created movie
  const insertMovieQuery = `
    INSERT INTO "movies" 
      ("title", "poster", "description")
      VALUES
      ($1, $2, $3)
      RETURNING "id";
  `;
  const insertMovieValues = [
    req.body.title,
    req.body.poster,
    req.body.description
  ]
  // FIRST QUERY MAKES MOVIE
  pool.query(insertMovieQuery, insertMovieValues)
    .then(result => {
      // ID IS HERE!
      console.log('New Movie Id:', result.rows[0].id);
      const createdMovieId = result.rows[0].id

      const genreIds = req.body.genre_ids;
      const insertMovieGenreQueries = genreIds.map((genreId) => {
        const insertMovieGenreQuery = `
          INSERT INTO "movies_genres" 
            ("movie_id", "genre_id")
            VALUES
            ($1, $2);
        `;
        const insertMovieGenreValues = [
          createdMovieId,
          genreId
        ];
        return pool.query(insertMovieGenreQuery, insertMovieGenreValues);
      });

      Promise.all(insertMovieGenreQueries)
        .then(() => {
          res.sendStatus(201);
        })
        .catch(err => {
          console.log('ERROR: Insert movie genres', err);
          res.sendStatus(500);
        });
    }).catch(err => { // 👈 Catch for first query
      console.log('ERROR: Insert movie', err);
      res.sendStatus(500);
    });
});

module.exports = router;

