import { Router } from 'express';
import MatchesController from '../controllers/MatchesController';
import authorize from '../middlewares/authorizeToken';

const matcheRoute = Router();

matcheRoute.get('/', MatchesController.toggleMatches);
matcheRoute.post('/', authorize.tokenValidation, MatchesController.toggleSaveMatch);

export default matcheRoute;
