const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/:id', (req, res) => {
  const movieId = req.params.id;

  const query = `SELECT * FROM "genres" 
                JOIN "movies_genres" ON "genres"."id" = "movies_genres"."genre_id" 
                WHERE "movies_genres"."movie_id" = $1;`;
  pool.query(query, [movieId])
      .then(result => {
        res.send(result.rows);
      })
      .catch(err => {
        console.log('ERROR: Get movie details', err);
          res.sendStatus(500);
      });
});

router.get('/', (req, res) => {
  const query = 'SELECT * FROM "genres";';
  pool.query(query)
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all genres', err);
      res.sendStatus(500);
    });
});

module.exports = router;