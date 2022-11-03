import express from 'express';
import { index, sendMessage, makeLogin } from './controllers/TweetControllers.js';

const routes = express.Router();

routes.get('/tweets', index);

routes.post('/tweets', sendMessage);

routes.post('/sign-up', makeLogin);

export default routes;
