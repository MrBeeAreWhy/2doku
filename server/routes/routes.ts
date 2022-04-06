import express, { Request, Response, NextFunction, RequestHandler } from 'express';
import puzzleController from '../controllers/puzzleController';
const router = express.Router();

router.get('/', puzzleController.checkPuzzle, (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json(res.locals);
});

export default router;