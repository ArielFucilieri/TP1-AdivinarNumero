import { useState } from "react";
import InputComponent from './Component/Input';
import ButtonComponent from './Component/Button';
import Confetti from "react-confetti";
import './App.css';

function App() {
  const [randomNumber, setRandomNumber] = useState(generateRandomNumber());
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [attempts, setAttempts] = useState(10);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [skulls, setSkulls] = useState([]);

  function generateRandomNumber() {
    return Math.floor(Math.random() * 20) + 1;
  }

  const handleChange = (value) => {
    setGuess(value);
  };

  const handleSubmit = () => {
    if (gameOver) return;

    const playerGuess = parseInt(guess);

    if (!playerGuess || playerGuess < 1 || playerGuess > 20) {
      setMessage("Por favor ingresa un número del 1 al 20");
      return;
    }

    if (playerGuess === randomNumber) {
      setMessage(`Adivinaste!!! El número era ${randomNumber}`);
      setGameOver(true);
      setShowConfetti(true);
      if (attempts > highScore) {
        setHighScore(attempts);
      }
    } else {
      setAttempts(attempts - 1);
      setSkulls([...skulls, "💀"]);
      if (attempts === 1) {
        setMessage(`Perdiste. El número era ${randomNumber}`);
        setGameOver(true);
      } else if (playerGuess > randomNumber) {
        setMessage("El número ingresado es más alto");
      } else {
        setMessage("El número ingresado es más bajo");
      }
    }

    setGuess("");
  };

  const handleRestart = () => {
    setRandomNumber(generateRandomNumber());
    setGuess("");
    setMessage("");
    setAttempts(10);
    setShowConfetti(false);
    setGameOver(false);
    setSkulls([]);
  };

  return (
    <div className="App">
      <h1 className="neon-title">Adivina el número (1 al 20)</h1>
      
      <div className="game-info">
        <div className="attempts-container">
          <p className="attempts">
            Intentos restantes: {attempts}
          </p>
          <p className="failed-attempts">
            Intentos fallidos 
            <span className="skulls-container">
              {skulls.map((skull, index) => (
                <span key={index} className="skull">{skull}</span>
              ))}
            </span>
          </p>
        </div>
        <p className="highscore">Máximo puntaje: {highScore}</p>
      </div>

      <div className="input-container">
        <InputComponent guess={guess} handleChange={handleChange} setMessage={setMessage} gameOver={gameOver} />
        <ButtonComponent handleSubmit={handleSubmit} gameOver={gameOver} />
      </div>

      {message && (
        <p className="message-box">{message}</p>
      )}

      {gameOver && (
        <button className="reiniciar" onClick={handleRestart}>Reiniciar juego</button>
      )}

      {showConfetti && <Confetti />}
    </div>
  );
}

export default App;
