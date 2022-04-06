import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { getElapsed } from '../slices/boardSlice';

function Timer() {
  const { startTime, gameWon, invalidAnswer, displayTimeLoss } = useAppSelector((state) => state.board);
  const dispatch = useAppDispatch();
  let timerRef = React.createRef<HTMLDivElement>();
  let currentTime = useAppSelector((state) => state.board.currentTime);
  let minutes: number = 0; 
  let seconds: number = 0; 
  let milliseconds: number = 0;
  let timerString: string = '';


  //Generating a string of mm:ss:00 from ms difference game start -> now
  while(currentTime > 60000){
    currentTime -= 60000;
    minutes += 1;
  }
  if (minutes > 99){
    minutes = 99;
  }
  if (minutes < 10){
    timerString += `0${minutes}:`
  } else {
    timerString += `${minutes}:`
  }

  while(currentTime > 1000){
    currentTime -= 1000;
    seconds += 1;
  }
  if (seconds < 10){
    timerString += `0${seconds}:`
  } else {
    timerString += `${seconds}:`
  }

  milliseconds = currentTime;
  if (milliseconds < 100){
    timerString += `0${milliseconds}`
  } else {
    timerString += `${milliseconds}`
  }
  //string is 8 characters total
  timerString = timerString.slice(0, 8);

  
  useEffect(()=>{
    if (!gameWon){
      const timer = setTimeout(
        () => {
          if (invalidAnswer && timerRef.current){
            timerRef.current.className = 'timerError';
          } else if (timerRef.current) {
            timerRef.current.className = 'timer';
          }
          const elapsedTime = Date.now() - startTime;
          dispatch(getElapsed(elapsedTime))},
        50);
      return () => clearTimeout(timer);
    }
  });

  return (
    <div ref={timerRef} className={gameWon ? 'timerFinished' : 'timer'}>
      {timerString}
      {displayTimeLoss ? <div className='timeLoss'>-5s</div> : null}
    </div>
  );
}

export default Timer;
