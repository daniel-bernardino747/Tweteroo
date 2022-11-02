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

function sendMessage(request, response) {
  const { username, tweet } = request.body;

  if (!tweet || !username) {
    return response.status(400).json({ error: 'Missing username or tweet.' });
  }

  try {
    const pathTweets = './src/datas/tweetsData.json';
    const encoding = 'utf-8';

    fs.readFile(pathTweets, encoding, (err, data) => {
      if (err) throw err;

      const allTweets = JSON.parse(data);
      allTweets.push(request.body);

      const updateTweets = JSON.stringify(allTweets);

      fs.writeFile(pathTweets, updateTweets, (error) => {
        if (error) throw error;
      });
    });

    return response.send('OK');
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
}

export { index, sendMessage };
