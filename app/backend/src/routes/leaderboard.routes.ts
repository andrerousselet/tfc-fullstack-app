import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardController = new LeaderboardController();

const router = Router();

router.get('/home', (req, res, next) => leaderboardController.homeTable(req, res, next));
router.get('/away', (req, res, next) => leaderboardController.awayTable(req, res, next));
router.get('/', (req, res, next) => leaderboardController.table(req, res, next));

export default router;
