import { Router } from 'express';
import LoginController from '../controllers/LoginController';
import authorize from '../middlewares/authorizeToken';
import LoginValidate from '../middlewares/loginValidate';

const router = Router();
const loginController = new LoginController();
const loginValidate = new LoginValidate();

router.post('/', loginValidate.loginValid, loginController.login);
router.get('/validate', authorize.tokenValidation, loginController.getRole);

export default router;
