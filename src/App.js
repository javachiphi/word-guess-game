import React, { useState } from 'react';
import GuessGame from "./GuessGame.js"; 
import "./App.css";

function App() {
  // The key state is used to force remount the GuessGame component
  const [key, setKey] = useState(0);

  const resetGame = () => {
    // By updating the key, the GuessGame component will remount
    setKey(prevKey => prevKey + 1);
  };

  return (
    <div className="App">
      <header className="App-header">
        <GuessGame key={key} resetGame={resetGame} />
      </header>
    </div>
  );
}

export default App;



