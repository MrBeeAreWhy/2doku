# 2doku

A Wordle inspired puzzle game featuring a 2x2 Sudoku board that is generated randomly each day.

Utilizes localstorage for the persistence of user progress on puzzles between sessions.

The application is React with Redux Toolkit for the front end and Express on Node for the back end. Written in TypeScript.

To play: 

Click each square to change the number in that square. Left click increments, right click decrements the number.

Each row, column and quadrant must contain the numbers 1, 2, 3, 4 with no duplicates.

Once all squares have been populated, the 'submit' button will be available. An incorrect answer will cost 5s of time.

Each day there will be a new challenge.


# Installation

Clone this repo and then "npm i" to install necessary dependencies.

For a development experience with HMR:

* npm run serve
to start the Express server to serve the puzzle information

* npm run dev
to run the application at localhost:8080 with HMR.

For the current build experience:

* npm run build
to generate the bundle

* npm run serve
to start the Express server to serve the puzzle information

and browse to localhost:3000 for Express to serve the application and puzzle information.


# Known Issues/To Do

Issues:
- The server generates a new puzzle every time it is queried (intended to store in database, retrieve if already generated)
  - The client does not properly handle the above issue
- Puzzle generation needs refactoring.
