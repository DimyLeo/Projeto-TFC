import { Router } from 'express';
import MatchesController from '../controllers/MatchesController';

const matcheRoute = Router();

matcheRoute.get('/', MatchesController.getAll);

export default matcheRoute;
