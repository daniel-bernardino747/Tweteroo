import fs from 'fs';

function index(request, response) {
  const undefinedUserImage = 'https://secure.gravatar.com/avatar/a2bbf191a58629f141850123542fefc5?s=96&d=https%3A%2F%2Fstatic.teamtreehouse.com%2Fassets%2Fcontent%2Fdefault_avatar-ea7cf6abde4eec089a4e03cc925d0e893e428b2b6971b12405a9b118c837eaa2.png&r=pg';
  const pathTweetsData = 'src/datas/tweetsData.json';
  const pathUsersData = 'src/datas/usersData.json';
  const encoding = 'utf-8';
  let latestTweets;

  const fd = fs.readFileSync(pathUsersData, encoding);
  const allUsers = JSON.parse(fd);

  fs.readFile(pathTweetsData, encoding, (err, data) => {
    if (err) throw err;

    const allTweets = JSON.parse(data);
    const smallDatabase = allTweets.length <= 10;

    (smallDatabase)
      ? latestTweets = allTweets
      : latestTweets = allTweets.slice(allTweets.length - 10);

    const renderTweets = latestTweets
      .map((tweet) => {
        const tweetUser = allUsers.find((user) => user.username === tweet.username);

        if (!tweetUser) {
          return { ...tweet, avatar: undefinedUserImage };
        }
        return { ...tweet, avatar: tweetUser.avatar };
      });

    response.send(renderTweets);
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

    return response.status(201).send('OK');
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
}

export { index, sendMessage };
