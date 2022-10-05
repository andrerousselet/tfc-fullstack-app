import { Router } from 'express';
import MatchController from '../controllers/MatchController';

const matchController = new MatchController();

const router = Router();

router.get('/matches', (req, res, next) => matchController.findAll(req, res, next));

export default router;
