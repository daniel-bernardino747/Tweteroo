import express from 'express';
import { index, sendMessage } from './controllers/TweetControllers.js';
import { makeLogin, showUser } from './controllers/UserControllers.js';

const routes = express.Router();

routes.get('/tweets', index);

routes.post('/tweets', sendMessage);

routes.post('/tweets/:user', showUser);

routes.post('/sign-up', makeLogin);

export default routes;
