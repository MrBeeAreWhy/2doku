import React from 'react';
import BoardGrid from '../components/BoardGrid';
import Timer from '../components/Timer';
import SubmitAnswer from '../components/SubmitAnswer';
import { useAppSelector } from '../app/hooks';

function GameContainer() {

  const gameStarted = useAppSelector((state) => state.board.gameStarted);
  const gameWon = useAppSelector((state) => state.board.gameWon);
  return (
    <div className="GameContainer">
      {gameStarted === true || gameWon === true ? <Timer /> : null}
      {gameStarted === true && gameWon === false ? <SubmitAnswer />: null}
      <BoardGrid />
    </div>
  );
}

export default GameContainer;
