import { Router } from 'express';
import TeamController from '../controllers/TeamController';

const teamController = new TeamController();

const router = Router();

router.get('/teams', (req, res, next) => teamController.findAll(req, res, next));

export default router;
