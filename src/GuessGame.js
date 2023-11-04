import React, {useState} from "react";
import { getRandomWord } from "./utils.js";
import "./App.css";

///error case. if a user types more than 1 letter, or number, non-number -> disable submit button

function GuessGame({resetGame}) {
  const initialWord = getRandomWord();

  const [inputValue, setInputValue] = useState('');
  const [currWord, setCurrWord] = useState(initialWord);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [numGuesses, setNumGuesses] = useState(10);
  const [status, setStatus] = useState('');

  const generateWordDisplay = () => {
    return currWord
      .split('')
      .map(letter => guessedLetters.includes(letter) ? letter : "_")
      .join(' ');
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);  
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
        handleClick();
    } 
  }

  const handleClick = () => {
    if (!inputValue.trim()) return; // Don't do anything if the input is empty or just spaces
    setGuessedLetters(prevGuessedLetters => [...prevGuessedLetters, inputValue]);
    setNumGuesses(prevNumGuesses => prevNumGuesses - 1);
    setInputValue('');

    const newGuessedLetters = [...guessedLetters, inputValue];
    checkStatus(newGuessedLetters);
  };


  const checkStatus = (newGuessedLetters) => {
    const displayedWord = currWord
    .split('')
    .map(ele => newGuessedLetters.includes(ele)? ele : '_')
    .join('');


    if(!displayedWord.includes('_')){
        setStatus('win');
    }
  }

  const isSingleLetter = (input) => {
    if(input === '') {
        return false } 
    else {
    return /^[a-zA-Z]$/.test(input)
}
  };

  return (
    <div className="App">
        <div className="word-display">{generateWordDisplay()}</div>
        <h3>Guessed Letters</h3>
        {status === 'win' ? <h3>WOn</h3> : null}
        <div>{guessedLetters.join(', ') || "-"}</div>
        {numGuesses === 0 ? (
          <div>
            <h3>Oops, game over. Wanna Play Again?</h3>
            <p>the correct word was {currWord}</p>
            <button onClick={resetGame}>Play Again!</button>
          </div>
        ) : (
          <>
            <h3>Num Guesses: {numGuesses}</h3>
            <input
              value={inputValue}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              disabled={numGuesses <= 0}
            />
            <button onClick={handleClick} disabled={numGuesses <= 0 || (inputValue !== '' && !isSingleLetter(inputValue))}>Guess</button>
          </>
        )}
    </div>
  );
}

export default GuessGame;
