import express from 'express';
import fs from 'fs';

const routes = express.Router();

routes.get('/tweets', (req, res) => {
  const pathData = 'database.json';
  const encoding = 'utf-8';

  fs.readFile(pathData, encoding, (err, data) => {
    if (err) throw err;

    const allTweets = JSON.parse(data);
    const smallDatabase = allTweets.length <= 10;
    let latestTweets;

    (smallDatabase)
      ? latestTweets = allTweets
      : latestTweets = allTweets.slice(allTweets.length - 10);

    res.send(latestTweets);
  });
});

export default routes;
