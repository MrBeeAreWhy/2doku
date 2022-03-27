import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { startGame } from '../slices/boardSlice';


function StartGame() {
  const dispatch = useAppDispatch();
  const gameStarted = useAppSelector((state) => state.board.resuming);
  const gameInit = useAppSelector((state) => state.board.gameInit);
  let displayedText;
  if (gameStarted === true){
    displayedText = "Resume Challenge"
  } else {
    displayedText = "Start Challenge"
  }
  if (!gameInit){
    displayedText = "loading..."
  }
  return (
    <div className="startGame" onClick={() => dispatch(startGame())}>
      {displayedText}
    </div>
  );
}

export default StartGame;
