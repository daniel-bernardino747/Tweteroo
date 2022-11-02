import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

// const users = [];
const tweets = [
  {
    username: 'bobesponja1',
    avatar: 'https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info',
    tweet: 'eu amo o hub',
  },
  {
    username: 'bobesponja2',
    avatar: 'https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info',
    tweet: 'eu amo o hub',
  },
  {
    username: 'bobesponja3',
    avatar: 'https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info',
    tweet: 'eu amo o hub',
  },
  {
    username: 'bobesponja4',
    avatar: 'https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info',
    tweet: 'eu amo o hub',
  },
  {
    username: 'bobesponja5',
    avatar: 'https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info',
    tweet: 'eu amo o hub',
  },
  {
    username: 'bobesponja6',
    avatar: 'https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info',
    tweet: 'eu amo o hub',
  },
  {
    username: 'bobesponja7',
    avatar: 'https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info',
    tweet: 'eu amo o hub',
  },
  {
    username: 'bobesponja8',
    avatar: 'https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info',
    tweet: 'eu amo o hub',
  },
  {
    username: 'bobesponja9',
    avatar: 'https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info',
    tweet: 'eu amo o hub',
  },
  {
    username: 'bobesponja10',
    avatar: 'https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info',
    tweet: 'eu amo o hub',
  },
  {
    username: 'bobesponja11',
    avatar: 'https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info',
    tweet: 'eu amo o hub',
  },
];

app.get('/tweets', (req, res) => {
  const lastTenTweets = tweets.slice(tweets.length - 10);
  res.send(lastTenTweets);
});

app.listen(5000);
