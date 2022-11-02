import express from 'express';
import { index } from './controllers/TweetControllers.js';

const routes = express.Router();

routes.get('/tweets', index);

export default routes;
