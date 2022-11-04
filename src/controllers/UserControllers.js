import userDatabase from '../datas/usersData.js';
import tweetsDatabase from '../datas/tweetsData.js';

function showUser(request, response) {
  const { user } = request.params;

  try {
    const requestedUser = userDatabase.find((account) => account.username === user);

    if (!requestedUser) {
      return response.status(400).json('There was a problem finding this user.');
    }

    const userTweets = tweetsDatabase.filter((tweet) => tweet.username === user);
    const renderTweets = userTweets.map((tweet) => ({ ...tweet, avatar: requestedUser.avatar }));

    return response.status(200).send(renderTweets);
  } catch (err) {
    return response.status(400).json(err.message);
  }
}

function makeLogin(request, response) {
  const { username, avatar } = request.body;

  if (!avatar || !username) {
    return response.status(400).json('Missing username or tweet.');
  }

  try {
    const url = new URL(avatar);
  } catch (err) {
    return response.status(404).json('Invalid URL');
  }

  try {
    const existingUser = userDatabase.find((account) => account.username === username);

    if (existingUser) {
      return response.status(409).json('This user already exists.');
    }
    userDatabase.push(request.body);

    return response.status(201).send('OK');
  } catch (err) {
    return response.status(400).json(err.message);
  }
}

export { makeLogin, showUser };
