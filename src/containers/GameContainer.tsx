import React from 'react';
import BoardGrid from '../components/BoardGrid';
import Timer from '../components/Timer';
import { useAppSelector } from '../app/hooks';

function GameContainer() {
  const gameStarted = useAppSelector((state) => state.board.gameStarted);
  return (
    <div className="GameContainer">
      {gameStarted === true ? <Timer /> : null}
      <BoardGrid />
    </div>
  );
}

export default GameContainer;
