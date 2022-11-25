import { Router } from 'express';
import TeamsController from '../controllers/TeamController';

const teamRoute = Router();
const teamsController = new TeamsController();

teamRoute.get('/', teamsController.getAll);
teamRoute.get('/:id', teamsController.getById);

export default teamRoute;
