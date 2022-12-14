import fs from 'fs';

function index(request, response) {
  const { page } = request.query;
  const firstPage = 1;

  if (page < firstPage) {
    return response.status(400).json('enter a valid page.');
  }

  const undefinedUserImage = 'https://secure.gravatar.com/avatar/a2bbf191a58629f141850123542fefc5?s=96&d=https%3A%2F%2Fstatic.teamtreehouse.com%2Fassets%2Fcontent%2Fdefault_avatar-ea7cf6abde4eec089a4e03cc925d0e893e428b2b6971b12405a9b118c837eaa2.png&r=pg';
  const pathTweetsData = 'src/datas/tweetsData.json';
  const pathUsersData = 'src/datas/usersData.json';
  const encoding = 'utf-8';
  let latestTweets;

  try {
    const fd = fs.readFileSync(pathUsersData, encoding);
    const data = fs.readFileSync(pathTweetsData, encoding);
    const allTweets = JSON.parse(data);
    const allUsers = JSON.parse(fd);
    const smallDatabase = allTweets.length <= 10;

    if (smallDatabase) {
      latestTweets = allTweets;
    } else if (page) {
      latestTweets = allTweets.filter((tweet) => {
        const position = allTweets.indexOf(tweet);
        const nextTweets = ((page - 1) * 10) < position && position <= (page * 10);

        return nextTweets;
      });
    } else {
      latestTweets = allTweets.slice(allTweets.length - 10);
    }
    const renderTweets = latestTweets
      .map((tweet) => {
        const tweetUser = allUsers.find((user) => user.username === tweet.username);

        if (!tweetUser) {
          return { ...tweet, avatar: undefinedUserImage };
        }
        return { ...tweet, avatar: tweetUser.avatar };
      });
    return response.status(200).send(renderTweets);
  } catch (err) {
    return response.status(400).json(err.message);
  }
}

function sendMessage(request, response) {
  const { tweet } = request.body;
  const { user } = request.headers;

  if (!tweet) {
    return response.status(400).json('Missing tweet.');
  }
  if (!user) {
    return response.status(400).json('Missing username.');
  }

  try {
    const pathTweets = './src/datas/tweetsData.json';
    const encoding = 'utf-8';

    const data = fs.readFileSync(pathTweets, encoding);

    const allTweets = JSON.parse(data);
    allTweets.push(request.body);

    const updateTweets = JSON.stringify(allTweets);
    fs.writeFileSync(pathTweets, updateTweets);

    return response.status(201).send('OK');
  } catch (err) {
    return response.status(400).json(err.message);
  }
}

export { index, sendMessage };
