import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';

interface BoardState {
  board: [number[], number[], number[], number[]],
  activePlays: [number[], number[], number[], number[]],
  gameInit: boolean,
  gameStarted: boolean,
  gameWon: boolean,
  boardFilled: boolean,
  startTime: number,
  currentTime: number,
  lastPenalty: number,
  lastTimerError: number,
  resuming: boolean,
  invalidAnswer: boolean,
  displayTimeLoss: boolean,
}

interface UpdateAction {
  value: number,
  i: number,
  j: number,
}

const initialState: BoardState = {
  board: 
          [[0,0,0,0],
           [0,0,0,0],
           [0,0,0,0],
           [0,0,0,0]],
  activePlays: 
          [[0,0,0,0],
           [0,0,0,0],
           [0,0,0,0],
           [0,0,0,0]],
  gameInit: false,
  gameStarted: false,
  gameWon: false,
  boardFilled: false,
  startTime: 0,
  currentTime: 0,
  lastPenalty: 0,
  lastTimerError: 0,
  resuming: false,
  invalidAnswer: false,
  displayTimeLoss: false,
}

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    initBoard: (state, action: PayloadAction<string>) => {
      console.log('inside initboard.')
      console.log(action.payload)
      const boardState = action.payload.split(',');
      for (let i = 0; i < state.board.length; i++){
        for (let j = 0; j < state.board[0].length; j++){
          state.board[i][j] = Number(boardState[i*4 + j]);
          state.activePlays = state.board;
        };
      };
      state.gameInit = true;
    },
    startGame: (state) => {
      //StartGame is called with a new game or on resume.
      //Putting the timeElapsed in here, as to avoid dupliclating functionality to invoke startTime.
      state.gameStarted = true;
      state.startTime = Date.now();
      localStorage.setItem('resuming', 'true');
      const timeElapsed = localStorage.getItem('elapsed');
      if (timeElapsed !== '0'){
        state.startTime -= Number(timeElapsed)
      }
    },
    resumeGame: (state) =>{ 
      console.log('resuming game')
      const lastPlayed = localStorage.getItem('boardDate');
      const today = new Date().toString().slice(0,10);
      if (!lastPlayed || lastPlayed !== today){
        //the day has been updated, or the value doesn't exist -> so reset all localStorage
        localStorage.setItem('boardDate', `${today}`);
        localStorage.setItem('resuming', 'false');
        localStorage.setItem('elapsed', '0');
        localStorage.setItem('board', 'null');
        state.resuming = false;
      } else {
        const boardState = localStorage.getItem('board')?.split(',');
        const timeElapsed = localStorage.getItem('elapsed');
        let boardFilled = true;
        if (boardState){
          for (let i = 0; i < state.activePlays.length; i++){
            for (let j = 0; j < state.activePlays[0].length; j++){
              state.activePlays[i][j] = Number(boardState[i*4 + j]);
              if (state.activePlays[i][j] === 0){
                boardFilled = false;
              };
            };
          };
        };
        if (boardFilled === true){ //check if the current board is a winner.
          boardSlice.caseReducers.verifySolution(state, {payload: 'load', type: 'board/verifySolution'});
        }
        state.resuming = true;
        state.boardFilled = boardFilled;
        boardSlice.caseReducers.getElapsed(state, {payload: Number(timeElapsed), type: 'board/getElapsed'})
      };
    },
    updatePlays: (state, action: PayloadAction<UpdateAction>) => {
      state.activePlays[action.payload.i][action.payload.j] = action.payload.value;
      let boardFilled = true; //will turn false if any 0s in active board.
      for (let i = 0; i < state.activePlays.length; i++){
        for (let j = 0; j < state.activePlays[i].length; j++){
          if (state.activePlays[i][j] === 0){
            boardFilled = false;
            break;
          }
        }
      }
      state.boardFilled = boardFilled;
    },
    getElapsed: (state, action: PayloadAction<number>) =>{
      state.currentTime = action.payload;
      boardSlice.caseReducers.populateStorage(state)
    },
    verifySolution: (state, action: PayloadAction<string>) =>{
      const checkAnswers = new Set();
      /*
      utilizing a Set, if all rows, columns and quadrants are not filled uniquely, 
      there will be a duplicate, so size will not be 48 (16 possibilites in each row/column/quadrant)
      */
      for (let i = 0; i < state.activePlays.length; i++){
        for (let j = 0; j < state.activePlays[i].length; j++){
          checkAnswers.add(`row ${i} has ${state.activePlays[i][j]}`);
          checkAnswers.add(`column ${j} has ${state.activePlays[i][j]}`)
          checkAnswers.add(`box ${Math.floor(i/2)},${Math.floor(j/2)} has ${state.activePlays[i][j]}`)
        }
      }
      if (checkAnswers.size === 48){
        state.gameWon = true;
        state.gameStarted = false;
      } else if (action.payload !== 'load'){
        const timer = Date.now();
        if (state.lastTimerError < timer){
          state.lastTimerError = timer + 650;
          state.invalidAnswer = true;
        }
        if (state.lastPenalty < timer){
          state.lastPenalty = timer + 5000;
          state.displayTimeLoss = true;
          state.startTime -= 5000;
        }
      }
    },
    populateStorage: (state) =>{
      localStorage.setItem('board', `${state.activePlays}`)
      localStorage.setItem('elapsed', `${state.currentTime}`)
    },
    invalidRevert: (state) => {
      state.invalidAnswer = false;
    },
    timeLossRevert: (state) => {
      state.displayTimeLoss = false;
    }
  },
})

export const { initBoard, startGame, resumeGame, updatePlays, getElapsed, verifySolution, invalidRevert, timeLossRevert } = boardSlice.actions;
export const boardDisplay = (state: RootState) => state.board.board;
export default boardSlice.reducer;