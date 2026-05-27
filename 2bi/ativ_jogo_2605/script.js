import React, { useState, useEffect } from 'react';
import './App.css';

const SOLUTION = "TERMO"; // A palavra do dia

function App() {
  const [guesses, setGuesses] = useState([]); // Palpites finalizados
  const [currentGuess, setCurrentGuess] = useState(""); // O que está sendo digitado
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameOver) return;

      if (e.key === 'Enter') {
        if (currentGuess.length !== 5) return;
        setGuesses([...guesses, currentGuess.toUpperCase()]);
        setCurrentGuess("");
        if (currentGuess.toUpperCase() === SOLUTION) setGameOver(true);
      }

      if (e.key === 'Backspace') {
        setCurrentGuess(prev => prev.slice(0, -1));
        return;
      }

      if (/^[a-z]$/i.test(e.key) && currentGuess.length < 5) {
        setCurrentGuess(prev => prev + e.key.toUpperCase());
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentGuess, guesses, gameOver]);

  return (
    <div className="game-container">
      <h1>Termo Clone</h1>
      <div className="grid">
        {/* Renderiza palpites antigos */}
        {guesses.map((guess, i) => (
          <Row key={i} guess={guess} isFinal={true} />
        ))}
        
        {/* Linha atual sendo digitada */}
        {!gameOver && guesses.length < 6 && (
          <Row guess={currentGuess} isFinal={false} />
        )}

        {/* Linhas vazias restantes */}
        {[...Array(Math.max(0, 5 - guesses.length))].map((_, i) => (
          <Row key={i} guess="" isFinal={false} />
        ))}
      </div>
      {gameOver && <h2>Parabéns! 🎉</h2>}
    </div>
  );
}

function Row({ guess, isFinal }) {
  const tiles = [];
  for (let i = 0; i < 5; i++) {
    const char = guess[i] || "";
    let status = "";

    if (isFinal) {
      if (char === SOLUTION[i]) status = "correct";
      else if (SOLUTION.includes(char)) status = "present";
      else status = "absent";
    }

    tiles.push(<div key={i} className={`tile ${status}`}>{char}</div>);
  }
  return <div className="row">{tiles}</div>;
}

export default App;