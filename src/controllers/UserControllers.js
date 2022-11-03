import fs from 'fs';

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

    fs.readFile(pathTweets, encoding, (err, data) => {
      if (err) throw err;

      const allUsers = JSON.parse(data);

      const existingUser = allUsers.find((account) => account.username === username);

      console.log(existingUser);

      if (!existingUser) {
        allUsers.push(request.body);
        const updateUsers = JSON.stringify(allUsers);
        fs.writeFile(pathTweets, updateUsers, (error) => {
          if (error) throw error;
        });
        return response.status(201).send('OK');
      }
      return response.status(409).json({ error: 'This user already exists.' });
    });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
}

function showUser() {
  return true;
}

export { makeLogin, showUser };
