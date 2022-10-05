import { Router } from 'express';
import MatchController from '../controllers/MatchController';
import auth from '../middlewares/auth';

const matchController = new MatchController();

const router = Router();

router.get('/matches', (req, res, next) => matchController.findAll(req, res, next));
router.post('/matches', auth, (req, res, next) => matchController.create(req, res, next));

export default router;
