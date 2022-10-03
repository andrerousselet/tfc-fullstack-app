import { Router } from 'express';
import UserController from '../controllers/UserController';

const userController = new UserController();

const router = Router();

router.post('/login', (req, res, next) => userController.login(req, res, next));
router.get('/login/validate', (req, res, next) => userController.validateToken(req, res, next));

export default router;
