import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';

interface BoardState {
  board: [number[], number[], number[], number[]],
  activePlays: [number[], number[], number[], number[]],
  gameStarted: boolean,
  activeSection: string,
  startTime: number,
  currentTime: number,
  interval: any
}

interface UpdateAction {
  value: number,
  i: number,
  j: number,
}

const initialState: BoardState = {
  board: 
          [[0,2,0,0],
          [0,0,0,0],
          [0,0,2,0],
          [0,0,0,3]],
  activePlays: 
          [[0,0,0,0],
          [0,0,0,0],
          [0,0,0,0],
          [0,0,0,0]],
  gameStarted: false,
  startTime: 0,
  currentTime: 0,
  activeSection: 'none',
  interval: null,  
}

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    startGame: (state) => {
      state.gameStarted = true;
      state.startTime = Date.now()

    },
    updateActive: (state, action: PayloadAction<string>) => {
      if (state.activeSection === action.payload){
        state.activeSection = 'none';
      } else {
        state.activeSection = action.payload;
      }
    },
    updatePlays: (state, action: PayloadAction<UpdateAction>) => {
      state.activePlays[action.payload.i][action.payload.j] = action.payload.value;
    },
    getElapsed: (state, action: PayloadAction<number>) =>{
      state.currentTime = action.payload;
    },
  },
})

export const { startGame, updateActive, updatePlays, getElapsed } = boardSlice.actions;
export const boardDisplay = (state: RootState) => state.board.board;
export default boardSlice.reducer;