import React, { useEffect } from 'react';
import { useAppDispatch } from '../app/hooks';
import { startGame, getElapsed } from '../slices/boardSlice';

function StartGame() {
  const dispatch = useAppDispatch();

  return (
    <div className="startGame" onClick={() => dispatch(startGame())}>
      Start Challenge
    </div>
  );
}

export default StartGame;
