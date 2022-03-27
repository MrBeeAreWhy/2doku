import React, { MouseEvent } from 'react';
import BoardBox from './BoardBox';
import StartGame from './StartGame';
import { useAppSelector } from '../app/hooks';


function BoardGrid() {
  const initialBoard = useAppSelector((state) => state.board.board);
  const activePlays = useAppSelector((state) => state.board.activePlays);
  const gameStarted = useAppSelector((state) => state.board.gameStarted);
  const gameWon = useAppSelector((state) => state.board.gameWon);
  const displayBoxes = [];
  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
  }
  
  if (gameStarted || gameWon){
    for (let i = 0; i < initialBoard.length; i++){
      for (let j = 0; j < initialBoard[i].length; j++){
        if (initialBoard[i][j] === 0){
            if (activePlays[i][j] !== 0){
              displayBoxes.push(<BoardBox preset={false} key={`x${[i]}y${[j]}`} displayValue={`${activePlays[i][j]}`} location={[i,j]} gameWon={gameWon}/>)
            } else {
              displayBoxes.push(<BoardBox preset={false} key={`x${[i]}y${[j]}`} displayValue={``} location={[i,j]} gameWon={gameWon}/>)
            }
        } else {
          displayBoxes.push(<BoardBox preset={true} key={`x${[i]}y${[j]}`} displayValue={`${initialBoard[i][j]}`} location={[i,j]} gameWon={gameWon}/>)
        }
      }  
    }
  }

  return (
    <div>
      {gameStarted === true || (gameStarted === false && gameWon === true) ? 
      <div onContextMenu={handleClick}>
        <div className="BoardGrid">
          {displayBoxes}
        </div>
        <div className="horizDiv"></div>
        <div className="vertDiv"></div>
      </div>
      :
        <StartGame />}       
    </div>
  );
}

export default BoardGrid;
