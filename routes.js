import express from 'express';

const routes = express.Router();

routes.get('/tweets', (req, res) => {
  res.send('OK');
});

export default routes;
