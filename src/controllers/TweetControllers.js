import fs from 'fs';

function index(request, response) {
  const pathData = 'src/database.json';
  const encoding = 'utf-8';

  fs.readFile(pathData, encoding, (err, data) => {
    if (err) throw err;

    const allTweets = JSON.parse(data);
    const smallDatabase = allTweets.length <= 10;
    let latestTweets;

    (smallDatabase)
      ? latestTweets = allTweets
      : latestTweets = allTweets.slice(allTweets.length - 10);

    response.send(latestTweets);
  });
}

function sendMessage() {
  return 'Hello';
}

export { index, sendMessage };
