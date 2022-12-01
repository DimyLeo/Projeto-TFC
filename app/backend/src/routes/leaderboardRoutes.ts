import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardRoute = Router();

leaderboardRoute.get('/home', LeaderboardController.getHomeLeaders);

export default leaderboardRoute;
