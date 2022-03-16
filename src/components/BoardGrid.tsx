import React from 'react';
import BoardBox from './BoardBox';
import StartGame from './StartGame';
import { useAppSelector } from '../app/hooks';

function BoardGrid() {
  const initialBoard = useAppSelector((state) => state.board.board);
  const activePlays = useAppSelector((state) => state.board.activePlays);
  const gameStarted = useAppSelector((state) => state.board.gameStarted);
  const displayBoxes = [];
  
  if (gameStarted){
    for (let i = 0; i < initialBoard.length; i++){
      for (let j = 0; j < initialBoard[i].length; j++){
        if (initialBoard[i][j] === 0){
            if (activePlays[i][j] !== 0){
              displayBoxes.push(<BoardBox preset={false} displayValue={`${activePlays[i][j]}`} location={[i,j]}/>)
            } else {
              displayBoxes.push(<BoardBox preset={false} displayValue={``} location={[i,j]}/>)
            }
        } else if (initialBoard[i][j] === 9){

        } else {
          displayBoxes.push(<BoardBox preset={true} displayValue={`${initialBoard[i][j]}`} location={[i,j]}/>)
        }
      }  
    }
  }

  return (
    <div>
      {gameStarted ? 
      <div>
        <div className="BoardGrid">
          {displayBoxes}
        </div>
        <div className="horizDiv"></div>
        <div className="vertDiv"></div>
      </div>
      :
        <StartGame /> }
    </div>
  );
}

export default BoardGrid;
