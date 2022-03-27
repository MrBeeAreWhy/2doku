import React, { useEffect } from 'react';
import GameContainer from './containers/GameContainer';
import UserContainer from './containers/UserContainer';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { resumeGame, invalidRevert, timeLossRevert, initBoard } from './slices/boardSlice';
import Header from './containers/Header';
import './styles/index.css';

function App() {
  const dispatch = useAppDispatch();
  const invalidAnswer = useAppSelector((state) => state.board.invalidAnswer);
  const displayTimeLoss = useAppSelector((state) => state.board.displayTimeLoss);
  const gameInit = useAppSelector((state) => state.board.gameInit);
  useEffect(() => {
      fetch('/puzzle')
        .then(data => data.json())
        .then(data => dispatch(initBoard(data.boardInfo)))
        .catch(err => console.log(err));
  }, []);
  useEffect(() => {
    const resumingGame = localStorage.getItem('resuming');
    if (resumingGame === 'true'){
      if (gameInit){
        dispatch(resumeGame());
      }
    }
  }, [gameInit]); //recall useEffect once the game board is initialized -- the async is done.
  useEffect(() => {
    if (invalidAnswer === true){
      setTimeout(()=> {
        dispatch(invalidRevert())
      }, 650)
    }
    if (displayTimeLoss === true){
      setTimeout(()=> {
        dispatch(timeLossRevert())
      }, 2000)
    }
  }, [invalidAnswer, displayTimeLoss])
  return (
    <div className="App">
      <Header />
      <GameContainer />
      <UserContainer />
    </div>
  );
}

export default App;
