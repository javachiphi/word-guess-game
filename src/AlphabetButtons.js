import React from 'react';

const AlphabetButtons = ({ onLetterClick, guessedLetters, status }) => {
  return (
    <div className="alphabet-container">
      
      {getLetterRows().map((row, index) => (
        <div key={index} className="alphabet-row">
          {row.map((letter) => (
            <button
              key={letter}
              className={`alphabet-button ${guessedLetters.includes(letter) ? 'disabled' : ''}`}
              onClick={() => onLetterClick(letter)}
              disabled={guessedLetters.includes(letter) || status === 'lost'}
            >
              {letter.toUpperCase()}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
const numberOfRows = 3; 
const lettersPerRow = Math.ceil(alphabet.length / numberOfRows);

const getLetterRows = () => {
  const rows = [];
  for (let row = 0; row < numberOfRows; row++) {
    const start = row * lettersPerRow;
    const end = start + lettersPerRow;
    rows.push(alphabet.slice(start, end));
  }
  return rows;
};

export default AlphabetButtons;
