import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';

interface BoardState {
  board: [number[], number[], number[], number[]],
  activePlays: [number[], number[], number[], number[]],
  gameStarted: boolean,
  gameWon: boolean,
  boardFilled: boolean,
  startTime: number,
  currentTime: number,
}

interface UpdateAction {
  value: number,
  i: number,
  j: number,
}

const initialState: BoardState = {
  board: 
          [[0,2,0,0],
           [0,0,0,4],
           [0,0,3,0],
           [1,0,0,2]],
  activePlays: 
          [[0,2,0,0],
           [0,0,0,4],
           [0,0,3,0],
           [1,0,0,2]],
  gameStarted: false,
  gameWon: false,
  boardFilled: false,
  startTime: 0,
  currentTime: 0,
}

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    startGame: (state) => {
      state.gameStarted = true;
      state.startTime = Date.now()

    },
    updatePlays: (state, action: PayloadAction<UpdateAction>) => {
      let boardFilled = true; //will turn false if any 0s in active board.
      state.activePlays[action.payload.i][action.payload.j] = action.payload.value;
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
    },
    verifySolution: (state) =>{
      const checkAnswers = new Set();
      for (let i = 0; i < state.activePlays.length; i++){
        for (let j = 0; j < state.activePlays[i].length; j++){
          checkAnswers.add(`row ${i} has ${state.activePlays[i][j]}`);
          checkAnswers.add(`column ${j} has ${state.activePlays[i][j]}`)
          checkAnswers.add(`box ${Math.floor(i/2)},${Math.floor(j/2)} has ${state.activePlays[i][j]}`)
        }
      }
      if (checkAnswers.size === 48){
        console.log('valid answer')
        state.gameWon = true;
        state.gameStarted = false;
      } else {
        console.log('invalid answer')
      }
    }
  },
})

export const { startGame, updatePlays, getElapsed, verifySolution } = boardSlice.actions;
export const boardDisplay = (state: RootState) => state.board.board;
export default boardSlice.reducer;