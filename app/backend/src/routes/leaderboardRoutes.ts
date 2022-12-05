import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardRoute = Router();

leaderboardRoute.get('/', LeaderboardController.getGeneralLeaders);
leaderboardRoute.get('/home', LeaderboardController.getHomeLeaders);
leaderboardRoute.get('/away', LeaderboardController.getAwayLeaders);

export default leaderboardRoute;
