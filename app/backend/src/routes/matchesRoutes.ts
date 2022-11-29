import { Router } from 'express';
import MatchesController from '../controllers/MatchesController';

const matcheRoute = Router();
const matchesController = new MatchesController();

matcheRoute.get('/', matchesController.toggleMatches);

export default matcheRoute;
