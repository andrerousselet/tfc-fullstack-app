import { Router } from 'express';
import MatchController from '../controllers/MatchController';
import auth from '../middlewares/auth';

const matchController = new MatchController();

const router = Router();

router.get('/matches', (req, res, next) => matchController.findAll(req, res, next));
router.post('/matches', auth, (req, res, next) => matchController.create(req, res, next));
router.patch(
  '/matches/:id/finish',
  (req, res, next) => matchController.finishMatch(req, res, next),
);
router.patch('/matches/:id', (req, res, next) => matchController.updateScores(req, res, next));

export default router;
