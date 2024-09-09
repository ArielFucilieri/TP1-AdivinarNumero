// eslint-disable-next-line react/prop-types
const InputComponent = ({ guess, handleChange, setMessage, gameOver }) => {
  const handleFocus = () => {
    if (!gameOver) {
      setMessage(""); 
    }
  };

  return (
    <input
      type="number"
      value={guess}
      onChange={(e) => handleChange(e.target.value)}
      onFocus={handleFocus}
      disabled={gameOver}
      placeholder="Ingrese su número"
    />
  );
};

export default InputComponent;
