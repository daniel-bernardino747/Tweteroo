import fs from 'fs';

function showUser(request, response) {
  const { user } = request.params;

  const pathUsers = './src/datas/usersData.json';
  const pathTweetsData = 'src/datas/tweetsData.json';
  const encoding = 'utf-8';

  try {
    const fd = fs.readFileSync(pathUsers, encoding);
    const allUsers = JSON.parse(fd);
    const requestedUser = allUsers.find((account) => account.username === user);

    if (!requestedUser) {
      return response.status(400).json({ error: 'There was a problem finding this user.' });
    }

    const data = fs.readFileSync(pathTweetsData, encoding);
    const allTweets = JSON.parse(data);
    const userTweets = allTweets.filter((tweet) => tweet.username === user);
    const renderTweets = userTweets.map((tweet) => ({ ...tweet, avatar: requestedUser.avatar }));

    return response.status(200).send(renderTweets);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
}

function makeLogin(request, response) {
  const { username, avatar } = request.body;

  if (!avatar || !username) {
    return response.status(400).json({ error: 'Missing username or tweet.' });
  }

  try {
    const url = new URL(avatar);
  } catch (err) {
    return response.status(404).json({ error: 'Invalid URL' });
  }

  try {
    const pathTweets = './src/datas/usersData.json';
    const encoding = 'utf-8';

    const data = fs.readFileSync(pathTweets, encoding);
    const allUsers = JSON.parse(data);

    const existingUser = allUsers.find((account) => account.username === username);

    if (existingUser) {
      return response.status(409).json({ error: 'This user already exists.' });
    }
    allUsers.push(request.body);
    const updateUsers = JSON.stringify(allUsers);
    fs.writeFileSync(pathTweets, updateUsers);

    return response.status(201).send('OK');
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
}

export { makeLogin, showUser };
