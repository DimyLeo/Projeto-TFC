import { Router } from 'express';
import MatchesController from '../controllers/MatchesController';

const matcheRoute = Router();

matcheRoute.get('/', MatchesController.toggleMatches);

export default matcheRoute;
