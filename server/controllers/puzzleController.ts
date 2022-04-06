import { Request, Response, NextFunction, RequestHandler } from 'express';

interface puzzleController {
  checkPuzzle: RequestHandler,
}
const puzzleController: puzzleController = {
  checkPuzzle: function(req: Request, res: Response, next: NextFunction){
    res.locals = {boardInfo: '0,0,0,1,0,0,4,0,3,2,0,4,0,0,0,0'};
  return next();
  }
};


export default puzzleController;