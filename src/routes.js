import express from 'express';
import { index, sendMessage } from './controllers/TweetControllers.js';

const routes = express.Router();

routes.get('/tweets', index);

routes.post('/tweets', sendMessage);

export default routes;
