import userDatabase from '../datas/usersData.js';
import tweetsDatabase from '../datas/tweetsData.js';

function index(request, response) {
  const { page } = request.query;
  const firstPage = 1;

  if (page < firstPage) {
    return response.status(400).json('enter a valid page.');
  }

  const undefinedUserImage = 'https://secure.gravatar.com/avatar/a2bbf191a58629f141850123542fefc5?s=96&d=https%3A%2F%2Fstatic.teamtreehouse.com%2Fassets%2Fcontent%2Fdefault_avatar-ea7cf6abde4eec089a4e03cc925d0e893e428b2b6971b12405a9b118c837eaa2.png&r=pg';
  let latestTweets;

  try {
    const smallDatabase = tweetsDatabase.length <= 10;

    if (smallDatabase) {
      latestTweets = tweetsDatabase;
    } else if (page) {
      latestTweets = tweetsDatabase.filter((tweet) => {
        const position = tweetsDatabase.indexOf(tweet);
        const nextTweets = ((page - 1) * 10) < position && position <= (page * 10);

        return nextTweets;
      });
    } else {
      latestTweets = tweetsDatabase.slice(tweetsDatabase.length - 10);
    }
    const renderTweets = latestTweets
      .map((tweet) => {
        const tweetUser = userDatabase.find((user) => user.username === tweet.username);

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
    tweetsDatabase.push({ username: user, tweet });

    return response.status(201).send('OK');
  } catch (err) {
    return response.status(400).json(err.message);
  }
}

export { index, sendMessage };
