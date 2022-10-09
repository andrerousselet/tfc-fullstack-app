import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardController = new LeaderboardController();

const router = Router();

router.get('/home', (req, res, next) => leaderboardController.homeTable(req, res, next));

export default router;
