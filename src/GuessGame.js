import React, {useState} from "react";
import { getRandomWord } from "./utils.js";
import AlphabetButtons from "./AlphabetButtons.js"
import "./App.css";


///error case. if a user types more than 1 letter, or number, non-number -> disable submit button
// no repeat letter -> 

function GuessGame({resetGame}) {
  const initialWord = getRandomWord();

  const [currWord, setCurrWord] = useState(initialWord);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [numGuesses, setNumGuesses] = useState(10);
  const [status, setStatus] = useState('');
  const [selectedLetter, setSelectedLetter] = useState('');

  const handleLetterClick = (letter) => {
    console.log('letter', letter)
    setSelectedLetter(letter);
    setGuessedLetters(prevGuessedLetters => [...prevGuessedLetters, letter]);
    setNumGuesses(prevNumGuesses => prevNumGuesses - 1);

    const newGuessedLetters = [...guessedLetters, letter];
    checkStatus(newGuessedLetters);
  };


  const generateWordDisplay = () => {
    return currWord
      .split('')
      .map(letter => guessedLetters.includes(letter) ? letter : "_")
      .join(' ');
  };


  const checkStatus = (newGuessedLetters) => {
    const displayedWord = currWord
    .split('')
    .map(ele => newGuessedLetters.includes(ele)? ele : '_')
    .join('');

    if(!displayedWord.includes('_')){
        setStatus('win');
    }

    if(numGuesses === 1){
        setStatus('lost')
    }
  }

  return (
    <header className="App-header">
        <h1>Guess The Word 🚀</h1>
        <h3>Guesses Left: {numGuesses}</h3>
        {status === 'win' && 
        <div>
            <h3>Hey, you got it right 🥳🎉</h3>
            <div>Wanna play again?</div>
            <button onClick={resetGame}>Play Again!</button>
        </div>     
        }
        {status === 'lost' &&
        <div>
            <div>Oops. "{currWord}" was the word.</div>
            <div>Wanna play again?</div>
            <button onClick={resetGame}>Play Again!</button>
        </div>
        }
        <div className='game-container'>
            <div className='word-display'>
                <h3>Word Display</h3>
                <div className="word-display">{generateWordDisplay()}</div>
                <h3>Guessed Letters</h3>
                <div>{guessedLetters.sort().join(', ') || "-"}</div>
        </div>
        <div>
                <AlphabetButtons 
                onLetterClick={handleLetterClick}
                guessedLetters={guessedLetters}
                status={status}
                />
            </div>
        </div>
    </header>
  );
}

export default GuessGame;
