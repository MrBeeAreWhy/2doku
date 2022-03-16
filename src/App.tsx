import React from 'react';
import GameContainer from './containers/GameContainer';
import UserContainer from './containers/UserContainer';
import Header from './containers/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <GameContainer />
      <UserContainer />
    </div>
  );
}

export default App;
