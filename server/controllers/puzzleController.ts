import { Request, Response, NextFunction, RequestHandler } from 'express';

interface puzzleController {
  checkPuzzle: RequestHandler,
  generatePuzzle: RequestHandler,
  publishPuzzle: RequestHandler,
}

//helper functions
function genPuzzle():number[][] {
  const testPuzzle: number[][] = 
              [
              [0,0,0,0],
              [0,0,0,0],
              [0,0,0,0],
              [0,0,0,0]
              ]
  for (let i = 0; i < 5; i++){
    //always generate 3, generate up to 6 numbers with reduced probability
    if (Math.floor(Math.random()*8) > 5 && i > 2){
      continue;
    }
    const randx = Math.floor(Math.random()*4)
    const randy = Math.floor(Math.random()*4)
    const randval = Math.floor(Math.random()*4)+1
    if (testPuzzle[randx][randy] === 0){
      testPuzzle[randx][randy] = randval;
    } else {
      i--
    }
  }
  return testPuzzle;
}
function checkCorrect(sudoku: number[][]): boolean {
  const checkAnswers = new Set();
  for (let i = 0; i < sudoku.length; i++){
    for (let j = 0; j < sudoku[i].length; j++){
      checkAnswers.add(`row ${i} has ${sudoku[i][j]}`);
      checkAnswers.add(`column ${j} has ${sudoku[i][j]}`)
      checkAnswers.add(`box ${Math.floor(i/2)},${Math.floor(j/2)} has ${sudoku[i][j]}`)
    } 
  }
  if (checkAnswers.size === 48){
    return true;
  } else {
    return false;
  }
}
//end helper functions

const puzzleController: puzzleController = {
  checkPuzzle: function(req: Request, res: Response, next: NextFunction){
    let validDailyPuzzle = false;
    //check if DB has today's puzzle
    //if it does, set res.locals to that and invoke next
    if (validDailyPuzzle){
      res.locals = {boardInfo: '0,0,0,1,0,0,4,0,3,2,0,4,0,0,0,0', puzzleFound: true}
    } else {
      res.locals = {puzzleFound: false}
    }
  return next();
  },
  generatePuzzle: function(req: Request, res: Response, next: NextFunction){
    if (res.locals.puzzleFound){
      return next();
    } else {
      console.log('no puzzle found. gonna generate it.')

      let testPuzzle = genPuzzle();
      let valid = false;
      let attempts = 0;
      while(!valid){
        attempts++
        if (attempts % 20 === 0){
          testPuzzle = genPuzzle();
        }
        const evalArray = JSON.parse(JSON.stringify(testPuzzle))
        for (let i = 0; i < 4; i++){
          for (let j = 0; j < 4; j++){
            let addValue = Math.floor(Math.random()*4)+1
            if (evalArray[i][j] === 0){
            while(evalArray[i].includes(addValue)){
              addValue = Math.floor(Math.random()*4)+1
            }
            evalArray[i][j] = addValue;
          }
          }
        }
        valid = checkCorrect(evalArray)
      }

      let outputStr = '';
      for (let i = 0; i < testPuzzle.length; i++){
        for (let j = 0; j < testPuzzle[i].length; j++){
          outputStr += String(testPuzzle[i][j]) + ','
        }
      }
      res.locals.boardInfo = outputStr.slice(0, -1);
    }
    return next();
  },
  publishPuzzle: function(req: Request, res: Response, next: NextFunction){
    if (res.locals.puzzleFound){
      return next();
    } else {
      //publish the puzzle to the database.
      console.log('add puzzle')
      console.log(res.locals.boardInfo)
      console.log('to db')
    }
    return next();
  },
};


export default puzzleController;